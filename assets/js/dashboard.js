// ตรวจสอบบทบาทจาก localStorage เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const roleSpecificContent = document.getElementById('role-specific-content');
    
    if (userRole === 'teacher') {
        // ถ้าเป็นครู แสดงเนื้อหาสำหรับครู
        roleSpecificContent.innerHTML = `
            <h2>ยินดีต้อนรับ, ครู</h2>
            <div class="menu">
                <div class="sub-menu">
                    <button onclick="goToTeacherDashboard()" class="btn teacher">ไปที่ Dashboard ครู</button>
                    <button onclick="goToGradeManagement()" class="btn teacher">จัดการคะแนน</button>
                </div>
            </div>
        `;
    } else if (userRole === 'student') {
        // ถ้าเป็นนักเรียน แสดงเนื้อหาสำหรับนักเรียน
        roleSpecificContent.innerHTML = `
            <h2>ยินดีต้อนรับ, นักเรียน</h2>
            <button onclick="goToStudentDashboard()" class="btn student">ไปที่ Dashboard นักเรียน</button>
            <button onclick="goToSubjectGrades()" class="btn student">ดูผลการเรียน</button>
        `;
    } else {
        // ถ้าไม่พบบทบาทให้แสดงข้อความ
        roleSpecificContent.innerHTML = `
            <h2>ไม่พบข้อมูลผู้ใช้ในระบบ</h2>
        `;
    }
});

// ฟังก์ชันไปที่ Dashboard ของครู
function goToTeacherDashboard() {
    window.location.href = 'teacher-dashboard.html';
}

// ฟังก์ชันไปที่หน้าเพจการจัดการคะแนน
function goToGradeManagement() {
    window.location.href = 'grade-management.html';
}

// ฟังก์ชันไปที่ Dashboard ของนักเรียน
function goToStudentDashboard() {
    window.location.href = 'student-dashboard.html';
}

// ฟังก์ชันไปที่หน้าแสดงผลการเรียน
function goToSubjectGrades() {
    window.location.href = 'subject-grades.html';
}
