const express = require('express');
const cors = require('cors');

const zoom = require('./app/zoom');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000;

app.use('/zoom', zoom);

app.listen(port, () => {
    console.log(`Server started on ${port} port`);
});