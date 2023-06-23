document.addEventListener('DOMContentLoaded', (event) => {
    const citySelect = document.getElementById('birth-place');
  
    const fetchCities = () => {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
        headers: {
          'X-RapidAPI-Key': '6c588273dbmsh5e380d6f76000dep1312dfjsnfd5b6c1e7f5b',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };
  
      fetch(options.url, {
        method: options.method,
        headers: options.headers
      })
        .then(response => response.json())
        
        .then(data => {
            console.log(2)
          const cities = data.data;
          console.log(3)
          cities.forEach(city => {
            console.log(4)
            const option = document.createElement('option');
            console.log(5)
            option.value = city.cityName;
            console.log(6)
            option.textContent = city.cityName;
            console.log(7)
            citySelect.appendChild(option);
          });
        })
        .catch(error => {
          console.error('Error fetching city data:', error);
        });
    };
  
    // Fetch cities on page load
    fetchCities();
  
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
  });
  