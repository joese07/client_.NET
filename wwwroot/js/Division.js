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
        success: function (data) {
            alert("Add Data SuccessFull");
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
        }, success: function (data) {
            alert("Edit data successfull")
            location.reload();
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
    }).done((res) => {

        //Data Series
        const divPemasaran = res.data.filter((data) => data.divisionId == 5002);

        const divPersonalia = res.data.filter((data) => data.divisionId == 5003);

        const divPembelanjaan = res.data.filter((data) => data.divisionId == 5004);

        const divUmum = res.data.filter((data) => data.divisionId == 5005);

        const divHrd = res.data.filter((data) => data.divisionId == 5006);


        const divIt = res.data.filter((data) => data.divisionId == 5007);

        console.log(parseInt(divIt.length), divPemasaran.length, divHrd.length, divUmum.length, divPembelanjaan.length, divPersonalia.length)

        $.ajax({
            url: 'http://localhost:29539/api/Divisions'
        }).done((res) => {

            const dataDivision = res.data.map((data) => data.name);
            console.log(dataDivision)


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
                series: [divPemasaran.length, divPersonalia.length, divPembelanjaan.length, divUmum.length, divHrd.length, divIt.length],
                labels: dataDivision

            }


            var chart = new ApexCharts(document.querySelector("#chart"), options);

            chart.render();
        })

    })


})
