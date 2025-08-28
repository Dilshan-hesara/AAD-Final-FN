



document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        // Fetch and inject the navbar HTML
        fetch('../components/user-nav.html')
            .then(res => res.text())
            .then(html => {
                navbarPlaceholder.innerHTML = html;
                loadUserProfile(); // Load user data into the navbar
            });
    }
});

function loadUserProfile() {
    const token = localStorage.getItem('authToken');
    // Use the API endpoint for the online user's profile
    fetch('http://localhost:8080/api/user/my-profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(res => res.json())
        .then(profile => {
            document.getElementById('nav-profile-name').textContent = profile.fullName;
            if (profile.profilePictureUrl) {
                document.getElementById('nav-profile-pic').src = 'http://localhost:8080' + profile.profilePictureUrl;
            }
        });

    // Attach logout functionality
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
        }
    });
}