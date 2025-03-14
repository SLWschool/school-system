document.addEventListener("DOMContentLoaded", function () {
    const subjectSelect = document.getElementById("subject");
    const gradeForm = document.getElementById("grade-form");
    const testScoreDiv = document.getElementById("test-score");

    // รายการวิชาและลิงก์ iframe ของแต่ละวิชา
    const subjectLinks = {
        "math": "https://example.com/math-results",
        "science": "https://example.com/science-results",
        "english": "https://example.com/english-results",
        "history": "https://example.com/history-results"
    };

    // ฟังก์ชันสำหรับโหลดตัวเลือกวิชา
    function loadSubjects() {
        Object.keys(subjectLinks).forEach(subjectCode => {
            const option = document.createElement("option");
            option.value = subjectCode;
            option.textContent = {
                "math": "คณิตศาสตร์",
                "science": "วิทยาศาสตร์",
                "english": "ภาษาอังกฤษ",
                "history": "ประวัติศาสตร์"
            }[subjectCode];
            subjectSelect.appendChild(option);
        });
    }

    // ฟังก์ชันแสดง iframe ตามวิชาที่เลือก
    function displayGradeIframe(subject) {
        testScoreDiv.innerHTML = ""; // เคลียร์ข้อมูลเดิม
        
        if (!subject || !subjectLinks[subject]) return;

        const iframe = document.createElement("iframe");
        iframe.src = subjectLinks[subject]; // ใช้ URL ที่กำหนดไว้
        iframe.width = "100%";
        iframe.height = "400px";
        iframe.style.border = "1px solid #ccc";

        testScoreDiv.appendChild(iframe);
    }

    // โหลดตัวเลือกวิชาเมื่อหน้าเว็บโหลดเสร็จ
    loadSubjects();

    // จัดการเมื่อกด submit ฟอร์ม
    gradeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedSubject = subjectSelect.value;
        displayGradeIframe(selectedSubject);
    });
});
