
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









// In your user-layout-loader.js file

// // --- ADD THIS WHOLE SECTION ---
function checkForNotifications() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => res.json())
        .then(notifications => {
            const badge = document.getElementById('notification-badge');
            const list = document.getElementById('notification-list');
            list.innerHTML = '';

            if (notifications.length > 0) {
                badge.textContent = notifications.length;
                badge.style.display = 'block';
                notifications.forEach(n => {
                    list.innerHTML += `<li><a class="dropdown-item text-wrap" href="#">${n.message}</a></li>`;
                });
            } else {
                badge.style.display = 'none';
                list.innerHTML = '<li><span class="dropdown-item-text">No new notifications</span></li>';
            }
        });
}

function markNotificationsAsRead() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/notifications/mark-as-read', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(() => {
        // After marking as read, update the count after a short delay
        setTimeout(checkForNotifications, 1000);
    });
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('navbar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/user-nav.html')
            .then(response => response.text())
            .then(html => {
                sidebarPlaceholder.innerHTML = html;
                loadUserProfile();

                // --- ADD THIS ---
                checkForNotifications(); // Check on page load
                setInterval(checkForNotifications, 30000); // Check every 30 seconds

                // Add event listener to mark as read when bell is clicked
                document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
            });
    }
});


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


