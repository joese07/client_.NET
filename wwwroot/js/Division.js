$("#data-divisions").DataTable({
    ajax: {
        url: "http://localhost:29539/api/Divisions",
        dataSrc: "data",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("key"),
        },
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
    dom: "Bfrtip",
    buttons: {
        buttons: [
            { extend: 'colvis'},
            { extend: 'pdf', title: 'Data_Division' },
            { extend: 'excel', title: 'Data_Division'  },
            { extend: 'copy', title: 'Data_Division'  },
           
        ],
    }
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
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("key"),
        },
        success: function (data) {
            Swal.fire({ title: "Done!", text: `${data.message}`, icon: "success", confirmButtonText: "Ok" }).then((result) => {
                if (result.isConfirmed) {
                    $('#createModal').modal('hide')
                    location.reload();
                }
            })
        }
    })

};

function detailDivision(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:29539/api/Divisions/${id}`,
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("key"),
        },
    }).done((res) => {
        let dataId = "";
        dataId = `<input type="text" class="form-control" value="${res.id}" readonly>`;

        let dataNama = "";
        dataNama = `<input type="text" class="form-control" value="${res.name}" readonly>`;

        let dataEdit = "";
        dataEdit = `<button type="button" class="btn btn-primary" onclick="editDivision('${res.name}','${res.id}')"> Edit</button >`;

        let dataDelete = "";
        dataDelete = `<button type="button" class="btn btn-danger" onclick="deleteDivision('${res.id}')">Delete</button>`;

        $("#button-edit").html(dataEdit);
        $("#button-delete").html(dataDelete);
        $("#DetailIdDivision").html(dataId);
        $("#DetailNamaDivision").html(dataNama);
        console.log(dataDelete);
    })
};

function editDivision(name, id) {
    let dataNama = "";
    dataNama = `<input type="text" class="form-control" id="dataNamaDivision" value="${name}">   <div class="invalid-feedback">Please input name division</div>`;

    let dataEdit = "";
    dataEdit = `<button type="button" class="btn btn-primary" onclick="saveDivision('${id}')">Save Change</button >`;

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
        },
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("key"),
        },success: function (data) {
            Swal.fire({ title: "Done!", text: `${data.message}`, icon: "success", confirmButtonText: "Ok" }).then((result) => {
                if (result.isConfirmed) {
                    $('#detailModal').modal('hide');
                    location.reload();
                }
            })
        }
    })

}


function deleteDivision(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:29539/api/Divisions/${id}`,
                type: 'DELETE',
                dataType: 'json',
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("key"),
                },
                success: function () {
                    Swal.fire("Done!", "It was succesfully deleted!", "success").then(function () {
                        location.reload();
                    })
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Swal.fire("Error deleting!", "Please try again", "error");
                }
            });
        }
    });
}


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:29539/api/Departement',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("key"),
        }
    }).done((res) => {
 
        let divisionCount = []

        res.data.forEach(departement => {
            let found = divisionCount.find(e => {
                return e.divisionId == departement.divisionId
            })

            if (found) {
                found.count += 1
            } else {
                divisionCount.push({ divisionId: departement.divisionId, count:1 })
            }
        })

        let result = divisionCount.map((e) => {
            let newForm = { division: null, count: e.count }

            $.ajax({
                url: `http://localhost:29539/api/Divisions/${e.divisionId}`,
                method: 'GET',
                async: false,
                dataType: 'json',
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("key"),
                },
            }).done((res) => {
                newForm.division = res.name
            })
            return newForm
        })

        let labels = result.map(e => e.division);
        let series = result.map(e => e.count);
      

            var options = {
                plotOptions: {
                    pie: {
                        donut: {
                            size: '60%',
                        }
                    }
                },
                chart: {
                    type: 'donut'
                },
                series: series,
                labels: labels

            }
            var chart = new ApexCharts(document.querySelector("#chart"), options);

            chart.render();
    })
})
