document.addEventListener('DOMContentLoaded', () => {
    const studentTable = document.getElementById('student-list');

    // URL ของ Google Script ที่ส่งข้อมูล JSON มาให้
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiNh3mDGKfIvpV6EGRqVg8tlhVGA5tcCOUVUR3rmfhzRsmC5f0-jb0pJrakGNNks8Z/exec";

    // ฟังก์ชันดึงข้อมูลจาก Google Script
    async function fetchStudents() {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL);
            if (!response.ok) {
                throw new Error("ไม่สามารถโหลดข้อมูลนักเรียนได้");
            }
            const data = await response.json();
            renderStudents(data);
        } catch (error) {
            console.error("Error:", error);
            studentTable.innerHTML = `<tr><td colspan="3">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>`;
        }
    }

    // ฟังก์ชันแสดงข้อมูลในตาราง
    function renderStudents(students) {
        studentTable.innerHTML = ""; // เคลียร์ตารางก่อนเพิ่มข้อมูลใหม่
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

    // เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อโหลดหน้า
    fetchStudents();
});
