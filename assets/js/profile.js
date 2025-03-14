document.addEventListener("DOMContentLoaded", function () {
    const profileInfo = document.getElementById("profile-info");
    const editBtn = document.getElementById("edit-btn");
    const editForm = document.getElementById("edit-form");
    const profileForm = document.getElementById("profile-form");

    // ดึง username ที่ล็อกอินอยู่จาก localStorage
    const username = localStorage.getItem("username");

    if (!username) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        window.location.href = "login.html";
        return;
    }

    // ดึงข้อมูลผู้ใช้จาก Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbwuqsiQsOEqEcrRU37qs1WMOwF5f-1yZj3OthEKLYE2rCikvr4-05AsbRniyL7KXDvQpw/exec")
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username);
            if (user) {
                // แสดงข้อมูลในหน้าโปรไฟล์
                profileInfo.innerHTML = `
                    <p><strong>ชื่อ:</strong> ${user.name}</p>
                    <p><strong>อีเมล์:</strong> ${user.username}</p>
                    <p><strong>บทบาท:</strong> ${user.role === "teacher" ? "ครู" : "นักเรียน"}</p>
                `;

                // เติมค่าในฟอร์มแก้ไข
                document.getElementById("name").value = user.name;
                document.getElementById("email").value = user.username;
                document.getElementById("role").value = user.role;
            } else {
                alert("ไม่พบข้อมูลผู้ใช้");
            }
        })
        .catch(error => console.error("เกิดข้อผิดพลาด:", error));

    // แสดงฟอร์มแก้ไขเมื่อคลิกปุ่ม "แก้ไขโปรไฟล์"
    editBtn.addEventListener("click", function () {
        editForm.style.display = "block";
    });

    // เมื่อกดปุ่ม "บันทึก" ให้ส่งข้อมูลไปอัปเดต
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedData = {
            username: username,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            role: document.getElementById("role").value
        };

        // ส่งข้อมูลไปอัปเดตที่ Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbwuqsiQsOEqEcrRU37qs1WMOwF5f-1yZj3OthEKLYE2rCikvr4-05AsbRniyL7KXDvQpw/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("บันทึกข้อมูลสำเร็จ!");
                window.location.reload(); // รีโหลดหน้าเพื่อแสดงข้อมูลล่าสุด
            } else {
                alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
            }
        })
        .catch(error => console.error("เกิดข้อผิดพลาด:", error));
    });
});
