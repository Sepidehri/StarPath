const express = require('express');
const app = express();
const axios = require('axios');
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


const options = {
  method: 'POST',
  url: 'https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/numero_table/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
    'X-RapidAPI-Host': 'vedicrishi-horoscope-matching-v1.p.rapidapi.com'
  },
  data: {
    day: '25',
    month: '12',
    year: '1988',
    hour: '2',
    min: '30',
    name: 'demo',
    lat: '25.123',
    lon: '82.34',
    tzone: '5.5'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });