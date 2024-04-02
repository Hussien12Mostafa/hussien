async function fetchUserPosts(userId) {
    try {
        console.log("posts for user id ="+userId);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response);
        const posts = await response.json();
        console.log(posts);
        return posts.map(post => post.title);
    } catch (error) {
        console.error('There was a problem fetching the user posts:', error);
        return [];
    }
}
// Function to fetch users
function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(users => {
        displayUsers(users);
    })
    .catch(error => {
        console.error('There was a problem fetching the users:', error);
    });
}

// Function to display users
async function displayUsers(users) {
    const userContainer = document.getElementById('userContainer');
    userContainer.innerHTML = ''; // Clear previous content
    users.forEach(user => {
        const usernameButton = document.createElement('button');
        usernameButton.textContent = user.username;
        usernameButton.classList.add('username-button');
        
        usernameButton.addEventListener('click',async function() {
            const posts = await fetchUserPosts(user.id);
            const postTitles = posts.map(post => `<li>${post}</li>`).join('');
            document.getElementById('postList').innerHTML = postTitles;
        });
        userContainer.appendChild(usernameButton);
    });
    const posts = await fetchUserPosts(users[0].id);
            const postTitles = posts.map(post => `<li>${post}</li>`).join('');
            document.getElementById('postList').innerHTML = postTitles;
}

// Automatically fetch users upon page load
fetchUsers();
