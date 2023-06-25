

  document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      document.getElementById('error-message').innerText = 'Passwords do not match.';
      return;
    }

    
    // Simulate a successful registration with a delay of 1 second
    setTimeout(() => {
      document.getElementById('registration-message').innerText = 'Registration successful!';
    }, 1000);
});
