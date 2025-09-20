document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('../components/user-nav.html')
            .then(response => response.text())
            .then(html => {
                navbarPlaceholder.innerHTML = html;
                loadUserProfile();
                attachLogoutEvent();

                checkForNotifications();
                setInterval(checkForNotifications, 60000);

                document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
            });
    }
});

function checkForNotifications() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => res.json())
        .then(notifications => {
            const badge = document.getElementById('notification-badge');
            const list = document.getElementById('notification-list');
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
        });
}

function markNotificationsAsRead() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/notifications/mark-as-read', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(() => {
        setTimeout(checkForNotifications, 500);
    });
}


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


