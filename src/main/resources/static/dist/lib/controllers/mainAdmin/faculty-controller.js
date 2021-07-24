$(document).ready(function () {
    document.getElementById('facultyBtn').style.color = "#ffffff";
    getAllFaculties();

    // Table Search
    $("#search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#facultyTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        if (value == "") {
            $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearch').css("background-color", "#3B9B76");
        } else {
            $('#btnSearch').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearch').css("background-color", "#54948F")
        }
    });

    $('#btnSearch').click(function () {
        $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearch').css("background-color", "#3B9B76");
        $('#search').val(null);
        getAllFaculties();
    })


    // Add new
    $('#addNewFaculty').submit(function (event) {
        event.preventDefault();
        let facultyID = $('#txtFacultyID').val();
        let facultyName = $('#txtFacultyName').val();
        let uniCode = $('#selectUniCode').val();
        let uniName = $('#txtUniName').val();

        let dataObj = JSON.stringify({
            "facultyID": facultyID,
            "facultyName": facultyName,
            "uniCode": uniCode,
            "uniName": uniName
        });
        $.ajax({
            type: "POST",
            url: baseURL + "faculty/save",
            data: dataObj,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (responce) {
                if (responce) {
                    swal("Good job!", "Faculty has been saved succeessfully!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal = $(this);
                        modal.find('#txtFacultyName').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllFaculties();
                } else {
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });


    $('#updateFaculty').submit(function (event) {
        event.preventDefault();
        let facultyID = $('#txtEditFacultyID').val();
        let facultyName = $('#txtEditFacultyName').val();
        let uniCode = $('#txtEditUniCode').val();
        let uniName = $('#txtEditUniName').val();

        let dataObj = JSON.stringify({
            "facultyID": facultyID,
            "facultyName": facultyName,
            "uniCode": uniCode,
            "uniName": uniName
        });
        $.ajax({
            type: "PUT",
            url: baseURL + "faculty/update",
            data: dataObj,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (responce) {
                if (responce) {
                    swal("Good job!", "Your changes have been saved succeessfully!", "success");
                    $('#updateModal').on('hidden.bs.modal', function (e) {
                        let modal = $(this);
                        modal.find('#txtEditFacultyName').val("");
                    });
                    $("#updateModal").modal('hide');
                    getAllFaculties();
                } else {
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
});


function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        let select = modal.find('#selectUniCode');
        let txtUniName = modal.find('#txtUniName');

        $.ajax({
            type: "GET",
            url: baseURL + "university/getAll",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var sel = document.getElementById('selectUniCode');
                for (i = sel.length - 1; i >= 0; i--) {
                    sel.remove(i);
                }
                for (i in response) {
                    let university = response[i];
                    let uniCode = university['uniCode'];
                    let uniName = university['uniName'];
                    let option = "<option>" + uniCode + "</option>";

                    select.append(option);
                    if (i == 0) {
                        txtUniName.val(uniName)
                    }
                }
            }, error(error) {
                console.log(error);
            }
        })

        $.ajax({
            type: "GET",
            url: baseURL + "faculty/getNewID",
            success: function (response) {
                modal.find('#txtFacultyID').val(response);
            },
            error: function (error) {
                console.log(error);
            }
        })
    })
    addNewModal.show();
}

function openUpdateModal(facultyID) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        let txtUniCode = modal.find('#txtEditUniCode');
        let txtUniName = modal.find('#txtEditUniName');
        let txtFacultyID = modal.find('#txtEditFacultyID');
        let txtFacultyName = modal.find('#txtEditFacultyName');

        $.ajax({
            type: "GET",
            url: baseURL + "faculty/getFaculty/" + facultyID,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                txtUniCode.val(response['uniCode']);
                txtUniName.val(response['uniName']);
                txtFacultyID.val(response['facultyID']);
                txtFacultyName.val([response['facultyName']]);
            }, error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}

$('#selectUniCode').change(function () {
    let uniCode = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "university/getUniversity/" + uniCode,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtUniName').val(response['uniName']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});


function deleteFaculty(facultyID) {
    swal({
        title: "Are you sure?",
        text: "Faculty will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "faculty/delete/" + facultyID,
                    dataType: 'json',
                    success: function (response) {
                        if (response) {
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllFaculties();
                        } else {
                            swal("Poof! Your imaginary file has not been deleted!", {
                                icon: "error",
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            } else {
                swal("Your Faculty data is safe!");
            }
        });
}

function getAllFaculties() {
    let tableFaculty = $('#facultyTable');
    tableFaculty.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "faculty/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let faculty = response[i];
                let facultyID = faculty['facultyID'];
                let facultyName = faculty['facultyName']
                let uniName = faculty['uniName'];

                let row = "<tr>\n" +
                    "<td class=\"p-3\">" + facultyID + "</td>\n" +
                    "<td class=\"p-3\">" + facultyName + "</td>\n" +
                    "<td class=\"p-3\">" + uniName + "</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\"" + facultyID + "\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\"" + facultyID + "\" onclick=\"deleteFaculty(this.id)\" name=\"btnDelete\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                tableFaculty.append(row);
            }
        }
    })
}

// Validation
let facultyName = document.getElementById('txtFacultyName');

facultyName.addEventListener('input', function () {
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (!regex.test(facultyName.value)) {
        facultyName.setCustomValidity('Invalid faculty Name');
    } else {
        facultyName.setCustomValidity('');
    }
});

let editFacultyName = document.getElementById('txtEditFacultyName');

editFacultyName.addEventListener('input', function () {
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(editFacultyName.value)) {
        editFacultyName.setCustomValidity('Invalid faculty Name');
    } else {
        editFacultyName.setCustomValidity('');
    }
});
