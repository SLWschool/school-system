document.addEventListener('DOMContentLoaded', () => {
    const studentTable = document.getElementById('student-list');
    const studentForm = document.getElementById('add-student-form');
    const searchInput = document.getElementById('search-student');
    const message = document.getElementById('message');

    // ดึงข้อมูลนักเรียนจาก localStorage หรือสร้างใหม่หากยังไม่มี
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // ฟังก์ชันแสดงรายชื่อนักเรียนในตาราง
    function renderStudents(filter = '') {
        studentTable.innerHTML = '';
        students
            .filter(student => student.name.includes(filter))
            .forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.class}</td>
                    <td>${student.number}</td>
                `;
                studentTable.appendChild(row);
            });
    }

    // โหลดข้อมูลนักเรียนเมื่อเปิดหน้า
    renderStudents();

    // ฟังก์ชันเพิ่มนักเรียนใหม่
    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const id = document.getElementById('student-id').value.trim();
        const name = document.getElementById('student-name').value.trim();
        const classLevel = document.getElementById('student-class').value.trim();
        const number = document.getElementById('student-number').value.trim();

        // ตรวจสอบข้อมูล
        if (!id || !name || !classLevel || !number) {
            message.textContent = 'กรุณากรอกข้อมูลให้ครบถ้วน';
            message.style.color = 'red';
            return;
        }

        // ตรวจสอบว่ารหัสนักเรียนซ้ำหรือไม่
        if (students.some(student => student.id === id)) {
            message.textContent = 'รหัสนักเรียนนี้มีอยู่แล้ว';
            message.style.color = 'red';
            return;
        }

        // เพิ่มนักเรียนใหม่
        const newStudent = { id, name, class: classLevel, number };
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

        // อัปเดตตารางและแสดงข้อความสำเร็จ
        renderStudents();
        message.textContent = 'เพิ่มนักเรียนสำเร็จ';
        message.style.color = 'green';

        // ล้างค่าในฟอร์ม
        studentForm.reset();
    });

    // ฟังก์ชันค้นหานักเรียน
    searchInput.addEventListener('input', () => {
        renderStudents(searchInput.value.trim());
    });
});
