// URL of the API endpoint
const apiURL = 'https://jsonplaceholder.typicode.com/users';

// Function to fetch users and display in the list
function fetchUsers() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = ''; 
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to create a new user using POST request
document.getElementById('user-form').addEventListener('submit', function(){
    event.preventDefault(); // Prevent form from submitting the default way
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        const postResult = document.getElementById('post-result');
        postResult.textContent = `User created! ID: ${data.id}, Name: ${data.name}, Email: ${data.email}`;
        document.getElementById('user-form').reset(); // Clear form fields

        const userList = document.getElementById('user-list');
        const li = document.createElement('li');
        li.textContent = `${data.name} (${data.email})`;
        userList.appendChild(li);
    })
    .catch(error => console.error('Error creating user:', error));
});


