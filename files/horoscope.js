// Retrieve the sign from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const sign = urlParams.get('sign');

// Display the sign in the page
const signElement = document.getElementById('sign');
signElement.textContent = sign;

// Fetch the horoscope data for the selected sign
fetch(`/astrology/${sign}/today`)
  .then(response => response.json())
  .then(data => {
    // Display the horoscope data in the page
    const horoscopeElement = document.getElementById('horoscope');
    horoscopeElement.textContent = data.horoscope;
  })
  .catch(error => {
    console.error(error);
  });
