$(function() {
  
  $('.zodiac-sign').on('click', async function(){
    alert(1)
  
  // Make a request to your vedic astrology API to get the horoscope for the sign
  const API_URL = 'https://sameer-kumar-aztro-v1.p.rapidapi.com/';
  const axios = require('axios');
  alert(2)
  const options = {
    method: 'POST',
    url: API_URL,
    params: {
      sign: sign,
      day: 'today'
    },
    headers: {
      'X-RapidAPI-Key': '5e0a055384msha3dcec8bcf7f985p119cf3jsn8103cce6b196',
      'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
    }
  };
  
  try {
    alert(3)
    // Make the API request using axios
    const response = await axios.request(options);
    console.log(response.data);
    
    // Replace the implementation below with your desired method of displaying the data
    alert(response.data);
  } catch (error) {
    console.error(error);
  }
  
  });
  });