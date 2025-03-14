window.addEventListener("scroll", function() {
    let header = document.getElementById("header");

    if (window.scrollY > 50) { // ถ้าเลื่อนลงเกิน 50px
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
