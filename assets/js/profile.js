document.addEventListener('DOMContentLoaded', () => { 
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');  
    const name = localStorage.getItem('name') || username; // ใช้ชื่อจริง ถ้าไม่มีให้ใช้ username
    const profileInfo = document.getElementById('profile-info');
    const editBtn = document.getElementById('edit-btn');
    const editForm = document.getElementById('edit-form');
    const profileForm = document.getElementById('profile-form');
    
    // แสดงข้อมูลโปรไฟล์
    profileInfo.innerHTML = `
        <p><strong>ชื่อ:</strong> ${name}</p>
        <p><strong>ชื่อผู้ใช้:</strong> ${username}</p>
        <p><strong>บทบาท:</strong> ${userRole === 'teacher' ? 'ครู' : 'นักเรียน'}</p>
    `;

    // เมื่อคลิก "แก้ไขโปรไฟล์"
    editBtn.addEventListener('click', () => {
        editForm.style.display = 'block';
        profileInfo.style.display = 'none';
    });

    // เมื่อบันทึกการแก้ไข
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newName = document.getElementById('name').value;
        const newEmail = document.getElementById('email').value;
        const newRole = document.getElementById('role').value;

        // บันทึกข้อมูลใหม่
        localStorage.setItem('name', newName);
        localStorage.setItem('userRole', newRole);

        // อัปเดตข้อมูลที่แสดง
        profileInfo.innerHTML = `
            <p><strong>ชื่อ:</strong> ${newName}</p>
            <p><strong>ชื่อผู้ใช้:</strong> ${username}</p>
            <p><strong>บทบาท:</strong> ${newRole === 'teacher' ? 'ครู' : 'นักเรียน'}</p>
        `;
        
        // ซ่อนฟอร์มการแก้ไข
        editForm.style.display = 'none';
        profileInfo.style.display = 'block';
    });
});
