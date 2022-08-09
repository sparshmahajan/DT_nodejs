const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');
const { deleteFile } = require('../utils/fileHandler');

const addEvent = async (req, res) => {
    const db = getDb();
    const eventsCollection = await db.collection('events');
    const event = {
        ...req.body,
        creation_date: new Date().toISOString(),
        updation_date: new Date().toISOString(),
        image: req.file.path
    }; //believing that data is formatted from the frontend
    try {
        const result = await eventsCollection.insertOne(event);
        res.status(201).json({
            message: 'Event added successfully',
            eventId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
}

const findEvent = async (req, res) => {
    const db = getDb();
    const eventsCollection = await db.collection('events');
    if (req.query.id) {
        const eventId = req.query.id;
        try {
            const event = await eventsCollection.findOne({ _id: ObjectId(eventId) });
            res.status(200).json(event);
        }
        catch (error) {
            res.status(404).json({
                message: 'Not found',
            });
        }
    } else if (req.query.page) {
        const sortOrder = req.query.type === 'latest' ? -1 : 1;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        try {
            const events = await eventsCollection.find({}).sort({ updation_date: sortOrder }).skip(skip).limit(limit).toArray();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    } else {
        try {
            const events = await eventsCollection.find({}).toArray();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const db = getDb();
    const eventsCollection = await db.collection('events');
    try {
        const result = await eventsCollection.findOneAndDelete({ _id: ObjectId(eventId) });
        if (result.value === null) {
            res.status(404).json({
                message: 'Not found',
            });
        } else {
            deleteFile(result.value.image);
            res.status(200).json({
                message: 'Event deleted successfully',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const db = getDb();
    const eventsCollection = await db.collection('events');
    const event = {
        ...req.body,
        updation_date: new Date().toISOString(),
        image: req.file.path
    }; //believing that data is formatted from the frontend
    try {
        const result = await eventsCollection.findOneAndUpdate({ _id: ObjectId(eventId) }, { $set: event });
        if (result.value === null) {
            res.status(404).json({
                message: 'Not found',
            });
        } else {
            if (result.value.image !== event.image) {
                deleteFile(result.value.image);
            }
            res.status(200).json({
                message: 'Event updated successfully',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { addEvent, findEvent, deleteEvent, updateEvent };