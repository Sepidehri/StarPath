$('.zodiac-sign').on('click', function(){
  // Get the sign from the clicked button
  const sign = $(this).data('sign');
  
  // Make a request to your server's astrology endpoint
  fetch('/astrology', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sign: sign,
      day: 'today'
    })
  })
  .then(response => response.json())
  .then(data => {
    // Redirect to a new page and pass the horoscope data
    window.location.href = '/horoscope.html?data=' + encodeURIComponent(JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
  });
});


    fetch(API_URL, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
      });
  


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

