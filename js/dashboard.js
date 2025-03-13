document.addEventListener("DOMContentLoaded", function() {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (!role) {
        window.location.href = "login.html";
    }

    document.getElementById("userRole").innerText = username + " (" + role + ")";

    const dashboardContent = document.getElementById("dashboardContent");

    if (role === "teacher") {
        dashboardContent.innerHTML = `<h3>📚 เมนูสำหรับครู</h3>
                                      <ul>
                                          <li><a href="#">ดูข้อมูลนักเรียน</a></li>
                                          <li><a href="#">จัดการเกรด</a></li>
                                      </ul>`;
    } else {
        dashboardContent.innerHTML = `<h3>🎓 เมนูสำหรับนักเรียน</h3>
                                      <ul>
                                          <li><a href="#">ดูผลการเรียน</a></li>
                                          <li><a href="#">เช็คตารางเรียน</a></li>
                                      </ul>`;
    }
});

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
