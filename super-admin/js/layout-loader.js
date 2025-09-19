//
// document.addEventListener('DOMContentLoaded', function() {
//     const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
//     if (sidebarPlaceholder) {
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
//
//
// function fetchSuperAdminProfile() {
//     const token = localStorage.getItem('authToken');
//     fetch('http://localhost:8080/api/super-admin/my-profile', {
//         headers: { 'Authorization': 'Bearer ' + token }
//     })
//         .then(res => res.json())
//         .then(profile => {
//
//             document.getElementById('super-admin-name').textContent = `Welcome, ${profile.fullName}`;
//
//             if (profile.profilePictureUrl) {
//                 document.getElementById('sidebar-profile-pic').src = 'http://localhost:8080' + profile.profilePictureUrl;
//             }
//
//
//         });
//
//
//
// }
//
//
//
// function attachLogoutEvent() {
//     document.body.addEventListener('click', function(e) {
//         if (e.target && e.target.id === 'logout-button') {
//             e.preventDefault();
//             localStorage.removeItem('authToken');
//             window.location.href = '../login.html';
//         }
//     });
// }
//
//
// function checkForNotifications() {
//     const token = localStorage.getItem('authToken');
//     fetch('http://localhost:8080/api/super-admin/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
//         .then(res => res.json())
//         .then(notifications => {
//             const badge = document.getElementById('notification-badge');
//             const list = document.getElementById('notification-list');
//             list.innerHTML = '';
//             if (notifications && notifications.length > 0) {
//                 badge.textContent = notifications.length;
//                 badge.style.display = 'block';
//                 notifications.forEach(n => {
//                     list.innerHTML += `<li><a class="dropdown-item text-wrap" href="#">${n.message}</a></li>`;
//                 });
//             } else {
//                 badge.style.display = 'none';
//                 list.innerHTML = '<li><span class="dropdown-item-text">No new notifications</span></li>';
//             }
//         });
// }
//
// function markNotificationsAsRead() {
//     const token = localStorage.getItem('authToken');
//     fetch('http://localhost:8080/api/super-admin/notifications/mark-as-read', {
//         method: 'POST',
//         headers: { 'Authorization': 'Bearer ' + token }
//     }).then(() => {
//         setTimeout(checkForNotifications, 500);
//     });
// }
//
// document.addEventListener('DOMContentLoaded', function() {
//     const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
//     if (sidebarPlaceholder) {
//         fetch('components/sidebar.html')
//             .then(response => response.text())
//             .then(sidebarHtml => {
//                 sidebarPlaceholder.innerHTML = sidebarHtml;
//                 fetchProfileData();
//                 attachLogoutEvent();
//                 setActiveLink();
//
//                 checkForNotifications();
//                 setInterval(checkForNotifications, 30000);
//                 document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
//             });
//     }
// });
//
// --- MERGED AND CORRECTED DOMContentLoaded LISTENER ---
document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('components/sidebar.html') // Make sure this path is correct
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;

                // Call all necessary functions after the sidebar is loaded
                fetchSuperAdminProfile(); // <-- FIXED function call
                attachLogoutEvent();
                setActiveLink(); // <-- This will now work correctly

                // Notification logic
                checkForNotifications();
                setInterval(checkForNotifications, 30000); // Check every 30 seconds
                document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
});

/**
 * Fetches the super admin's profile information to display in the sidebar.
 */
function fetchSuperAdminProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return; // Stop if no token

    fetch('http://localhost:8080/api/super-admin/my-profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch profile');
            return res.json();
        })
        .then(profile => {
            if (document.getElementById('super-admin-name')) {
                document.getElementById('super-admin-name').textContent = `Welcome, ${profile.fullName}`;
            }
            if (profile.profilePictureUrl && document.getElementById('sidebar-profile-pic')) {
                document.getElementById('sidebar-profile-pic').src = 'http://localhost:8080' + profile.profilePictureUrl;
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
}

/**
 * Attaches a single logout event listener to the body.
 */
// function attachLogoutEvent() {
//     document.body.addEventListener('click', function(e) {
//         if (e.target && e.target.id === 'logout-button') {
//             e.preventDefault();
//             localStorage.removeItem('authToken');
//             window.location.href = '../../login.html'; // Adjust path if necessary
//         }
//     });
// }

function attachLogoutEvent() {
    document.body.addEventListener('click', function (e) {
        // Check if the clicked element OR any of its parents is the logout button
        if (e.target.closest('#logout-button')) {
            e.preventDefault(); // Stop the default link behavior

            console.log('Logout button clicked. Clearing token...');
            localStorage.removeItem('authToken');

            // IMPORTANT: Make sure this path is correct for your file structure
            window.location.href = '../../login.html';
        }
    });
}

function setActiveLink() {
    const currentPath = window.location.pathname;

    // --- THIS IS THE CORRECTED LINE ---
    // It selects all nav-links that are NOT dropdown-toggles.
    const sidebarLinks = document.querySelectorAll('#sidebar-placeholder a.nav-link:not(.dropdown-toggle)');

    sidebarLinks.forEach(link => {
        // Use new URL to safely get the pathname from the link's href
        const linkPath = new URL(link.href, window.location.origin).pathname;

        link.classList.remove('active'); // Reset all links first
        if (currentPath === linkPath) {
            link.classList.add('active'); // Apply active class to the matching link
        }
    });
}
// --- NOTIFICATION FUNCTIONS ---

/**
 * Checks for unread notifications from the server.
 */
function checkForNotifications() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:8080/api/super-admin/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => res.json())
        .then(notifications => {
            const badge = document.getElementById('notification-badge');
            const list = document.getElementById('notification-list');
            if (!badge || !list) return;

            list.innerHTML = ''; // Clear previous notifications
            if (notifications && notifications.length > 0) {
                badge.textContent = notifications.length;
                badge.style.display = 'block';
                notifications.forEach(n => {
                    list.innerHTML += `<li><a class="dropdown-item text-wrap" href="#">${n.message}</a></li>`;
                });
            } else {
                badge.style.display = 'none';
                list.innerHTML = '<li><span class="dropdown-item-text">No new notifications</span></li>';
            }
        })
        .catch(error => console.error('Error checking notifications:', error));
}

/**
 * Marks all unread notifications as read.
 */
function markNotificationsAsRead() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:8080/api/super-admin/notifications/mark-as-read', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(() => {
        // Re-check notifications after a short delay to update the UI
        setTimeout(checkForNotifications, 500);
    }).catch(error => console.error('Error marking notifications as read:', error));
}