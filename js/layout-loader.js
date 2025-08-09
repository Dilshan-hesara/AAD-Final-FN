                                                            document.addEventListener('DOMContentLoaded', function() {
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    if (sidebarPlaceholder) {
        fetch('../components/sidebar.html')
            .then(response => response.text())
            .then(sidebarHtml => {
                sidebarPlaceholder.innerHTML = sidebarHtml;
                fetchProfileData();
                attachLogoutEvent();
            });
    }
});
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

function attachLogoutEvent() {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-button') {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = '../login.html';
        }
    });
}

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




                                                            function setActiveLink() {
                                                                // Highlights the current page's link in the sidebar
                                                                document.querySelectorAll('.sidebar a').forEach(link => {
                                                                    if (link.href === window.location.href) {
                                                                        link.classList.add('active');
                                                                    }
                                                                });
                                                            }


                                                            // This file is js/layout-loader.js

                                                            document.addEventListener('DOMContentLoaded', function() {
                                                                // ... (your existing code to load the sidebar)
                                                            });

                                                            function fetchProfileAndDashboardData() {
                                                                const token = localStorage.getItem('authToken');
                                                                if (!token) return;

                                                                console.log("Step 1: Fetching user profile...");
                                                                fetch('http://localhost:8080/api/staff/my-profile', { headers: { 'Authorization': 'Bearer ' + token }})
                                                                    .then(res => res.json())
                                                                    .then(profile => {
                                                                        console.log("Step 2: Profile data received:", profile);
                                                                        document.getElementById('sidebar-branch-name').textContent = profile.branchName;
                                                                        document.getElementById('sidebar-admin-name').textContent = `Welcome, ${profile.fullName}`;

                                                                        const branchId = profile.branchId;
                                                                        if (!branchId) {
                                                                            console.error("Branch ID not found in profile data.");
                                                                            return;
                                                                        }

                                                                        console.log(`Step 3: Fetching dashboard stats for branch ID: ${branchId}`);
                                                                        return fetch(`http://localhost:8080/api/branch/${branchId}/dashboard-details`, { headers: { 'Authorization': 'Bearer ' + token }});
                                                                    })
                                                                    .then(res => res.json())
                                                                    .then(dashboardData => {
                                                                        console.log("Step 4: Dashboard data received:", dashboardData);

                                                                        // Update the main content with the stats
                                                                        document.getElementById('receptionist-count').textContent = dashboardData.receptionistCount;
                                                                        document.getElementById('doctor-count').textContent = dashboardData.doctorCount;
                                                                        document.getElementById('appointments-today').textContent = dashboardData.appointmentsToday;

                                                                        console.log("Step 5: Dashboard updated successfully!");
                                                                    })
                                                                    .catch(error => {
                                                                        console.error('FINAL ERROR: An error occurred during the process.', error);
                                                                    });
                                                            }

                                                            // ... (your attachLogoutEvent and setActiveLink functions)