// ตรวจสอบการเข้าสู่ระบบ
function login(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อ submit

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ดึงข้อมูลจาก login.json
    fetch("https://script.google.com/macros/s/AKfycbwuqsiQsOEqEcrRU37qs1WMOwF5f-1yZj3OthEKLYE2rCikvr4-05AsbRniyL7KXDvQpw/exec")
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username);

            if (user && user.password === password) {
                alert("เข้าสู่ระบบสำเร็จ");

                // เก็บข้อมูลใน localStorage
                localStorage.setItem("username", user.username);
                localStorage.setItem("userRole", user.role);
                
                // เปลี่ยนเส้นทางไปที่ dashboard ตาม role
                if (user.role === "teacher") {
                    window.location.href = "teacher-dashboard.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            } else {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }
        })
        .catch(error => {
            console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
        });
}

// ตรวจสอบว่ามีฟอร์ม login หรือไม่
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});
