document.addEventListener('DOMContentLoaded', () => {
    const showTime = new Date("2025-03-15T16:33:00"); // กำหนดเวลาแสดงผล
    const now = new Date();

    if (now >= showTime) {
        loadStudentGrades(); // ถ้าเวลาถึงแล้ว แสดงผลทันที
    } else {
        const interval = setInterval(() => {
            const currentTime = new Date();
            if (currentTime >= showTime) {
                clearInterval(interval); // หยุดการตรวจสอบเมื่อถึงเวลา
                loadStudentGrades(); // แสดงผลตาราง
            }
        }, 1000); // ตรวจสอบทุก 1 วินาที
    }
});

async function loadStudentGrades() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxVXgNcsA-X87rfy4Okzl7TT99MnyJOHT0TkdZbPRXr57IwZ62xHOspZAj_PlzTAGM4/exec";
    
    const studentName = localStorage.getItem('name');

    if (!studentName) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const gradeData = await response.json();

        const studentGrades = gradeData.filter(grade => grade.name === studentName);

        if (!studentGrades.length) {
            document.getElementById('name').textContent = studentName + " (ไม่มีข้อมูลเกรด)";
            document.getElementById('gpa').textContent = "N/A";
            return;
        }

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

            totalWeight += grade.weight;
            totalGradePoints += grade.weight * parseFloat(grade.grade);
        });

        const gpa = totalWeight > 0 ? (totalGradePoints / totalWeight).toFixed(2) : "0.00";
        document.getElementById('gpa').textContent = gpa;

    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        document.getElementById('name').textContent = "เกิดข้อผิดพลาด";
        document.getElementById('gpa').textContent = "N/A";
    }
}
