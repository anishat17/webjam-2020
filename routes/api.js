const express = require("express");
const mysql = require('mysql');

require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("connection failed");
    } else {
        console.log("connected");
    }
});

function generateList(arr) {
    return "(" + arr.join(", ") + ")";
}

function shuffleArr(arr) {
    let randIndex, old, i;
    for (index = arr.length - 1; index > 0; index--) {
        randIndex = Math.floor(Math.random() * (i + 1));
        old = arr[i];
        arr[i] = arr[randIndex];
        arr[randIndex] = old;
    }
    return arr;
}



const router = express.Router();

router.get("/maps/range", (req, res) => {
    db.query("SELECT COUNT(Mapid) as count FROM maps", (err, result, fields) => {
        if (err) {
            res.status(503).send("503 Service Unavailable");
            console.log(err);
        }
        res.send(result[0]);
    });
})

router.get("/maps", (req, res) => {
    if (!req.query.mapid) {
        console.log("invalid request");
        res.status(400).send("Bad Request");
    }
    
    db.query(`SELECT Mapid, Link FROM maps WHERE Mapid = ${req.query.mapid}`, (err, result, fields) => {
        if (err) {
            res.status(503).send("503 Service Unavailable");
        }
        res.send(result[0]);
    });

});

router.get("/maps/locations", (req, res) => {
    if (!req.query.mapid) {
        console.log("invalid request");
        res.status(400).send("Bad Request");
    }
    
    db.query(`SELECT Location FROM maps WHERE Mapid IN ${generateList(req.query.mapid)}`, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(503).send("503 Service Unavailable");
        }
        let data = {"locations" : []};
        for (i in result) {
            data.locations.push(result[i].Location);
        }
        data.locations = shuffleArr(data.locations);
        res.send(data);
    });

});

router.get("/maps/check", (req, res) => {
    if (!req.query.mapid || !req.query.location) {
        console.log("invalid request");
        res.status(400).send("Bad Request");
    }
    let sql = `SELECT Location FROM maps WHERE Mapid = '${req.query.mapid}' AND Location = '${req.query.location}'`;
    db.query(sql, (err, result, fields) => {
        if (err) {
            res.status(503).send("503 Service Unavailable");
            console.log(err);
        } else {
            let data = {correct : false};
            if (result.length == "0") {
                res.send(data);
            } else {
                data.correct = true;
                res.send(data);
            }
        }
    });
});

module.exports = router;



function trivialQuery() {
    // keeps database connection from timing out
    db.query("SELECT Mapid FROM maps WHERE Mapid < 0", (err, result, fields) => {
        if(err) throw err;
    });
}

setInterval(trivialQuery, 45000);