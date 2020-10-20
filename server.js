const express = require('express');
const axios = require('axios');

require('dotenv').config();

const app = express();

const BASE_URL = 'https://maps.googleapis.com/maps/api/js?';


app.get('/api/maps', async (req, res, next) => {   
    try {  
        const reqParams = new URLSearchParams({
            key: process.env.GOOGLE_API_KEY,
            sensor: 'false',
            libraries: 'geometry'
        });

        const { data } = await axios.get(`${BASE_URL}${reqParams}`);

        res.set('Content-Type', 'text/javascript');
        res.send(data);


    } catch (error) {
        next(error);
    }
    
});


app.listen(3000, () => {console.log("listening on port 3000...")});