$(document).ready(function Login() {
    $("#btn_submit").click(function () {
        const dataEmail = $("#inputEmail").val().trim();
        const dataPassword = $("#inputPassword").val().trim();

        $.ajax({
            url: 'http://localhost:29539/api/Auth/Login',
            method: 'POST',
            dataType: 'json',
            data: {
                email: dataEmail,
                password: dataPassword
            },
            success: function (data) {
                if (data.message == "Email or Password Invalid") {
                    Swal.fire("Error!", `${data.message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.message}`, "success")
                    console.log(data.token)
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                Swal.fire("Error!", "Please try again", "error");
            }
        })
    })
})