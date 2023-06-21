$(function() {
  $('.zodiac-sign').on('click', function(){
    // Get the sign from the clicked button
    const sign = $(this).data('sign');
  
    // Make a request to your server's astrology endpoint
    fetch(`/astrology/${sign}/today`)
    .then(response => response.json())
    .then(data => {
      // Redirect to a new page and pass the horoscope data
      window.location.href = '/horoscope.html?data=' + encodeURIComponent(JSON.stringify(data));
    })
    .catch(error => {
      console.error(error);
    });
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.zodiac-sign').forEach(button => {
    button.addEventListener('click', function() {
      const sign = this.getAttribute('data-sign');
      
      fetch(`/astrology/${sign}/today`)
        .then(response => response.json())
        .then(data => {
          window.location.href = '/horoscope.html?data=' + encodeURIComponent(JSON.stringify(data));
        })
        .catch(error => {
          console.error(error);
        });
    });
  });
});
