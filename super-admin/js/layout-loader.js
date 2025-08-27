// document.addEventListener('DOMContentLoaded', function() {
//     const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
//     if (sidebarPlaceholder) {
//         // Load the sidebar HTML component
//         fetch('components/sidebar.html')
//             .then(response => response.text())
//             .then(sidebarHtml => {
//                 sidebarPlaceholder.innerHTML = sidebarHtml;
//                 fetchSuperAdminProfile();
//                 attachLogoutEvent();
//             });
//     }
// });
//
// function fetchSuperAdminProfile() {
//     const token = localStorage.getItem('authToken');
//     // This uses the same endpoint as the branch admin
//     fetch('http://localhost:8080/api/staff/my-profile', {
//         headers: { 'Authorization': 'Bearer ' + token }
//     })
//         .then(res => res.json())
//         .then(profile => {
//             document.getElementById('super-admin-name').textContent = `Welcome, ${profile.fullName}`;
//         });
// }
//
// function attachLogoutEvent() {
//     // Event delegation is used because the button is loaded dynamically
//     document.body.addEventListener('click', function(e) {
//         if (e.target && e.target.id === 'logout-button') {
//             e.preventDefault();
//             localStorage.removeItem('authToken');
//             window.location.href = '../login.html'; // Go back to the root login page
//         }
//     });
// }
//
//
document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchSuperAdminProfile();
                attachLogoutEvent();
            });
    }
});

// function fetchSuperAdminProfile() {
//     const token = localStorage.getItem('authToken');
//     fetch('http://localhost:8080/api/staff/my-profile', {
//         headers: { 'Authorization': 'Bearer ' + token }
//     })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('Failed to fetch profile: ' + res.statusText);
//             }
//             return res.json();
//         })
//         .then(profile => {
//             const adminNameElement = document.getElementById('super-admin-name');
//             if(adminNameElement) {
//                 adminNameElement.textContent = `Welcome, ${profile.fullName}`;
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching super admin profile:', error);
//             const adminNameElement = document.getElementById('super-admin-name');
//             if(adminNameElement) {
//                 adminNameElement.textContent = 'Welcome, Guest';
//             }
//         });
// }

function attachLogoutEvent() {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
        }
    });



}

function fetchSuperAdminProfile() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/super-admin/my-profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(res => res.json())
        .then(profile => {

            document.getElementById('super-admin-name').textContent = `Welcome, ${profile.fullName}`;

            if (profile.profilePictureUrl) {
                document.getElementById('sidebar-profile-pic').src = 'http://localhost:8080' + profile.profilePictureUrl;
            }


        });



}

