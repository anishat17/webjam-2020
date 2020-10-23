const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

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


app.listen(port, () => {console.log("listening on port", port)});