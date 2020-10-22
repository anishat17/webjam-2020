const express = require("express");
const mysql = require('mysql');

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "heroku_3c5393be4190d25"
});

db.connect((err) => {
    if (err) {
        console.log("connection failed");
    } else {
        console.log("connected");
    }
});


const router = express.Router();

router.get("/maps/range", (req, res) => {
    db.query("SELECT COUNT(Mapid) as Count FROM maps", (err, result, fields) => {
        if (err) {
            res.status(503).send("503 Service Unavailable");
            console.log(err);
        }
        res.send(result);
    });
})

router.get("/maps", (req, res) => {
    if (!req.query.mapid) {
        console.log("invalid request");
        res.status(400).send("Bad Request");
    }
    
    db.query(`SELECT MapId, Location, Link FROM maps WHERE Mapid =${req.query.mapid}`, (err, result, fields) => {
        if (err) {
            res.status(503).send("503 Service Unavailable");
        }
        res.send(result);
    });

});

module.exports = router;



function trivialQuery() {
    console.log("looped");
    db.query("SELECT Mapid FROM maps WHERE Mapid < 0", (err, result, fields) => {
        if(err) throw err;
    });
}

setInterval(trivialQuery, 45000);