
$("#data-departement").DataTable({
    ajax: {
        url: "http://localhost:29539/api/Departement",
        dataSrc: "data",
    },
    columns: [
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
            data: "name",
        },
        {
            data: "divisionId",
        },
        {
            data: null,
            render: function (data, type, row) {
                return `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detailModal" onclick="detailDepartement('${data.id}')">
                            <i class="fas fa-folder">
                            </i>
                            View
                        </button>`;
            }
        },
    ],
});

$.ajax({
    url: 'http://localhost:29539/api/Divisions',
}).done((res) => {
    let divisions = "";
    $.each(res.data, function (key, val) {
        divisions += `<option value="${val.id}">${val.name}</option>`
    });

    $("#InputDivisionIdDepartement").html(divisions);
});


function createDepartement() {

    const nameDepartement = $("#InputNameDepartement").val();
    const DivisionIdDepartement = $("#InputDivisionIdDepartement").val();

    $.ajax({
        url: 'http://localhost:29539/api/Departement',
        method: 'POST',
        dataType: 'json',
        data: {
            name: nameDepartement,
            divisionId: parseInt(DivisionIdDepartement)
        },
        success: function (data) {
            alert("Add Data Successfull" + data);
        },
        error: function (data) {
            getAlertError();
        }
    })
}


function detailDepartement(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:29539/api/Departement/${id}`,
    }).done((res) => {
        let dataId = "";
        dataId = `<input type="text" class="form-control" value="${res.id}" readonly>`;

        let dataNama = "";
        dataNama = `<input type="text" class="form-control" value="${res.name}" readonly>`;

        $.ajax({
            url: `http://localhost:29539/api/Divisions/${res.divisionId}`,
        }).done((res) => {
            let divisions = "";
            divisions = `<select class="form-control" id="InputDivisionIdDepartement" disabled><option value="${res.id}">${res.name}</option></select>`;

            $("#DetailDivisionIDDepartement").html(divisions);
        });

        let dataEdit = "";
        dataEdit = `<button type="button" class="btn btn-primary" onclick="editDepartement('${res.name}','${res.divisionId}','${res.id}')"> Edit</button >`;

        let dataDelete = "";
        dataDelete = `  <button type="button" class="btn btn-danger " onclick="deleteDepartement('${res.id}')">Delete</button>`;

        $("#button-edit").html(dataEdit);
        $("#button-delete").html(dataDelete);
        $("#DetailIdDepartement").html(dataId);
        $("#DetailNamaDepartement").html(dataNama);
      
    })
};


function editDepartement(name, divisionId, id) {

    $.ajax({
        url: 'http://localhost:29539/api/Divisions',
    }).done((res) => {
        let divisions = "";
        $.each(res.data, function (key, val) {
            divisions += `<option value="${val.id}">${val.name}</option>`
        });

        $("#DivisionIdDepartement").html(divisions);
    });

    let dataNama = "";
    dataNama = `<input type="text" class="form-control" id="dataNama" value="${name}">`;

    let dataDivisionId = "";
    dataDivisionId = `<select class="form-control" id="DivisionIdDepartement"></select>`;

    let dataEdit = "";
    dataEdit = `<button type="submit" class="btn btn-primary" onclick="saveEdit('${id}')">Save Change</button >`;

    $("#button-edit").html(dataEdit);
    $("#DetailNamaDepartement").html(dataNama);
    $("#DetailDivisionIDDepartement").html(dataDivisionId);
}

function saveEdit(id) {

    let dataName = $("#dataNama").val();
    let dataDivisionId = $("#DivisionIdDepartement").val();

    $.ajax({
        url: `http://localhost:29539/api/Departement/${id}`,
        method: 'PUT',
        dataType: 'json',
        data: {
            name: dataName,
            divisionId: dataDivisionId
        },
        success: function (data) {
            alert('Edit data successful' + data);
        }
    })
}

function deleteDepartement(id) {
    $.ajax({
        url: `http://localhost:29539/api/Departement/${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: function (data) {
            alert("Delete Data Successfull" + data)
            location.reload();
        }
    })
}