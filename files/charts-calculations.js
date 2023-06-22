const citySelect = document.getElementById('birth-place');

const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
  headers: {
    'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

axios.request(options)
  .then(response => {
    const cities = response.data.data;
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city.city; // Set the value to the city name
      option.textContent = city.city; // Set the option text to the city name
      citySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching city data:', error);
  });

// Handle form submission
document.getElementById('chart-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve user input
  const birthDate = document.getElementById('birth-date').value;
  const birthTime = document.getElementById('birth-time').value;
  const birthPlace = document.getElementById('birth-place').value;

  // Make AJAX request to backend endpoint
  fetch('/calculate-chart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: birthDate,
      time: birthTime,
      place: birthPlace
    })
  })
    .then(response => response.json())
    .then(data => {
      // Display the birth chart on the page
      const birthChart = document.getElementById('birth-chart');
      birthChart.innerHTML = JSON.stringify(data); // Replace with your own logic to render the chart
    })
    .catch(error => {
      console.error(error);
    });
});
