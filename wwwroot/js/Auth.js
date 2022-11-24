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


$(document).ready(function ForgotPassword() {
    $("#btn_submit_fpass").click(function () {
        const fullName = $("#inputFullNameF").val();
        const email = $("#inputEmailF").val();
        const phoneNumber = $("#inputPhoneNumberF").val();
        const birthDate = $("#inputBirthDateF").val();

        $.ajax({
            url: 'http://localhost:29539/api/Auth/CheckResetPassword',
            method: 'POST',
            async: false,
            dataType: 'json',
            data: {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                birthDate: birthDate
            },
            success: function (data) {
                if (data.message == "Check Reset Password Failed") {
                    Swal.fire("Error!", `${data.message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.message}`, "success").then(function () {
                        $('#change_password').modal('show');
                        //location.replace('https://localhost:7104/Auth/NewPassword');
                        NewPassword(data.data);
                    })
                }  
              },
            error: function (xhr, ajaxOptions, thrownError) {
                Swal.fire("Error!", "Please try again", "error");
            }
        })
       
    })

});


function NewPassword(dataId) {
    console.log(dataId);

    let buttonSubmit = "";
    buttonSubmit = `<button type="button" class="btn btn-primary" value="Submit" onclick="confirmPassword(${dataId})">Submit</button>`

    $("#btn_newPassword").html(buttonSubmit);
   
};


function confirmPassword(dataId) {
     const dataInput = {
        id: dataId,
        password: $("#InputNewPassword").val(),
        retypePassword: $("#InputConfirmPassword").val(),
    }

        $.ajax({
            url: 'http://localhost:29539/api/Auth/ResetPassword',
            method: 'POST',
            dataType: 'json',
            data: dataInput,
            success: function (data) {
                if (data.message == "Reset Password Failed") {
                    Swal.fire("Error!", `${data.message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.message}`, "success").then(function () {
                        location.replace('https://localhost:7104/Auth/Login')
                    })
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                Swal.fire("Error!", "Please try again", "error");
            }

        })
}

