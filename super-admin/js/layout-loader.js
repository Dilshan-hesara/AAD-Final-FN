
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



function attachLogoutEvent() {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = '../login.html';
        }
    });
}


function checkForNotifications() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/super-admin/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
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
    fetch('http://localhost:8080/api/super-admin/notifications/mark-as-read', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(() => {
        setTimeout(checkForNotifications, 500);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileData();
                attachLogoutEvent();
                setActiveLink();

                checkForNotifications();
                setInterval(checkForNotifications, 30000);
                document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
            });
    }
});