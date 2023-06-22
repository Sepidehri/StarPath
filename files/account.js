// Fetch user-specific data and update the account-info section
document.addEventListener('DOMContentLoaded', () => {
    // Make an API call or fetch user data from the server
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        // Add more user-specific data as needed
    };

    // Update the account-info section with user data
    const accountInfoElement = document.getElementById('account-info');
    accountInfoElement.innerHTML = `
        <p>First Name: ${userData.firstName}</p>
        <p>Last Name: ${userData.lastName}</p>
        <p>Email: ${userData.email}</p>
        <!-- Add more user-specific information as needed -->
    `;
});
