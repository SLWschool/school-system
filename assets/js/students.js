
document.addEventListener('DOMContentLoaded', () => {
    const studentTable = document.getElementById('student-list');
    const searchInput = document.getElementById('search-student');

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiNh3mDGKfIvpV6EGRqVg8tlhVGA5tcCOUVUR3rmfhzRsmC5f0-jb0pJrakGNNks8Z/exec"; // ใส่ลิงก์ Google Script ของคุณ
    let studentsData = []; // เก็บข้อมูลนักเรียนทั้งหมด

    // ฟังก์ชันดึงข้อมูลจาก Google Script
    async function fetchStudents() {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL);
            if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลนักเรียนได้");
            
            studentsData = await response.json();
            renderStudents(studentsData);
        } catch (error) {
            console.error("Error:", error);
            studentTable.innerHTML = `<tr><td colspan="3">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>`;
        }
    }

    // ฟังก์ชันแสดงข้อมูลในตาราง
    function renderStudents(students) {
        studentTable.innerHTML = ""; // ล้างข้อมูลเก่า
        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.class}</td>
            `;
            studentTable.appendChild(row);
        });
    }

    // ฟังก์ชันค้นหานักเรียน
    function searchStudents() {
        const query = searchInput.value.toLowerCase();
        const filteredStudents = studentsData.filter(student => 
            student.id.includes(query) || 
            student.name.toLowerCase().includes(query) || 
            student.class.includes(query)
        );
        renderStudents(filteredStudents);
    }

    // ดึงข้อมูลเมื่อโหลดหน้า
    fetchStudents();

    // เพิ่ม Event Listener ให้กับช่องค้นหา
    searchInput.addEventListener('input', searchStudents);
});
