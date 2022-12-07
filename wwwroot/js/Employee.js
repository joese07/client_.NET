
function format(d) {
    console.log(d.birthDate)
    return
    
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>ID :</td>' +
        '<td>' + d.id + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>FullName :</td>' +
        '<td>' + d.fullName + '</td>' +
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
}

$(document).ready(function () {
    var table = $("#table_employee").DataTable({
        ajax: {
            url: 'http://localhost:29539/api/Employee',
            dataSrc: "data",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("key"),
            },
        },
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            //{
            //    data: null,
            //    render: function (data, type, row, meta) {
            //        return meta.row + meta.settings._iDisplayStart + 1;
            //    },
            //},
            {
                data: 'id',
                //render: function (data, type, row) {
                //    return data.id;
                //}
            },
            {
                data: 'fullName',
                //render: function (data, type, row) {
                //    return data.fullName;
                //}
            },
            {
                data: 'email',
                //render: function (data, type, row) {
                //    return data.email;
                //}
            },
            {
                data: 'departementId',
                //render: function (data, type, row) {
                //    return data.departementId;
                //}
            },
        ],
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        buttons:['pdf','colvis']
    });

    $('#table_employee tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).parents('tr');
        var row = table.row(tr);
        
        if (row.child.isShown()) {
            //This row is already open - close it

            row.child.hide();
            tr.removeClass('shown');

        } else {
            const dataTable = row.data();
            row.child(format(dataTable)).show();
            tr.addClass('shown');
        }
    });
   
})

$.ajax({
    url: 'http://localhost:29539/api/Departement',
    headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("key"),
    }
}).done((res) => {
    let departement = "";
    $.each(res.data, function (key, val) {
        departement += `<option value="${val.id}">${val.name}</option>`
    });

    $("#InputSelectDepartement").html(departement);
})

$(document).ready(function register() {
    $("#btn_submit_register").click(function () {
        const fullname = $("#inputfullname").val();
        const email = $("#inputemail").val();
        const phone = $("#inputphonenumber").val();
        const birthdate = $("#inputbirthdate").val();
        const gender = $("#inputgender").val();
        const password = $("#inputpassword").val();
        const confpassword = $("#inputconfirmpassword").val();
        const idDepartement = $("#InputSelectDepartement").val();

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
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("key"),
            },
            success: function (data) {
                if (data.message == "Email Already Exists") {
                    Swal.fire("Error!", `${data.message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.message}`, "success").then(function () {
                    location.replace('https://localhost:7104/Auth/Login');  
                    })
                }
            },
            error: function (data) {
                Swal.fire("Error!", `${data.message}`, "error")
            },

        });
    })
   
})
