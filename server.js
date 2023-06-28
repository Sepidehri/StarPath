require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const db = require("./models");
const User = db.user;
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(express.static(path.join(__dirname, 'files')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/header', (req, res) => {
  res.sendFile(__dirname + '/header.html');
});

app.get('/footer', (req, res) => {
  res.sendFile(__dirname + '/footer.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/signin.html');
});

app.get('/contactus', (req, res) => {
  res.sendFile(__dirname + '/contactus.html');
});

app.get('/account', (req, res) => {
  res.sendFile(__dirname + '/account.html');
});

app.get('/chart', (req, res) => {
  res.sendFile(__dirname + '/chart-analysis.html');
});

app.get('/horoscope/:sign', (req, res) => {
  const sign = req.params.sign;
  res.sendFile(__dirname + `/horoscope.html?sign=${sign}`);
});

app.get('/charts-calculations', (req, res) => {
  res.sendFile(__dirname + '/charts-calculations.html');
});

app.get('/matching-compatibility', (req, res) => {
  res.sendFile(__dirname + '/matching-compatibility.html');
});

app.get('/horoscope', (req, res) => {
  res.sendFile(__dirname + '/horoscope.html');
});


app.get('/astrology/:sign/today', async (req, res) => {
  const sign = req.params.sign;
  const day = 'today';

  const encodedParams = new URLSearchParams();
  encodedParams.set('sign', sign);
  var currentDate = new Date().toISOString().split('T')[0];
  encodedParams.set('date', '2023-06-21');
  encodedParams.set('api_key', '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b');
  encodedParams.set('timezone', '5.5');
  
  const options = {
    method: 'POST',
    url: 'https://daily-horoscope3.p.rapidapi.com/api/1.0/get_daily_horoscope.php',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
      'X-RapidAPI-Host': 'daily-horoscope3.p.rapidapi.com'
    },
    data: encodedParams,
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



app.get('/fetch-cities', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
    headers: {
      'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };


  try {
    const response = await axios.request(options);
    const cities = response.data.data.map((item) => item.name); 
    res.json({ cities });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }});

  
  app.post('/signup', async (req, res) => {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
  
     res.send({ message: "User registered successfully!" });
     
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
      req.session.username=req.body.username;
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });

  app.get('/account-detail', async (req, res) => {
    try {
      console.log(req.session)
      var usename = req.session.username ;
      const user = await User.findOne({
        where: {
          username: usename,
        },
      });
  
      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }

  
      return res.status(200).send({username:user.username, email:user.email});
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    const deletedUser = users.find(user => user.id === userId);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    const index = users.indexOf(deletedUser);
    users.splice(index, 1);
  
    res.send('User deleted successfully');
  });
  

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
