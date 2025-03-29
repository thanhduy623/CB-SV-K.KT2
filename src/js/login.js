function handleCredentialResponse() {
    const responsePayload = parseJwt(response.credential);

    
}



function handleCredentialResponses(response) {
            // Giải mã token để lấy thông tin người dùng
            const responsePayload = parseJwt(response.credential);
            
            // Hiển thị thông tin người dùng
            document.getElementById("user-info").style.display = "block";
            document.getElementById("user-name").textContent = responsePayload.name;
            document.getElementById("user-email").textContent = responsePayload.email;
            document.getElementById("user-pic").src = responsePayload.picture;

            // Ẩn nút đăng nhập
            document.querySelector(".g_id_signin").style.display = "none";
        }

        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }

        function signOut() {
            // Ẩn thông tin người dùng
            document.getElementById("user-info").style.display = "none";

            // Hiển thị lại nút đăng nhập
            document.querySelector(".g_id_signin").style.display = "block";
        }