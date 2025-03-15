document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลจาก localStorage
    const studentName = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');

    // แสดงชื่อผู้ใช้
    document.getElementById('student-name').textContent = studentName || 'นักเรียน';

    // ตรวจสอบสิทธิ์การเข้าใช้งาน
    if (userRole !== 'student') {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = 'login.html';
    }

    // ฟังก์ชันสำหรับดึงข้อมูลผลการเรียนจาก Google Sheets หรือ API
    function fetchGrades() {
        fetch('URL_TO_FETCH_GRADES')  // ใส่ URL ของ Google Sheets หรือ API ที่ดึงข้อมูลผลการเรียน
            .then(response => response.json())
            .then(data => {
                const gradeList = document.getElementById('grade-list');
                data.forEach(grade => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${grade.subjectCode}</td>
                        <td>${grade.subjectName}</td>
                        <td>${grade.score}</td>
                        <td>${grade.status}</td>
                    `;
                    gradeList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผลการเรียน:', error);
            });
    }

    // เรียกใช้ฟังก์ชันเพื่อดึงผลการเรียน
    fetchGrades();
});
