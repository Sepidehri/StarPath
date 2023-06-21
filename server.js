const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

// Serve static content in directory 'files'
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

  app.post('/astrology', async (req, res) => {
    const sign = req.body.sign;
    const day = req.body.day;
  
    const options = {
      method: 'POST',
      url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
      params: {
        sign: sign,
        day: day
      },
      headers: {
        'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
        'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
  
      // Send the response data back to the frontend
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  })
