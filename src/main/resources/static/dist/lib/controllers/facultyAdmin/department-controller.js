var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('departmentBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    getAllDepartments();


    // Add new
    $('#addNewDepartment').submit(function (event) {
        var userName=$('#txtUserName').html();
        getFacultyAdmin(userName);
        let departmentID=$('#txtDepartmentID').val();
        let departmentName=$('#txtDepartmentName').val();

        let dataObj=JSON.stringify({
            "departmentID":departmentID,
            "name":departmentName,
            "facultyID":facultyID,
            "facultyName":facultyName
        });
        $.ajax({
            type: "POST",
            url: baseURL + "department/save",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "Department has been saved succeessfully!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtDepartmentName').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllDepartments();
                }else{
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error:function (error){
                console.log(error);
            }
        })
        event.preventDefault();
    });



    $('#updateDepartment').submit(function (event) {
        var userName=$('#txtUserName').html();
        getFacultyAdmin(userName);
        let departmentID=$('#txtEditDepartmentID').val();
        let departmentName=$('#txtEditDepartmentName').val();

        let dataObj=JSON.stringify({
            "departmentID":departmentID,
            "name":departmentName,
            "facultyID":facultyID,
            "facultyName":facultyName
        });
        $.ajax({
            type: "PUT",
            url: baseURL + "department/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (response) {
                if(response){
                    swal("Good job!", "Your changes have been saved succeessfully!", "success");
                    $('#updateModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtEditDepartmentName').val("");
                    });
                    $("#updateModal").modal('hide');
                    getAllDepartments();
                }else{
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error:function (error){
                console.log(error);
            }
        })
        event.preventDefault();
    });


});

//
// function getFacultyAdmin(userName) {
//     $.ajax({
//         type: "GET",
//         url: baseURL + "facultyAdmin/getByUserName/"+userName,
//         dataType: 'json',
//         async:false,
//         contentType: 'application/json; charset=utf-8',
//         success: function (response) {
//             $('#txtUserName').html(response['fName']+" "+response['lName']);
//             facultyID=response['facultyID'];
//             $.ajax({
//                 type: "GET",
//                 url: baseURL + "university/getUniversityByFacultyID/"+response['facultyID'],
//                 dataType: 'json',
//                 contentType: 'application/json; charset=utf-8',
//                 success: function (response) {
//                     $('#uniImage').attr("src",response['imagePath']);
//                     $('#uniName').html(response['uniName']);
//                     uniCode=response['uniCode'];
//                     uniName= response['uniName'];
//                 }
//             })
//         }
//     });
// }

function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        $.ajax({
            type:"GET",
            url:baseURL+"department/getNewID",
            success:function (response){
                modal.find('#txtDepartmentID').val(response);
            },
            error:function (error){
                console.log(error);
            }
        })
    })
    addNewModal.show();
}

function openUpdateModal(departmentID) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let txtDepartmentID=modal.find('#txtEditDepartmentID');
        let txtDepartmentName=modal.find('#txtEditDepartmentName');

        $.ajax({
            type:"GET",
            url:baseURL+"department/getDepartment/"+departmentID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                txtDepartmentID.val(response['departmentID']);
                txtDepartmentName.val(response['name']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}


function deleteDepartment(departmentID){
    swal({
        title: "Are you sure?",
        text: "Department will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type:"DELETE",
                    url:baseURL+"department/delete/"+departmentID,
                    dataType:'json',
                    success:function (response){
                        if(response){
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllDepartments();
                        }else{
                            swal("Poof! Your imaginary file has not been deleted!", {
                                icon: "error",
                            });
                        }
                    },
                    error:function (error){
                        console.log(error);
                    }
                });
            } else {
                swal("Your Department data is safe!");
            }
        });
}


function getAllDepartments(){
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    let departmentTable=$('#departmentTable');
    departmentTable.empty();
    $.ajax({
        type:"GET",
        url:baseURL+"department/getAllByFacultyID/"+facultyID,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            for(i in response){
                let department=response[i];
                let depID=department['departmentID'];
                let depName=department['name']

                let row="<tr>\n" +
                    "<td class=\"p-3\">"+depID+"</td>\n" +
                    "<td class=\"p-3\">"+depName+"</td>\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\""+depID+"\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\""+depID+"\" onclick=\"deleteDepartment(this.id)\" name=\"btnDelete\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                departmentTable.append(row);
            }
        }
    })
}


// Validation
let departmentName=document.getElementById('txtDepartmentName');
departmentName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(departmentName.value)) {
        departmentName.setCustomValidity('Invalid Department Name');
    }else {
        departmentName.setCustomValidity('');
    }
});

let editDepartmentName=document.getElementById('txtEditDepartmentName');
editDepartmentName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(editDepartmentName.value)) {
        editDepartmentName.setCustomValidity('Invalid Department Name');
    }else {
        editDepartmentName.setCustomValidity('');
    }
});
