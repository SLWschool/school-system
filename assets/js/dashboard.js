// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole'); // ดึงข้อมูลบทบาทจาก localStorage
    const buttonsDiv = document.getElementById('buttons');

    if (userRole === 'student') {
        // แสดงปุ่มสำหรับนักเรียน
        buttonsDiv.innerHTML = `
            <button onclick="location.href='student-dashboard.html'" class="btn">เข้าสู่แดชบอร์ดนักเรียน</button>
        `;
    } else if (userRole === 'teacher') {
        // แสดงปุ่มสำหรับครู
        buttonsDiv.innerHTML = `
            <button onclick="location.href='teacher-dashboard.html'" class="btn">เข้าสู่แดชบอร์ดครู</button>
        `;
    } else {
        // ถ้าไม่มีบทบาทที่รู้จัก
        buttonsDiv.innerHTML = `
            <p>เกิดข้อผิดพลาดในการระบุบทบาทผู้ใช้</p>
        `;
    }
});
