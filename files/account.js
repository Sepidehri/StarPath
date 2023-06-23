// Fetch user information from the server
fetch('/account', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the account information in the DOM
      const user = data.user; // Extract the user object from the response
      document.getElementById('first-name').innerText = user.firstName;
      document.getElementById('last-name').innerText = user.lastName;
      document.getElementById('email').innerText = user.email;
    })
    .catch((error) => {
      console.error('Error fetching user information:', error);
      // Handle error case
    });
  