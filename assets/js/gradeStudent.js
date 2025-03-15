document.addEventListener('DOMContentLoaded', async () => {
    const apiUrl = "https://script.google.com/macros/s/AKfycbxVXgNcsA-X87rfy4Okzl7TT99MnyJOHT0TkdZbPRXr57IwZ62xHOspZAj_PlzTAGM4/exec";
    
    try {
        const response = await fetch(apiUrl);
        const gradeData = await response.json();

        if (!gradeData || gradeData.length === 0) {
            document.getElementById('name').textContent = "ไม่มีข้อมูล";
            document.getElementById('gpa').textContent = "N/A";
            return;
        }

        // ตั้งค่าให้แสดงชื่อนักเรียน (ใช้ชื่อของนักเรียนคนแรก)
        document.getElementById('name').textContent = gradeData[0].name;

        const gradeList = document.getElementById('grade-list');
        let totalWeight = 0;
        let totalGradePoints = 0;

        gradeData.forEach(grade => {
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
