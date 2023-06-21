const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const axios = require('axios');

app.use(express.static(path.join(__dirname, "files")));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/header', (req, res) => {
    res.sendFile(__dirname + '/header.html');
});

app.get('/footer', (req, res) => {
    res.sendFile(__dirname + '/footer.html');
});

app.get('/astrology/:sign/today', async (req, res) => {
    const sign = req.params.sign;
    const day = 'today';

    const options = {
      method: 'GET',
      url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=${day}`,
      headers: {
        'X-RapidAPI-Key':  '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
        'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})
