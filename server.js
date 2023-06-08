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


app.listen(3000, () => {
  console.log('Server listening on port 3000');
  })
