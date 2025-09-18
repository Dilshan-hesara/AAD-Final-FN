// profil detai


function fetchProfileData() {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    fetch('http://localhost:8080/api/staff/my-profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(response => {
            if (!response.ok) { throw new Error('Failed to fetch profile. Status: ' + response.status); }
            return response.json();
        })
        .then(profile => {
            document.getElementById('sidebar-branch-name').textContent = profile.branchName;
            document.getElementById('sidebar-admin-name').textContent = `Welcome, ${profile.fullName}`;

            console.log(profile.branchName)
            console.log(profile.fullName)
        })
        .catch(error => console.error('Error loading profile data:', error));
}


function fetchSuperAdminProfile() {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/super-admin/my-profile', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
        .then(res => res.json())
        .then(profile => {

            document.getElementById('sidebar-admin-name').textContent = `Welcome, ${profile.fullName}`;

            if (profile.profilePictureUrl) {
                document.getElementById('sidebar-profile-pic').src = 'http://localhost:8080' + profile.profilePictureUrl;
            }


        });



}



//branch admin

document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileData();
                attachLogoutEvent();
                fetchSuperAdminProfile();
            });
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileAndDashboardData();
                attachLogoutEvent();
                setActiveLink();
            });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/sidebar.html')
            .then(response => {
                if (!response.ok) throw new Error('Could not find sidebar.html. Check the file path.');
                return response.text();
            })
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileAndDashboardData();
                attachLogoutEvent();
                setActiveLink();
            })
            .catch(error => console.error("Error loading sidebar component:", error));
    }
});




//res


document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('resp-sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/resp-sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileData();
                attachLogoutEvent();
                fetchSuperAdminProfile();

            });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('resp-sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/resp-sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileAndDashboardData();
                attachLogoutEvent();
                setActiveLink();
            });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('resp-sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/resp-sidebar.html')
            .then(response => {
                if (!response.ok) throw new Error('Could not find sidebar.html. Check the file path.');
                return response.text();
            })
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileAndDashboardData();
                attachLogoutEvent();
                setActiveLink();
            })
            .catch(error => console.error("Error loading sidebar component:", error));
    }
});



//logout

function attachLogoutEvent() {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = '../login.html';
        }
    });
}


function setActiveLink() {
    document.querySelectorAll('.sidebar a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}






function fetchProfileAndDashboardData() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('http://localhost:8080/api/staff/my-profile', { headers: { 'Authorization': 'Bearer ' + token }})
        .then(res => res.json())
        .then(profile => {
            document.getElementById('sidebar-branch-name').textContent = profile.branchName;
            document.getElementById('sidebar-admin-name').textContent = `Welcome, ${profile.fullName}`;

            const branchId = profile.branchId;
            if (!branchId) return;

            return fetch(`http://localhost:8080/api/branch/${branchId}/dashboard-details`, { headers: { 'Authorization': 'Bearer ' + token }});
        })
        .then(res => res.json())
        .then(dashboardData => {
            if (typeof loadDashboardData === 'function') {
                loadDashboardData(dashboardData);
            }
            if (typeof loadDoctorsOnDuty === 'function') {
                loadDoctorsOnDuty();
            }
        })
        .catch(error => console.error('Error loading page data:', error));

}




// In your layout-loader.js

// Add these two functions to the file
function checkForNotifications() {
    const token = localStorage.getItem('authToken');
    // --- Use the new, dedicated URL ---
    fetch('http://localhost:8080/api/branch-admin/notifications/unread', { headers: { 'Authorization': 'Bearer ' + token } })
        .then(res => res.json())
        .then(notifications => {
            // ... logic to display notifications and update badge count ...
        });
}

function markNotificationsAsRead() {
    const token = localStorage.getItem('authToken');
    // --- Use the new, dedicated URL ---
    fetch('http://localhost:8080/api/branch-admin/notifications/mark-as-read', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(() => {
        setTimeout(checkForNotifications, 500);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;

                // Load all necessary data and attach events
                fetchProfileData();
                attachLogoutEvent();
                setActiveLink();

                // Initialize notifications
                checkForNotifications();
                setInterval(checkForNotifications, 30000);
                document.getElementById('notification-bell').addEventListener('click', markNotificationsAsRead);
            });
    }
});


