const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');
const { deleteFile } = require('../utils/fileHandler');

const addNudge = async (req, res) => {
    const db = getDb();
    const nudgesCollection = await db.collection('nudges');
    const eventsCollection = await db.collection('events');
    try {
        const event = await eventsCollection.findOne({ _id: ObjectId(req.body.eventId) });
        if (!event) {
            res.status(404).json({
                message: 'Event not found'
            });
        }
        const nudge = {
            ...req.body,
            creation_date: new Date().toISOString(),
            updation_date: new Date().toISOString(),
            image: req.file.path
        }
        const result = await nudgesCollection.insertOne(nudge);
        res.status(201).json({
            message: 'Nudge added successfully',
            nudgeId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
}

const findNudge = async (req, res) => {
    const db = getDb();
    const nudgesCollection = await db.collection('nudges');
    const nudgeId = req.query.id;
    if (nudgeId) {
        try {
            const nudge = await nudgesCollection.findOne({ _id: ObjectId(nudgeId) });
            res.status(200).json(nudge);
        } catch (error) {
            res.status(404).json({
                message: 'Not found',
            });
        }
    } else {
        try {
            const nudges = await nudgesCollection.find({}).toArray();
            res.status(200).json(nudges);
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

const deleteNudge = async (req, res) => {
    const db = getDb();
    const nudgesCollection = await db.collection('nudges');
    const nudgeId = req.params.id;
    try {
        const nudge = await nudgesCollection.findOne({ _id: ObjectId(nudgeId) });
        if (!nudge) {
            res.status(404).json({
                message: 'Nudge not found'
            });
        }
        await nudgesCollection.deleteOne({ _id: ObjectId(nudgeId) });
        await deleteFile(nudge.image);
        res.status(200).json({
            message: 'Nudge deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
}

const updateNudge = async (req, res) => {
    const db = getDb();
    const nudgesCollection = await db.collection('nudges');
    const nudgeId = req.params.id;
    try {
        const nudge = await nudgesCollection.findOneAndUpdate({ _id: ObjectId(nudgeId) }, { $set: { ...req.body, updation_date: new Date().toISOString(), image: req.file.path } });
        console.log(nudge.value);
        if (!nudge) {
            res.status(404).json({
                message: 'Nudge not found'
            });
        }
        if (nudge.value.image !== req.file.path) {
            deleteFile(nudge.value.image);
        }
        res.status(200).json({
            message: 'Nudge updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
}

module.exports = { addNudge, findNudge, deleteNudge, updateNudge };