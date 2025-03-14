document.addEventListener('DOMContentLoaded', () => { 
    const teacherName = localStorage.getItem('name') || localStorage.getItem('username'); // ดึงชื่อเต็มหรือ username
    document.getElementById('teacher-name').textContent = teacherName || 'ครู';

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'teacher') {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = 'login.html';
    }
});
