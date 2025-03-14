document.addEventListener('DOMContentLoaded', () => { 
    // ดึงข้อมูลจาก Local Storage
    const teacherName = localStorage.getItem('name') || 'ครู';
    const teacherEmail = localStorage.getItem('email') || 'ไม่พบข้อมูล';
    const userRole = localStorage.getItem('userRole');

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    if (userRole !== 'teacher') {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = 'login.html';
        return;
    }

    // แสดงข้อมูลในแดชบอร์ด
    document.getElementById('teacher-name').textContent = teacherName;
    document.getElementById('teacher-email').textContent = teacherEmail;
    document.getElementById('teacher-role').textContent = 'ครู';
});
