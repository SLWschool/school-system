document.addEventListener('DOMContentLoaded', () => {
    // ดึงข้อมูลนักเรียนและวิชาจาก localStorage หรือ API
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const gradesList = document.getElementById('grades-list');
    const gradeForm = document.getElementById('grade-form');
    const gradeMessage = document.getElementById('grade-message');
    
    // เติมข้อมูลนักเรียนในฟอร์ม
    const studentSelect = document.getElementById('student-name');
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });

    // เติมข้อมูลวิชาในฟอร์ม
    const subjectSelect = document.getElementById('subject');
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });

    // ฟังก์ชันการบันทึกผลการเรียน
    gradeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const studentId = studentSelect.value;
        const subjectId = subjectSelect.value;
        const grade = document.getElementById('grade').value;

        // ตรวจสอบว่ามีข้อมูลครบถ้วน
        if (!studentId || !subjectId || !grade) {
            gradeMessage.textContent = 'กรุณากรอกข้อมูลให้ครบ';
            gradeMessage.style.color = 'red';
            return;
        }

        // บันทึกผลการเรียน (สามารถบันทึกใน localStorage หรือส่งไปที่ API)
        const gradeData = {
            studentId,
            subjectId,
            grade,
        };

        let grades = JSON.parse(localStorage.getItem('grades')) || [];
        grades.push(gradeData);
        localStorage.setItem('grades', JSON.stringify(grades));

        // แสดงข้อความสำเร็จ
        gradeMessage.textContent = 'บันทึกผลการเรียนสำเร็จ';
        gradeMessage.style.color = 'green';

        // เพิ่มข้อมูลลงในตาราง
        const student = students.find(s => s.id === studentId);
        const subject = subjects.find(s => s.id === subjectId);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${subject.name}</td>
            <td>${grade}</td>
        `;
        gradesList.appendChild(row);
    });
});
