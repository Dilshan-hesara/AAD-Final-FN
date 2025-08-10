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






                                                            // ... (your attachLogoutEvent and setActiveLink functions)


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
                                                                // Find the placeholder div in the main HTML page
                                                                const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
                                                                if (sidebarPlaceholder) {
                                                                    // Fetch the reusable sidebar HTML component
                                                                    fetch('../components/sidebar.html')
                                                                        .then(response => {
                                                                            if (!response.ok) throw new Error('Could not find sidebar.html. Check the file path.');
                                                                            return response.text();
                                                                        })
                                                                        .then(sidebarHtml => {
                                                                            // Inject the sidebar HTML into the placeholder
                                                                            sidebarPlaceholder.innerHTML = sidebarHtml;

                                                                            // After the sidebar is loaded, call the functions to fetch data
                                                                            fetchProfileAndDashboardData();
                                                                            attachLogoutEvent();
                                                                            setActiveLink();
                                                                        })
                                                                        .catch(error => console.error("Error loading sidebar component:", error));
                                                                }
                                                            });

                                                            /**
                                                             * Fetches the logged-in admin's profile to get their branch ID,
                                                             * then fetches the dashboard statistics for that branch.
                                                             */

                                                            /**
                                                             * Attaches a click event listener to the logout button.
                                                             */
                                                            function attachLogoutEvent() {
                                                                document.body.addEventListener('click', function(e) {
                                                                    if (e.target && e.target.id === 'logout-button') {
                                                                        e.preventDefault();
                                                                        localStorage.removeItem('authToken');
                                                                        window.location.href = '../login.html';
                                                                    }
                                                                });
                                                            }

                                                            /**
                                                             * Highlights the current page's link in the sidebar.
                                                             */
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

                                                                // First, get the admin's profile
                                                                fetch('http://localhost:8080/api/staff/my-profile', { headers: { 'Authorization': 'Bearer ' + token }})
                                                                    .then(res => res.json())
                                                                    .then(profile => {
                                                                        document.getElementById('sidebar-branch-name').textContent = profile.branchName;
                                                                        document.getElementById('sidebar-admin-name').textContent = `Welcome, ${profile.fullName}`;

                                                                        const branchId = profile.branchId;
                                                                        if (!branchId) return;

                                                                        // Then, get the dashboard statistics
                                                                        return fetch(`http://localhost:8080/api/branch/${branchId}/dashboard-details`, { headers: { 'Authorization': 'Bearer ' + token }});
                                                                    })
                                                                    .then(res => res.json())
                                                                    .then(dashboardData => {
                                                                        // Call the function in dashboard.html to load the stats and render the chart
                                                                        if (typeof loadDashboardData === 'function') {
                                                                            loadDashboardData(dashboardData);
                                                                        }
                                                                        // Also call the function to load the "Doctors on Duty" list
                                                                        if (typeof loadDoctorsOnDuty === 'function') {
                                                                            loadDoctorsOnDuty();
                                                                        }
                                                                    })
                                                                    .catch(error => console.error('Error loading page data:', error));
                                                            }

                                                            // ... your existing attachLogoutEvent and setActiveLink functions