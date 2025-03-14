// auth.js

// ตรวจสอบการเข้าสู่ระบบ
function login(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อ submit

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ดึงข้อมูลจาก login.json
    fetch('https://script.google.com/macros/s/AKfycbxP-k21wClJGwBBw0SQurHAbJggoQeis_u3pgxi_sCVaPTbBONXTup3aVHBKu-nw-ZeJw/exec')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username); // ใช้ find แทนการใช้ filter

            // ตรวจสอบรหัสผู้ใช้
            if (user && user.password === password) {
                alert('เข้าสู่ระบบสำเร็จ');
                localStorage.setItem('userRole', user.role); // เก็บบทบาทผู้ใช้ใน localStorage
                window.location.href = 'dashboard.html';  // ไปที่หน้า dashboard เมื่อเข้าสู่ระบบสำเร็จ
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
