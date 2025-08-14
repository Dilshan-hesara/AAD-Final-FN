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
        // Load the sidebar HTML component
        // The path is changed from ../components/sidebar.html to components/sidebar.html
        fetch('components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchSuperAdminProfile();
                attachLogoutEvent();
            });
    }
});

function fetchSuperAdminProfile() {
    const token = localStorage.getItem('authToken');
    // This uses the same endpoint as the branch admin
    fetch('http://localhost:8080/api/staff/my-profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(res => {
            if (!res.ok) {
                // If the response is not successful, throw an error to be caught by .catch
                throw new Error('Failed to fetch profile: ' + res.statusText);
            }
            return res.json();
        })
        .then(profile => {
            const adminNameElement = document.getElementById('super-admin-name');
            if(adminNameElement) {
                adminNameElement.textContent = `Welcome, ${profile.fullName}`;
            }
        })
        .catch(error => {
            console.error('Error fetching super admin profile:', error);
            const adminNameElement = document.getElementById('super-admin-name');
            if(adminNameElement) {
                adminNameElement.textContent = 'Welcome, Guest'; // Show a default message on error
            }
        });
}

function attachLogoutEvent() {
    // Event delegation is used because the button is loaded dynamically
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            // This path should also be corrected to not use ../
            window.location.href = 'login.html'; // Assuming login.html is also in the super-admin folder
        }
    });
}