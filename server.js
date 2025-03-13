const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// โหลดข้อมูลผู้ใช้
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

// โหลดข้อมูลนักเรียนและครู
const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const teachers = JSON.parse(fs.readFileSync('./data/teachers.json', 'utf8'));

// ตรวจสอบการเข้าสู่ระบบ
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, role: user.role, username: user.username });
    } else {
        res.status(401).json({ success: false, message: "รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
});

// ดึงข้อมูลนักเรียน
app.get('/students', (req, res) => {
    res.json(students);
});

// ดึงข้อมูลครู
app.get('/teachers', (req, res) => {
    res.json(teachers);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
