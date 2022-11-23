
function format(d) {
    return
    (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>ID :</td>' +
        '<td>' + d.id + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>FullName :</td>' +
        '<td>' + d.fullname + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Gender :</td>' +
        '<td>' + d.gender + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Phone Number :</td>' +
        '<td>' + d.phoneNumber + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Email :</td>' +
        '<td>' + d.email + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>BirthDate :</td>' +
        '<td>' + d.birthDate + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Departement ID :</td>' +
        '<td>' + d.departementId + '</td>' +
        '</tr>' +
        '</table>'
        
    );
}

$(document).ready(function () {
    var table = $("#example").DataTable({
        ajax: {
            url: "http://localhost:29539/api/Employee",
            dataSrc: "data",
        },
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            {
                data: "id",
            },
            {
                data: "fullName",
            },
            {
                data: "email",
            },
            {
                data: "departementId",
            },
        ],
        "order": [[1, 'asc']]
    });

    //Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            //This row is already open - close it
          
            row.child.hide();
            tr.removeClass('shown');

        } else {
            //Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
})



$(document).ready(function register() {
    $("#btn_submit_register").click(function () {
        const fullname = $("#inputfullname").val().trim();
        const email = $("#inputemail").val().trim();
        const phone = $("#inputphonenumber").val().trim();
        const birthdate = $("#inputbirthdate").val().trim();
        const gender = $("#inputgender").val().trim();
        const password = $("#inputpassword").val().trim();
        const confpassword = $("#inputconfirmpassword").val().trim();
        const idDepartement = $("#inputdepartement").val().trim();

        $.ajax({
            url: 'http://localhost:29539/api/Auth/Register',
            method: 'POST',
            dataType: 'json',
            data: {
                birthDate: birthdate,
                fullName: fullname,
                email: email,
                gender: gender,
                phoneNumber: phone,
                departementId: idDepartement,
                password: password,
                retypePassword: confpassword
            },
            success: function (data) {
                if (data.message == "Email Already Exists") {
                    Swal.fire("Error!", `${data.message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.message}`, "success").then(function () {
                        location.reload();
                    })
                }
            },
            error: function (data) {
                Swal.fire("Error!", `${data.message}`, "error")
            },

        });
    })
   
})
