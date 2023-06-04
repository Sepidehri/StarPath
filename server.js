const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  })
