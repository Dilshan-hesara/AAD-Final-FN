// function loadUserProfile() {
//     const token = localStorage.getItem('authToken');
//     fetch('http://localhost:8080/api/user/my-profile', {
//         headers: { 'Authorization': 'Bearer ' + token }
//     })
//         .then(res => res.json())
//         .then(profile => {
//             document.getElementById('nav-profile-name').textContent = profile.fullName;
//             if (profile.profilePictureUrl) {
//                 document.getElementById('nav-profile-pic-ai').src = 'http://localhost:8080' + profile.profilePictureUrl;
//             }
//         });
//
//
//
// }
//
//
// document.addEventListener('DOMContentLoaded', function() {
//
// loadUserProfile();
//
//
// });


//
// function loadUserProfile() {
//     const token = localStorage.getItem('authToken');
//     fetch('http://localhost:8080/api/user/my-profile', {
//         headers: { 'Authorization': 'Bearer ' + token }
//     })
//         .then(res => {
//             // Check if the response is successful
//             if (!res.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return res.json();
//         })
//         .then(profile => {
//             document.getElementById('nav-profile-name').textContent = profile.fullName;
//
//             if (profile.profilePictureUrl) {
//                 // 1. මුලින්ම image element එක තෝරාගන්න
//                 const profilePic = document.getElementById('nav-profile-pic-ai');
//
//                 // 2. image source එක ලබා දෙන්න
//                 profilePic.src = 'http://localhost:8080' + profile.profilePictureUrl;
//                 //
//                 // // 3. දැන් ඒ element එකටම style ටික යොදන්න
//                 // profilePic.width = 32;
//                 // profilePic.height = 32;
//                 // profilePic.classList.add('rounded-circle');
//             }
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
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