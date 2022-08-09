const mongoClient = require('mongodb');
const mongoUrl = process.env.MONGO_URL;

const dbName = 'test';

let _db;

const mongoConnect = async (callback) => {
    const client = new mongoClient.MongoClient(mongoUrl, { useNewUrlParser: true });
    await client.connect();
    _db = client.db(dbName);
    console.log('Connected to the database');
    callback();
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

module.exports = { mongoConnect, getDb };