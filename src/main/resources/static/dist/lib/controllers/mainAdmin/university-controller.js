$(document).ready(function () {
   getAllUni();
});
document.getElementById('universityBtn').style.color = "#ffffff";



// Table Search
$("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#uniTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

    $('#btnSearch').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
    $('#btnSearch').css("background-color", "#54948F")
});

$('#btnSearch').click(function () {
    $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
    $('#btnSearch').css("background-color", "#3B9B76");
    $('#search').val(null);
    getAllUni();
})


$('#addNewUniversity').submit(function (event) {
    const formData = new FormData(this);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: baseURL + "university/save",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response) {
                swal("Saved!", "You clicked the button!", "success");
                $('#addNewModal').on('hidden.bs.modal', function (e) {
                    let modal = $(this);
                    modal.find('#txtUniCode').val("");
                    modal.find('#txtUniversityName').val("");
                    modal.find('#imgUni').val("");
                });
                $("#addNewModal").modal('hide');
                getAllUni();
            } else {
                swal("OOps!", "You clicked the button!", "error");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
    event.preventDefault();
});

$('#updateUniversity').submit(function (event) {
    var formData = new FormData();
    formData.append('uniCode', $('#txtEditUniCode').val());
    formData.append('uniName', $('#txtEditUniversityName').val());
    if ($('input#imageInput')[0].files[0] == undefined) {
        $.ajax({
            type: "PUT",
            url: baseURL + "university/update",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response) {
                    $("#updateUniversityModal").modal('hide');
                    swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success"
                    }).then(function () {
                        location.reload();
                    });
                } else {
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
        event.preventDefault();
    } else {
        formData.append('uniImage', $('#imageInput')[0].files[0]);
        $.ajax({
            type: "PUT",
            enctype: 'multipart/form-data',
            url: baseURL + "university/updateWithImage",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response) {
                    $("#updateUniversityModal").modal('hide');
                    swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success"
                    }).then(function () {
                        location.reload();
                    });
                } else {
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
        event.preventDefault();
    }
})
;

function openUpdateModal(uniCode) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        $.ajax({
            type: "GET",
            url: baseURL + "university/getUniversity/" + uniCode,
            dataType: 'json',
            success: function (response) {
                modal.find('#txtEditUniCode').val(response['uniCode']);
                modal.find('#txtEditUniversityName').val(response['uniName']);
            },
            error: function (error) {
                console.log(error);
            }
        })

    });
    updateModal.show();
}

function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        $.ajax({
            type: "GET",
            url: baseURL + "university/getNewID",
            success: function (response) {
                modal.find('#txtUniCode').val(response);
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
    addNewModal.show();
}

function deleteUni(uniCode) {
    swal({
        title: "Are you sure?",
        text: "University will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "university/delete/" + uniCode,
                    dataType: 'json',
                    success: function (response) {
                        if (response) {
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllUni();
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
                swal("Your university data is safe!");
            }
        });
}

function getAllUni() {
    let tableUni = $('#uniTable');
    tableUni.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "university/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let university = response[i];
                let uniCode = university['uniCode'];
                let uniName = university['uniName'];
                let uniImagePath = university['imagePath'];
                let uniImageName = university['imageName'];

                let row = "<tr>\n" +
                    "<td class=\"p-3\">" + uniCode + "</td>\n" +
                    "<td class=\"p-3\">" + uniName + "</td>\n" +
                    "<td><button id=\"" + uniImagePath + "\" class=\"btn btn-link\" onclick=\"openImageModal(this.id)\">" + uniImageName + "</button></td>\n" +
                    "<td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\"" + uniCode + "\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\"" + uniCode + "\" onclick=\"deleteUni(this.id)\" name=\"btnDelete\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                tableUni.append(row);
            }
        }
    })

}

function openImageModal(imagePath) {
    let imageModal = new bootstrap.Modal(document.getElementById('viewImageModal'));
    $('#viewImageModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        modal.find('#imgUniModal').attr("src", imagePath);
    })
    imageModal.show();
}

// $('#btnUpdate').click(function (){
//     let uniCode=$('#txtEditUniCode').val();
//     let uniName=$('#txtEditUniversityName').val();
//     let dataObject=JSON.stringify({
//         "uniCode":uniCode,
//         "uniName":uniName
//     });
//     $.ajax({
//         type:"PUT",
//         url:MainAdminURL+"university/update",
//         data:dataObject,
//         dataType:'json',
//         contentType:'application/json; charset=utf-8',
//         success:function (responce){
//             if(responce){
//                 swal("Good job!", "You clicked the button!", "success");
//
//                 $("#updateUniversityModal").modal('hide');
//                 getAllUni();
//             }else{
//                 swal("OOps!", "You clicked the button!", "error");
//             }
//         },
//         error:function (error){
//             console.log(error);
//         }
//     });
// });



