document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;

                fetchSuperAdminProfile();
                attachLogoutEvent();
                setActiveLink();

                checkForNotifications();
                setInterval(checkForNotifications, 30000);
                document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
});


function fetchSuperAdminProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

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



function attachLogoutEvent() {
    document.body.addEventListener('click', function (e) {
        if (e.target.closest('#logout-button')) {
            e.preventDefault();r

            console.log('Logout button clicked. Clearing token...');
            localStorage.removeItem('authToken');

            window.location.href = '../../login.html';
        }
    });
}

function setActiveLink() {
    const currentPath = window.location.pathname;


    const sidebarLinks = document.querySelectorAll('#sidebar-placeholder a.nav-link:not(.dropdown-toggle)');

    sidebarLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;

        link.classList.remove('active');
        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
}

function checkForNotifications() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:8080/api/super-admin/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => res.json())
        .then(notifications => {
            const badge = document.getElementById('notification-badge');
            const list = document.getElementById('notification-list');
            if (!badge || !list) return;

            list.innerHTML = '';
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


function markNotificationsAsRead() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:8080/api/super-admin/notifications/mark-as-read', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(() => {
        setTimeout(checkForNotifications, 500);
    }).catch(error => console.error('Error marking notifications as read:', error));
}