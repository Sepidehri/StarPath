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

function togglePhoneNumber() {
  var phoneNumberElement = document.getElementById("phone-number");
  phoneNumberElement.classList.toggle("hidden");
}

function toggleBookNow() {
  var bookNowElement = document.getElementById("book-now");
  bookNowElement.classList.toggle("hidden");
}


function redirectToChartsCalculations() {
  window.location.href = '/charts-calculations';
}


function redirectToMatchingCompatibility() {
  window.location.href = '/matching-compatibility';
}

function redirectToCIndex() {
  window.location.href = '/';
}

function redirectToSignIn() {
  window.location.href = '/signin';
}

function redirectToRegister() {
  window.location.href = '/register';
}
function redirectToContactUs(){
  window.location.href = '/contactus';
}

function redirectToAccount(){
  window.location.href = '/account';
}

