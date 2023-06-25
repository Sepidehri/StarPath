document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Send login request to the server
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const { token } = await response.json();
      // Store the token in client-side storage
      localStorage.setItem('token', token);
      // Redirect to the authenticated page or perform other actions
      window.location.href = 'account';
    } else {
      // Handle login error
      const error = await response.text();
      console.error('Login error:', error);
      document.getElementById('error-message').innerText = 'Invalid username or password.';
    }
  });
  