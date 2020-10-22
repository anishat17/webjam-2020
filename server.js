const express = require('express');
const axios = require('axios');
const cors = require('cors');

const api = require('./routes/api');

require('dotenv').config();

const app = express();

// third-party middleware
app.use(cors());

// serves client-side files
app.use(express.static(__dirname + "/Public"));

app.get("/", (req, res) => {
    // handles root
    res.render("index");
})

// sets api route using custom middleware
app.use('/api', api);


app.listen(3000, () => {console.log("listening on port 3000...")});