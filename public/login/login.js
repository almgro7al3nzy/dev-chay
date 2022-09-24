$(function () {
    $('.login-form').on('submit', function (event) {
        event.preventDefault();
        var email = $("#email_login").val();
        var password = $("#password_login").val();

        var isOk = true;

        if (email == null || email == "") {
            alert("Email cannot empty:" + email);
            isOk = false;
        }
        if (password == null || password == "") {
            alert("Password is not valid");
            isOk = false;
        }
        if (!isOk) return;

        const userData = {
            "email": email,
            "password": password
        }

        $.post('/users/login', userData, function (data) {
            if(data.code != 0){
                alert(data.message);
                return;
            }

            localStorage.accessToken = JSON.stringify(data);
            window.event.returnValue = false;
            console.log(localStorage.accessToken);
            window.event.returnValue = false;
            window.location.href = "/main/index.html";
        });
    });

    $('.register-form').on('submit', function (event) {
        event.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        var first_name = $("#first_name").val();
        var last_name = $("#last_name").val();
        var isOk = true;

        if (email == null || email == "") {
            alert("Email cannot empty:" + email);
            isOk = false;
        }
        if (password == null || password == "") {
            alert("Password is not valid");
            isOk = false;
        }
        if(first_name == null || first_name == ""){
            alert("First name cannot be empty")
            isOk = false;
        }
        if(last_name == null || last_name ==""){
            alert("Last name cannot be empty");
            isOk = false;
        }
        if (!isOk) return;

        const userData = {
            "email": email,
            "password": password,
            "first_name":first_name,
            "last_name":last_name
        }

        $.post('/users/register', userData, function (data) {
            console.log(data);
            if(data.code != 0){
                alert(data.message);
                return;
            }

            localStorage.accessToken = JSON.stringify(data);
            window.event.returnValue = false;
            console.log(localStorage.accessToken);
            window.location.href = "/main/index.html";
        });
    });
});

function onRedirectLoginPage() {
    $(".login-form").show();
    $(".register-form").hide(); 
}

function onRedirectRegisterPage() {
    $(".login-form").hide();
    $(".register-form").show(); 
}