document.getElementById("creat-qr-btn").addEventListener("click", createQR);
document.getElementById("date-event").value = new Date().toISOString().split("T")[0];

let countdownInterval;

function createQR() {
    const encodedData = createData();

    // Gán đường dẫn vào mã QR
    const qrImage = document.querySelector(".QR-box");
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '/src/layouts/submitQR.html?data=' + encodedData)}`;
    qrImage.alt = "Mã QR điểm danh";

    // Lấy thời gian hiển thị QR
    let timeLeft = parseInt(document.getElementById("time-duration").value);

    // Xóa countdown cũ nếu có
    clearInterval(countdownInterval);

    // Cập nhật countdown
    const countdownElement = document.getElementById("countdown");
    countdownElement.textContent = timeLeft;

    countdownInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            createQR(); // Tạo lại QR sau khi hết thời gian
        }
    }, 1000);
}

function createData() {
    const data = {
        "type-event": document.getElementById("type-event").value,
        "date-event": document.getElementById("date-event").value,
        "time-duration": parseInt(document.getElementById("time-duration").value),
        "time-expired": new Date(Date.now() + (parseInt(document.getElementById("time-duration").value) + 5) * 1000).toISOString()
    };

    // Mã hóa data thành URL
    return encodeURIComponent(JSON.stringify(data));
}
