document.addEventListener('DOMContentLoaded', () => { 
    const teacherName = localStorage.getItem('name') || localStorage.getItem('username'); // ดึงชื่อเต็มหรือ username
    const teacherEmail = localStorage.getItem('username');
    const teacherRole = localStorage.getItem('userRole');
    document.getElementById('teacher-name').textContent = teacherName || 'อาจารย์ทุกท่าน';
    document.getElementById('teacher-email').textContent = teacherEmail || 'contact@slw.ac.th';
    document.getElementById('teacher-role').textContent = teacherRole || 'ครู';

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'teacher') {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = 'login.html';
    }
});
