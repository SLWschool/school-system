// auth.js

function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://script.google.com/macros/s/AKfycbwuqsiQsOEqEcrRU37qs1WMOwF5f-1yZj3OthEKLYE2rCikvr4-05AsbRniyL7KXDvQpw/exec')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);

            if (user) {
                alert('เข้าสู่ระบบสำเร็จ');
                
                // เก็บข้อมูลเข้าสู่ระบบ
                localStorage.setItem('username', user.username);
                localStorage.setItem('role', user.role);

                window.location.href = user.role === 'teacher' ? 'teacher-dashboard.html' : 'dashboard.html';
            } else {
                alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        })
        .catch(error => console.error('เกิดข้อผิดพลาด:', error));
}

// โหลดข้อมูลครูใน teacher-dashboard
function loadTeacherDashboard() {
    const username = localStorage.getItem('username');

    fetch('https://script.google.com/macros/s/AKfycbwuqsiQsOEqEcrRU37qs1WMOwF5f-1yZj3OthEKLYE2rCikvr4-05AsbRniyL7KXDvQpw/exec')
        .then(response => response.json())
        .then(data => {
            const teacher = data.users.find(user => user.username === username);

            if (teacher) {
                document.getElementById('teacher-name').textContent = teacher.name;
                document.getElementById('teacher-email').textContent = teacher.username;
                document.getElementById('teacher-role').textContent = teacher.role;
            } else {
                alert('ไม่พบข้อมูลครู');
            }
        })
        .catch(error => console.error('เกิดข้อผิดพลาด:', error));
}

// โหลดข้อมูลครูในหน้าโปรไฟล์
function loadTeacherProfile() {
    const username = localStorage.getItem('username');

    fetch('https://script.google.com/macros/s/AKfycbwuqsiQsOEqEcrRU37qs1WMOwF5f-1yZj3OthEKLYE2rCikvr4-05AsbRniyL7KXDvQpw/exec')
        .then(response => response.json())
        .then(data => {
            const teacher = data.users.find(user => user.username === username);

            if (teacher) {
                document.getElementById('profile-name').textContent = teacher.name;
                document.getElementById('profile-email').textContent = teacher.username;
                document.getElementById('profile-role').textContent = teacher.role;
            } else {
                alert('ไม่พบข้อมูลโปรไฟล์');
            }
        })
        .catch(error => console.error('เกิดข้อผิดพลาด:', error));
}

// โหลดข้อมูลตามหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('teacher-dashboard')) {
        loadTeacherDashboard();
    }
    if (document.getElementById('profile-page')) {
        loadTeacherProfile();
    }
});
