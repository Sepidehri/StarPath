async function fetchHoroscope(sign) {
  console.log(1);
  try {
    const response = await fetch(`/astrology/${sign}/today`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayHoroscopeData(data);
    } else {
      throw new Error('Failed to fetch horoscope');
      console.log(7);
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the fetchHoroscope function with the sign parameter
const urlParams = new URLSearchParams(window.location.search);
const sign = urlParams.get('sign');
console.log(sign);

const heading = document.getElementById('Title');
heading.textContent = 'Your Horoscope: ' + sign;

if (sign) {
  console.log(10);
  fetchHoroscope(sign);
  console.log(11);
} else {
  console.error('Sign parameter is missing');
}



function displayHoroscopeData(data) {
  // Update the UI with the horoscope data
  const horoscopeText = document.getElementById('horoscope-text');
  horoscopeText.textContent = data.message;

}



