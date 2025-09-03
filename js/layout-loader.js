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





