document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลจาก localStorage
    const studentName = localStorage.getItem('name');
    const studentEmail = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');

    // แสดงชื่อและข้อมูล
    document.getElementById('student-name').textContent = studentName || 'นักเรียน';
    document.getElementById('student-email').textContent = studentEmail || 'ไม่มีข้อมูล';
    document.getElementById('student-role').textContent = userRole === 'student' ? 'นักเรียน' : 'ผู้ใช้ทั่วไป';

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    if (userRole !== 'student') {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = 'login.html';
    }
});
