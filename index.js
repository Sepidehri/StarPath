$(function() {
  $('.zodiac-sign').on(async function() {
  
  // Get the zodiac sign name from the clicked button
  var sign = $(this).data('sign');
  
  // Make a request to your vedic astrology API to get the horoscope for the sign
  // Replace the API_URL variable with the URL endpoint of your API
  const API_URL = 'https://sameer-kumar-aztro-v1.p.rapidapi.com/';
  const axios = require('axios');
  
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
  
    // Make the API request using axios
    const response = await axios.request(options);
    console.log(response.data);
    
    // Display the horoscope data in a new page or modal
    // Replace the implementation below with your desired method of displaying the data
    alert(response.data);
  } catch (error) {
    console.error(error);
  }
  
  });
  });