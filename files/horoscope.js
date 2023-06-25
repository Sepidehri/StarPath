async function fetchHoroscope(sign) {
  console.log(1)
  try {
    const response = await fetch(`/astrology/${sign}/today`);
    console.log(2)
    if (response.ok) {
      console.log(3)
      const data = await response.json();
      console.log(4)
      console.log(data);
      console.log(5)
      displayHoroscopeData(data);
      console.log(6)
    } else {
      throw new Error('Failed to fetch horoscope');
      console.log(7)
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the fetchHoroscope function with the sign parameter
const urlParams = new URLSearchParams(window.location.search);
console.log(8)
const sign = urlParams.get('/horoscope/:sign');
console.log(9)
if (sign) {
  console.log(10)
  fetchHoroscope(sign);
  console.log(11)
} else {
  console.error('Sign parameter is missing');
}
