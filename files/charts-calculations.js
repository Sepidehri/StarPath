document.addEventListener('DOMContentLoaded', async (event) => {
    console.log(9)
    const citySelect = document.getElementById('birth-place');
    console.log(10)
  
    try {
        console.log(11)
      const response = await fetch('/fetch-cities');
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(1)
        const cities = data.cities;
        console.log(2)
        cities.forEach(city => {
            console.log(3)
          const option = document.createElement('option');
          console.log(4)
          option.value = city;
          console.log(5)
          option.textContent = city;
          console.log(6)
          citySelect.appendChild(option);
          console.log(7)
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
  