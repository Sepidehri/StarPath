// Fetch user information from the server
fetch('/account', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  })
    .then((response) => {
      console.log(response); // Log the response to inspect its content
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        // Redirect to login page if unauthorized
        window.location.href = 'signin';
      } else {
        throw new Error('Error fetching user information');
      }
    })
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
  