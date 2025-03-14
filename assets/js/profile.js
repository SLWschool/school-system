document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('name') || 'ไม่พบชื่อผู้ใช้';
    const email = localStorage.getItem('username') || 'ไม่พบอีเมล';
    const userRole = localStorage.getItem('userRole') || 'student';

    const profileInfo = document.getElementById('profile-info');
    const editBtn = document.getElementById('edit-btn');
    const editForm = document.getElementById('edit-form');
    const profileForm = document.getElementById('profile-form');

    // แสดงข้อมูลโปรไฟล์
    profileInfo.innerHTML = `
        <p><strong>ชื่อผู้ใช้:</strong> ${username}</p>
        <p><strong>อีเมล:</strong> ${email}</p>
        <p><strong>บทบาท:</strong> ${userRole === 'teacher' ? 'ครู' : 'นักเรียน'}</p>
    `;

    // เมื่อกดปุ่ม "แก้ไขโปรไฟล์"
    editBtn.addEventListener('click', () => {
        editForm.style.display = 'block';
        profileInfo.style.display = 'none';

        // ตั้งค่า input ให้แสดงค่าปัจจุบัน
        document.getElementById('name').value = username;
        document.getElementById('email').value = email;
    });

    // เมื่อบันทึกการแก้ไข
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newName = document.getElementById('name').value;
        const newEmail = document.getElementById('email').value;

        // บันทึกข้อมูลใหม่ลง Local Storage
        localStorage.setItem('name', newName);
        localStorage.setItem('email', newEmail);

        // อัปเดตการแสดงผล
        profileInfo.innerHTML = `
            <p><strong>ชื่อผู้ใช้:</strong> ${newName}</p>
            <p><strong>อีเมล:</strong> ${newEmail}</p>
            <p><strong>บทบาท:</strong> ${userRole === 'teacher' ? 'ครู' : 'นักเรียน'}</p>
        `;

        // ซ่อนฟอร์มแก้ไข
        editForm.style.display = 'none';
        profileInfo.style.display = 'block';
    });
});
