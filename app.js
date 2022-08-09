require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const { mongoConnect } = require('./utils/database');

const eventRouter = require('./routes/events.routes');
const nudgeRouter = require('./routes/nudges.routes');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'images');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const port = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(express.json());
app.use(multer({ storage: storage }).single("image"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use(process.env.BASE_URL + '/events', eventRouter);
app.use(process.env.BASE_URL + '/nudges', nudgeRouter);

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

