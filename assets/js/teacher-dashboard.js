document.addEventListener('DOMContentLoaded', () => { 
    const teacherUsername = localStorage.getItem('username'); // ดึงชื่อครูจาก Local Storage
    document.getElementById('teacher-name').textContent = teacherUsername || 'ครู';

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'teacher') {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = 'login.html';
    }
});
