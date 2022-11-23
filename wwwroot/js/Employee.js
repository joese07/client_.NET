
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



function register() {

    const dataRegister = {
        
    };

    const dataJson = JSON.stringify(dataRegister);

    $.ajax({
        type: 'POST',
        url: "http://localhost:29539/api/Auth/Register",
        data: JSON.stringify({
            fullName: "joese rio Telysana",
            email: "joese@gmail.com",
            birthDate: "2202",
            gender: "laki- laki",
            phoneNumber: "029292922",
            password: "joese123",
            retypePassword: "joese123",
            departementId: 6019,
        }),
        success: function (data) {
            Swal.fire("Done!", `${data.message}`, "success").then(function () {
                location.reload();
            })
        },
        error: function (data) {
            Swal.fire("Error!", `${data.message}`, "error")
        },
        dataType: 'json',
        contentType: "application/json"
    });
}
