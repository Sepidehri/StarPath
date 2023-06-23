
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password !== confirmPassword) {
      document.getElementById('error-message').innerText = 'Passwords do not match.';
      return;
    }
  
    // Perform registration logic here
    window.location.href = 'account';
  });
  