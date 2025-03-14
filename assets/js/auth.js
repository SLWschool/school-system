// auth.js

// ตรวจสอบการเข้าสู่ระบบ
function login(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อ submit

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ดึงข้อมูลจาก Google Sheets ผ่าน Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbzQ2hXkbWhLE6pDKQgFECymtSvz3pbWNZap6VpqwfkHHicAgW6pnsG5mpUxV1kB_DSutg/exec')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username); // ค้นหาผู้ใช้จาก username

            // ตรวจสอบรหัสผู้ใช้
            if (user && user.password === password) {
                alert('เข้าสู่ระบบสำเร็จ');

                // เก็บข้อมูลใน localStorage
                localStorage.setItem('username', user.username);
                localStorage.setItem('name', user.name);  // เก็บชื่อครู
                localStorage.setItem('userRole', user.role);

                window.location.href = 'dashboard.html';  // ไปที่หน้า dashboard
            } else {
                alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
        });
}

// เพิ่มฟังก์ชันสำหรับการทำงานเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});
