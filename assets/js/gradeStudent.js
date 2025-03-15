document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxVXgNcsA-X87rfy4Okzl7TT99MnyJOHT0TkdZbPRXr57IwZ62xHOspZAj_PlzTAGM4/exec";
    
    // ดึงชื่อจากระบบล็อกอิน (ต้องมีการล็อกอินก่อนหน้านี้)
    const studentName = localStorage.getItem('studentName');

    if (!studentName) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "login.html"; // ส่งกลับไปหน้าล็อกอิน
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const gradeData = await response.json();

        // กรองข้อมูลเฉพาะของนักเรียนที่ล็อกอินอยู่
        const studentGrades = gradeData.filter(grade => grade.name === studentName);

        if (!studentGrades.length) {
            document.getElementById('name').textContent = studentName + " (ไม่มีข้อมูลเกรด)";
            document.getElementById('gpa').textContent = "N/A";
            return;
        }

        // ตั้งค่าชื่อนักเรียน
        document.getElementById('name').textContent = studentName;

        const gradeList = document.getElementById('grade-list');
        let totalWeight = 0;
        let totalGradePoints = 0;

        studentGrades.forEach(grade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grade.subId}</td>
                <td>${grade.nameSub}</td>
                <td>${grade.weight}</td>
                <td>${grade.point}</td>
                <td>${grade.grade}</td>
            `;
            gradeList.appendChild(row);

            // คำนวณผลการเรียนเฉลี่ย (GPA)
            totalWeight += grade.weight;
            totalGradePoints += grade.weight * parseFloat(grade.grade);
        });

        // คำนวณ GPA
        const gpa = totalWeight > 0 ? (totalGradePoints / totalWeight).toFixed(2) : "0.00";
        document.getElementById('gpa').textContent = gpa;

    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        document.getElementById('name').textContent = "เกิดข้อผิดพลาด";
        document.getElementById('gpa').textContent = "N/A";
    }
});
