document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("data/users.json");
    const users = await response.json();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("role", user.role);
        localStorage.setItem("username", user.username);
        window.location.href = "dashboard.html"; // ไปหน้า Dashboard
    } else {
        document.getElementById("errorMessage").innerText = "รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    }
});
