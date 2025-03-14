document.addEventListener("DOMContentLoaded", function () {
    const subjectSelect = document.getElementById("subject");
    const gradeForm = document.getElementById("grade-form");
    const testScoreDiv = document.getElementById("test-score");

    // รายการวิชาและลิงก์ iframe ของแต่ละวิชา
    const subjectLinks = {
        "thai": "https://docs.google.com/spreadsheets/d/1iuwdT6ZEaSSGgRGFCq9GbN91oYitEhVr5FyxsJNQ5m0/edit?usp=sharing",
        "math": "https://docs.google.com/spreadsheets/d/1LD5JyxnCvYl9aFjwqiL03EQH5NO5ycV_kxTei68cPcs/edit?usp=sharing",
        "science": "https://docs.google.com/spreadsheets/d/12nnWsTBZh73_ICQCML3Rvehf_BwFJ2SSGQyT16zKR8s/edit?usp=sharing",
        "tech": "https://docs.google.com/spreadsheets/d/1VxFQOWpdxKQvjHzOe6Uj9Jf3ur1YvDlDDa9YYC8a8SE/edit?usp=sharing",
        "career": "https://docs.google.com/spreadsheets/d/11nsyyRgibm9RiQekbSCmSdPhefRWxZdlGGVrQd8Oi6w/edit?usp=sharing",
        "pe": "https://docs.google.com/spreadsheets/d/11nsyyRgibm9RiQekbSCmSdPhefRWxZdlGGVrQd8Oi6w/edit?usp=sharing",
        "art": "https://docs.google.com/spreadsheets/d/11nsyyRgibm9RiQekbSCmSdPhefRWxZdlGGVrQd8Oi6w/edit?usp=sharing",
        "english": "https://docs.google.com/spreadsheets/d/1iuwdT6ZEaSSGgRGFCq9GbN91oYitEhVr5FyxsJNQ5m0/edit?usp=sharing",
        "soc": "https://docs.google.com/spreadsheets/d/1QYPa23eNjjBx-fI73jsbYTGxN_2cpOHdY7wytxCQWeI/edit?usp=sharing"
    };

    // ฟังก์ชันสำหรับโหลดตัวเลือกวิชา
    function loadSubjects() {
        Object.keys(subjectLinks).forEach(subjectCode => {
            const option = document.createElement("option");
            option.value = subjectCode;
            option.textContent = {
                "thai": "สาระภาษาไทย",
                "math": "สาระคณิตศาสตร์",
                "science": "สาระวิทยาศาสตร์",
                "tech": "สาระเทคโนโลยี",
                "career": "สาระการงานอาชีพ",
                "pe": "สาระสุขศึกษา",
                "art": "สาระศิลปะ",
                "soc": "สาระสังคมฯ",
                "english": "สาระภาษาต่างประเทศ"
            }[subjectCode];
            subjectSelect.appendChild(option);
        });
    }

    // ฟังก์ชันแสดงลิงก์แทน iframe
    function displayGradeLink(subject) {
        testScoreDiv.innerHTML = ""; // เคลียร์ข้อมูลเดิม
        
        if (!subject || !subjectLinks[subject]) return;

        const link = document.createElement("a");
        link.href = subjectLinks[subject]; // ใช้ URL ที่กำหนดไว้
        link.textContent = "เข้าแก้ไขข้อสอบ";
        link.target = "_blank";
        link.style.display = "block";
        link.style.marginTop = "10px";
        link.style.fontSize = "18px";
        link.style.color = "blue";
        link.style.textDecoration = "underline";

        testScoreDiv.appendChild(link);
    }

    // โหลดตัวเลือกวิชาเมื่อหน้าเว็บโหลดเสร็จ
    loadSubjects();

    // จัดการเมื่อกด submit ฟอร์ม
    gradeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedSubject = subjectSelect.value;
        displayGradeLink(selectedSubject);
    });
});
