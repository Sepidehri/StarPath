const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const users = [];




app.use(express.static(path.join(__dirname, 'files')));
app.use(bodyParser.json());
app.use(cookieParser());



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

  const options = {
    method: 'GET',
    url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=${day}`,
    headers: {
      'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
      'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
    },
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
    console.log(1)
    const response = await axios.request(options);
    console.log(2)
    console.log(response.data);
    console.log(13)
  } catch (error) {
    console.log(4)
    console.error(error);
  }});


 
  app.get('/account', authenticateToken, (req, res) => {
    const user = req.user;
    res.json({ user });
  });
  
  app.post('/register', async (req, res) => {
    const { username, password, firstName, lastName, email } = req.body;
  
    // Check if the username is already taken
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const user = {
        id: users.length + 1,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
      };
  
      // Store the user in the users array
      users.push(user);
  
      // Generate a JWT token
      const token = jwt.sign({ username: user.username }, 'b478b865481d0b890145b674ffb5d2d69dfc63316730f5023331b25d1149060ca64e176dd91cb67cb461b995c7b97cf6b5b8bfb3927c50427a60d725f856e07c', {
        expiresIn: '1h', // Set the expiration time for the token
      });
  
      // Set the token in a cookie
      res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).json({ message: 'Registration successful!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Find the user by username
    const user = users.find((user) => user.username === username);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Compare the provided password with the stored hashed password for the user
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, 'b478b865481d0b890145b674ffb5d2d69dfc63316730f5023331b25d1149060ca64e176dd91cb67cb461b995c7b97cf6b5b8bfb3927c50427a60d725f856e07c', {
      expiresIn: '1h', // Set the expiration time for the token
    });
  
    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).json({ message: 'Login successful' });
  });
  
  
  
  function authenticateToken(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'b478b865481d0b890145b674ffb5d2d69dfc63316730f5023331b25d1149060ca64e176dd91cb67cb461b995c7b97cf6b5b8bfb3927c50427a60d725f856e07c', (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = decoded; // Attach the decoded user information to the request object
      next();
    });
  }
  



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
