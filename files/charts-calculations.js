document.addEventListener('DOMContentLoaded', async (event) => {
    const citySelect = document.getElementById('birth-place');
  
    try {
      const response = await fetch('/fetch-cities');
      if (response.ok) {
        const data = await response.json();
        const cities = data.cities;
        cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          citySelect.appendChild(option);
        });
      } else {
        throw new Error('Failed to fetch city data');
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  
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
          birthChart.innerHTML = JSON.stringify(data); 
        })
        .catch(error => {
          console.error(error);
        });
    });
  });
  