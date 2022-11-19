$("#data-divisions").DataTable({
    ajax: {
        url: "http://localhost:29539/api/Divisions",
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
            data: null,
            render: function (data, type, row) {
                return `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#detailModal" onclick="detailDivision('${data.id}')">
                            <i class="fas fa-folder">
                            </i>
                            View
                        </button>`;
            }
        },
    ],
});

function createDivision() {
    const nameDivision = $("#InputNameDivision").val();

    $.ajax({
        url: 'http://localhost:29539/api/Divisions',
        method: 'POST',
        datatype: 'json',
        data: {
            name: nameDivision
        },
        success: function (data) {
            alert("Add Data SuccessFull" + data);
        }
    })

};

function detailDivision(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:29539/api/Divisions/${id}`
    }).done((res) => {
        let dataId = "";
        dataId = `<input type="text" class="form-control" value="${res.id}" readonly>`;

        let dataNama = "";
        dataNama = `<input type="text" class="form-control" value="${res.name}" readonly>`;

        let dataEdit = "";
        dataEdit = `<button type="button" class="btn btn-primary" onclick="editDivision('${res.name}','${res.id}')"> Edit</button >`;

        let dataDelete = "";
        dataDelete = `  <button type="button" class="btn btn-danger" onclick="deleteDivision('${res.id}')">Delete</button>`;

        $("#button-edit").html(dataEdit);
        $("#button-delete").html(dataDelete);
        $("#DetailIdDivision").html(dataId);
        $("#DetailNamaDivision").html(dataNama);
    })
};

function editDivision(name, id) {
    let dataNama = "";
    dataNama = `<input type="text" class="form-control" id="dataNamaDivision" value="${name}">`;

    let dataEdit = "";
    dataEdit = `<button type="button" class="btn btn-primary" onclick="saveDivision('${id}')"> Edit</button >`;

    $("#button-edit").html(dataEdit);
    $("#DetailNamaDivision").html(dataNama);
}

function saveDivision(id) {
    let dataName = $("#dataNamaDivision").val();

    $.ajax({
        url: `http://localhost:29539/api/Divisions/${id}`,
        method: 'PUT',
        datatype: 'json',
        data: {
            name: dataName,
        }, success: function (data) {
            alert("Edit data successfull" + data)
            location.reload();
        }
    })

}

function deleteDivision(id) {
    $.ajax({
        url: `http://localhost:29539/api/Divisions/${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: function (message) {
            alert("Delete Data Successfull" + message);
            location.reload();
        }
    })
}