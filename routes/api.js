const express = require("express");
const mysql = require('mysql');

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "heroku_3c5393be4190d25"
});

let db_results;

const router = express.Router();

router.get("/maps", (req, res) => {
    db.connect((err) => {
        if(err) {
            throw err;
        }
        console.log("connected");
    });

    db.query("SELECT * FROM maps", (err, result, fields) => {
        if (err) {
            res.status(503).send("503 Service Unavailable");
        }
        db_results = result;
    });

    db.end();
    res.send(db_results);
    
})

module.exports = router;