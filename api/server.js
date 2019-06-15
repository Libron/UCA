const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const zoom = require('./app/zoom');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const port = 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/zoom', zoom);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});