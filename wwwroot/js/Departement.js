
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
    dom: "Bfrtip",
    buttons: {
        buttons: [
            { extend: 'colvis'},
            { extend: 'pdf', title: 'Data_Departement' },
            { extend: 'excel', title: 'Data_Departement'},
            { extend: 'copy', title: 'Data_Departement' }
          
        ],
    }
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
    const formData = {
        name: $("#InputNameDepartement").val(),
        divisionId: $("#InputDivisionIdDepartement").val(),
    };

    $.ajax({
        url: 'http://localhost:29539/api/Departement',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(formData),
        cache: false,
        success: function (data) {
            Swal.fire({ title: "Done!", text: `${data.message}`, icon: "success", confirmButtonText:"Ok" }).then((result) => {
                if (result.isConfirmed) {
                    $('#createModal').modal('hide')
                    location.reload();
                }
            })
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
    dataNama = `<input type="text" class="form-control" id="dataNama" value="${name}"> <div class="invalid-feedback">Please input name departement</div>`;

    let dataDivisionId = "";
    dataDivisionId = `<select class="form-control" id="DivisionIdDepartement"></select>  <div class="invalid-feedback">Please select a valid division</div>`;

    let dataEdit = "";
    dataEdit = `<button type="button" class="btn btn-primary" onclick="saveEdit('${id}')">Save Change</button >`;

    $("#button-edit").html(dataEdit);
    $("#DetailNamaDepartement").html(dataNama);
    $("#DetailDivisionIDDepartement").html(dataDivisionId);
}

function saveEdit(id) {

    const formData = {
        name: $("#dataNama").val(),
        divisionId: $("#DivisionIdDepartement").val(),
    };

    $.ajax({
        url: `http://localhost:29539/api/Departement/${id}`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(formData),
        success: function (data) {
            Swal.fire({ title: "Done!", text: `${data.message}`, icon: "success", confirmButtonText: "Ok" }).then((result) => {
                if (result.isConfirmed) {
                    $('#detailModal').modal('hide')
                    location.reload();
                }
            })
        }
    })
}

function deleteDepartement(id) {
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
                url: `http://localhost:29539/api/Departement/${id}`,
                type: 'DELETE',
                dataType: 'json',
                success: function () {
                    Swal.fire("Done!", "It was succesfully deleted!", "success").then(function () {
                        location.reload();
                    })
                },
                error: function () {
                    Swal.fire("Error deleting!", "Please try again", "error");
                }
            });
        }
    });
}



$(document).ready(function () {


    $.ajax({
        url: 'http://localhost:29539/api/Departement'
    }).done((res) => {

        const dataDepartement = res.data.map((data) => data.id);

        const dataNameDepartement = res.data.map((data) => data.name);

        console.log(dataDepartement);

        $.ajax({
            url: 'http://localhost:29539/api/Employee'
        }).done((res) => {

            const dataDepOne = res.data.filter((data) => data.departementId == dataDepartement[0]);

            const dataDepTwo = res.data.filter((data) => data.departementId == dataDepartement[1]);

            const dataDepThree = res.data.filter((data) => data.departementId == dataDepartement[2]);

            const dataDepFour = res.data.filter((data) => data.departementId == dataDepartement[3]);

            const arrayData = [dataDepOne.length, dataDepTwo.length, dataDepThree.length, dataDepFour.length]

            console.log(res.data);
            console.log(arrayData);

            var options = {
                series: [{
                    name: 'Free Cash Flow',
                    data: arrayData
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: dataNameDepartement,
                },
                yaxis: {
                    title: {
                        text: '$ (thousands)'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart-departement"), options);
            chart.render();



        
        })


       
    })


})

