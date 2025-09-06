
document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('../components/user-nav.html')
            .then(res => res.text())
            .then(html => {
                navbarPlaceholder.innerHTML = html;
                loadUserProfile();
            });
    }
});

function loadUserProfile() {
    const token = localStorage.getItem('authToken');
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


    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = '../login.html';
        }
    });
}


//
// function fetchProfileData() {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;
//     fetch('http://localhost:8080/api/staff/my-profile', {
//         headers: { 'Authorization': 'Bearer ' + token }
//     })
//         .then(response => {
//             if (!response.ok) { throw new Error('Failed to fetch profile. Status: ' + response.status); }
//             return response.json();
//         })
//         .then(profile => {
//             document.getElementById('sidebar-branch-name').textContent = profile.branchName;
//             document.getElementById('sidebar-admin-name').textContent = `Welcome, ${profile.fullName}`;
//
//             console.log(profile.branchName)
//             console.log(profile.fullName)
//         })
//         .catch(error => console.error('Error loading profile data:', error));
// }
