$(document).ready(function () {
    document.getElementById('facultyAdminBtn').style.color = "#ffffff";
    getAllFacultyAdmins();

    // Table Search
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#facultyAdminTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearch').css("background-color","#3B9B76");
        }else{
            $('#btnSearch').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearch').css("background-color","#54948F");
        }

    });

    $('#btnSearch').click(function (){
        $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearch').css("background-color","#3B9B76");
        $('#search').val(null);
        getAllFacultyAdmins()
    })

    // Add New
    $('#addNewFacultyAdmin').submit(function (event) {
            let facultyID = $('#selectFacultyID').val();
            let facultyName = $('#txtFacultyName').val();
            let adminID = $('#txtFacultyAdminID').val();
            let fName = $('#txtFirstName').val();
            let lName = $('#txtLastName').val();
            let address = $('#txtAddress').val();
            let telephone = $('#txtTelephone').val();
            let email = $('#txtEmail').val();
            let userName = $('#txtUserName').val();
            let password = $('#txtPassword').val();
            let confirmPassword = $('#txtConfirmPassword').val();

            if (password == confirmPassword) {
                let dataObj = JSON.stringify({
                    "facultyAdminID": adminID,
                    "fName": fName,
                    "lName": lName,
                    "address": address,
                    "telephone": telephone,
                    "email": email,
                    "userName": userName,
                    "password": password,
                    "facultyID": facultyID,
                    "facultyName": facultyName,
                });
                $.ajax({
                    type: "POST",
                    url: baseURL + "facultyAdmin/save",
                    data: dataObj,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (responce) {
                        if (responce) {
                            swal("Good job!", "You clicked the button!", "success");
                            $('#addNewModal').on('hidden.bs.modal', function (e) {
                                let modal = $(this);
                                modal.find('#txtFirstName').val("");
                                modal.find('#txtLastName').val("");
                                modal.find('#txtAddress').val("");
                                modal.find('#txtTelephone').val("");
                                modal.find('#txtEmail').val("");
                                modal.find('#txtUserName').val("");
                            });
                            $("#addNewModal").modal('hide');
                            getAllFacultyAdmins();
                        } else {
                            swal("OOps!", "You clicked the button!", "error");
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                })
            } else {
                swal("OOps!", "Input Passwords Correctly!", "error");
            }
        event.preventDefault();
    });

    $('#updateFacultyAdmin').submit(function (event){
        event.preventDefault();
        let facultyID=$('#txtEditFacultyID').val();
        let facultyName=$('#txtEditFacultyName').val();
        let adminID=$('#txtEditFacultyAdminID').val();
        let fName=$('#txtEditFirstName').val();
        let lName=$('#txtEditLastName').val();
        let address=$('#txtEditAddress').val();
        let telephone=$('#txtEditTelephone').val();
        let email=$('#txtEditEmail').val();
        let userName=$('#txtEditUserName').val();
        let password=$('#txtEditPassword').val();
        let confirmPassword=$('#txtEditConfirmPassword').val();

        if(password==confirmPassword){
            let dataObj=JSON.stringify({
                "facultyAdminID":adminID,
                "fName":fName,
                "lName":lName,
                "address":address,
                "telephone":telephone,
                "email":email,
                "userName":userName,
                "password":password,
                "facultyID":facultyID,
                "facultyName":facultyName,
            });
            $.ajax({
                type: "PUT",
                url: baseURL + "facultyAdmin/update",
                data: dataObj,
                dataType: 'json',
                contentType:'application/json; charset=utf-8',
                success: function (responce) {
                    if(responce){
                        swal("Good job!", "You clicked the button!", "success");
                        $('#updateModal').on('hidden.bs.modal', function (e) {
                            let modal=$(this);
                            modal.find('#txtEditFirstName').val("");
                            modal.find('#txtEditLastName').val("");
                            modal.find('#txtEditAddress').val("");
                            modal.find('#txtEditTelephone').val("");
                            modal.find('#txtEditEmail').val("");
                            modal.find('#txtEditUserName').val("");
                        });
                        $("#updateModal").modal('hide');
                        getAllFacultyAdmins();
                    }else{
                        swal("OOps!", "You clicked the button!", "error");
                    }
                },
                error:function (error){
                    console.log(error);
                }
            })
        }else{
            swal("OOps!", "Input Passwords Correctly!", "error");
        }
    });


});


function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let selectUniCode=modal.find('#selectUniCode');
        let txtUniName=modal.find('#txtUniName');
        let selectFacultyID=modal.find('#selectFacultyID');
        let txtFacultyName=modal.find('#txtFacultyName');

        $.ajax({
            type:"GET",
            url:baseURL+"university/getAll",
            dataType:'json',
            async:false,
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectUniCode');
                for (i = sel.length ; i >= 1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let university = response[i];
                    let uniCode = university['uniCode'];
                    let uniName = university['uniName'];
                    let option = "<option>" + uniCode + "</option>";
                    selectUniCode.append(option);
                    if(i==0){txtUniName.val(uniName)}
                }
            },error(error) {
                console.log(error);
            }
        });

        let uniCode=selectUniCode.val();
        if(uniCode!=null) {
            $.ajax({
                type: "GET",
                url: baseURL + "faculty/getAllByUniCode/" + selectUniCode.val(),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    var sel = document.getElementById('selectFacultyID');
                    for (i = sel.length; i >= 1; i--) {
                        sel.remove(i - 1);
                    }
                    for (i in response) {
                        let faculty = response[i];
                        let facultyID = faculty['facultyID'];
                        let facultyName = faculty['facultyName'];
                        let option = "<option>" + facultyID + "</option>";

                        selectFacultyID.append(option);
                        if (i == 0) {
                            txtFacultyName.val(facultyName)
                        }
                    }
                }, error(error) {
                    console.log(error);
                }
            })
        }

        $.ajax({
            type:"GET",
            url:baseURL+"facultyAdmin/getNewID",
            success:function (response){
                modal.find('#txtFacultyAdminID').val(response);
                modal.find('#txtEmail').val(response+"@admin.heisis.lk");
                modal.find('#txtUserName').val(response+"@admin.heisis.lk");
            },
            error:function (error){
                console.log(error);
            }
        })
    })
    addNewModal.show();
}

function openUpdateModal(facultyAdmin) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let txtFacultyID = modal.find('#txtEditFacultyID');
        let txtFacultyName = modal.find('#txtEditFacultyName');
        let txtAdminID = modal.find('#txtEditFacultyAdminID');
        let txtFirstName = modal.find('#txtEditFirstName');
        let txtLastName = modal.find('#txtEditLastName');
        let txtAddress = modal.find('#txtEditAddress');
        let txtTelephone = modal.find('#txtEditTelephone');
        let txtEmail = modal.find('#txtEditEmail');
        let txtUserName = modal.find('#txtEditUserName');
        let txtPassword = modal.find('#txtEditPassword');
        let txtConfirmPassword = modal.find('#txtEditConfirmPassword');

        $.ajax({
            type:"GET",
            url:baseURL+"facultyAdmin/getFacultyAdmin/"+facultyAdmin,
            dataType:'json',
            success:function (response){
                txtFacultyID.val(response['facultyID']);
                txtFacultyName.val(response['facultyName']);
                txtAdminID.val(response['facultyAdminID']);
                txtFirstName.val(response['fName']);
                txtLastName.val(response['lName']);
                txtAddress.val(response['address']);
                txtTelephone.val(response['telephone']);
                txtEmail.val(response['email']);
                txtUserName.val(response['userName']);
                txtPassword.val("");
                txtPassword.select();
                txtConfirmPassword.val("");
                txtConfirmPassword.select();
            },
            error:function (error){
                console.log(error);
            }
        })
    });
    updateModal.show();
}


// When change the value of uniCode selector
$('#selectUniCode').change(function() {
    let uniCode=$(this).val();
    $.ajax({
        type:"GET",
        url:baseURL+"university/getUniversity/"+uniCode,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            $('#txtUniName').val(response['uniName']);
        },
        error:function (error){
            console.log(error);
        }
    });

    if(uniCode!=null) {
        $.ajax({
            type: "GET",
            url: baseURL + "faculty/getAllByUniCode/" + uniCode,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var sel = document.getElementById('selectFacultyID');
                for (i = sel.length; i >= 1; i--) {
                    sel.remove(i - 1);
                }
                for (i in response) {
                    let faculty = response[i];
                    let facultyID = faculty['facultyID'];
                    let facultyName = faculty['facultyName'];
                    let option = "<option>" + facultyID + "</option>";
                    $('#selectFacultyID').append(option);
                    if (i == 0) {
                        $('#txtFacultyName').val(facultyName)
                    }
                }
            }, error(error) {
                console.log(error);
            }
        })
    }
});

// When change the value of uniCode selector
$('#selectFacultyID').change(function() {
    let facultyID=$(this).val();
    $.ajax({
        type:"GET",
        url:baseURL+"faculty/getFaculty/"+facultyID,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            $('#txtFacultyName').val(response['facultyName']);
        },
        error:function (error){
            console.log(error);
        }
    });
});

function deleteFacultyAdmin(facultyAdminID){
    swal({
        title: "Are you sure?",
        text: "Faculty Admin will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type:"DELETE",
                    url:baseURL+"facultyAdmin/delete/"+facultyAdminID,
                    dataType:'json',
                    success:function (response){
                        if(response){
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllFacultyAdmins();
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
                swal("Your Faculty Admin data is safe!");
            }
        });
}
function getAllFacultyAdmins(){
    let facultyAdminTable=$('#facultyAdminTable');
    facultyAdminTable.empty();
    $.ajax({
        type:"GET",
        url:baseURL+"facultyAdmin/getAll",
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            for(i in response){
                let facultyAdmin=response[i];
                let facultyID=facultyAdmin['facultyID'];
                let facultyName=facultyAdmin['facultyName']
                let facultyAdminID=facultyAdmin['facultyAdminID'];
                let adminName=facultyAdmin['fName']+" "+facultyAdmin['lName'];
                let telephone=facultyAdmin['telephone'];
                let email=facultyAdmin['email'];
                let userName=facultyAdmin['userName'];

                let row="<tr>\n" +
                    "<td class=\"p-3\">"+facultyID+"</td>\n" +
                    "<td class=\"p-3\">"+facultyName+"</td>\n" +
                    "<td class=\"p-3\">"+adminName+"</td>\n" +
                    "<td class=\"p-3\">"+telephone+"</td>\n" +
                    "<td class=\"p-3\">"+email+"</td>\n" +
                    "<td class=\"p-3\">"+userName+"</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn bg-light text-dark border-info rounded px-4 me-3\" id=\""+facultyAdminID+"\" onclick=\"openViewMoreModal(this.id)\"><i class=\"fas fa-clipboard-list\"></i> View More</button>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\""+facultyAdminID+"\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\""+facultyAdminID+"\" onclick=\"deleteFacultyAdmin(this.id)\" name=\"btnDelete\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                facultyAdminTable.append(row);
            }
        }
    })
}


//validation

let email=document.getElementById('txtEmail');
let telephone=document.getElementById('txtTelephone');
let firstName=document.getElementById('txtFirstName');
let lastName=document.getElementById('txtLastName');
let password=document.getElementById('txtPassword');

email.addEventListener('input', function(){
    let regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!regexEmail.test(email.value)) {
        email.setCustomValidity('Invalid Email Address');
    }else {
        email.setCustomValidity('');
    }
});

telephone.addEventListener('input', function(){
    let regexTelephone = /^[0-9]{10}$/;
    if (!regexTelephone.test(telephone.value)) {
        telephone.setCustomValidity('Invalid Telephone Number');
    }else {
        telephone.setCustomValidity('');
    }
});

firstName.addEventListener('input', function(){
    let regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(firstName.value)) {
        firstName.setCustomValidity('Invalid Name');
    }else {
        firstName.setCustomValidity('');
    }
});

lastName.addEventListener('input', function(){
    let regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(firstName.value)) {
        firstName.setCustomValidity('Invalid Name');
    }else {
        firstName.setCustomValidity('');
    }
});


password.addEventListener('input', function(){
    let regex = /^[A-Za-z]\w{7,14}$/;
    if (!regex.test(password.value)) {
        password.setCustomValidity('Invalid password');
    }else {
        password.setCustomValidity('');
    }
});

// let degreeId=document.getElementById('txtDegreeId');
//
// degreeId.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,5}$/;
//     if (!regex.test(degreeId.value)) {
//         degreeId.setCustomValidity('Invalid Degree Id');
//     }else {
//         degreeId.setCustomValidity('');
//     }
// });


// let degreeName=document.getElementById('txtDegreeName');
//
// degreeName.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,30}$/;
//     if (!regex.test(degreeName.value)) {
//         degreeName.setCustomValidity('Invalid Degree Name');
//     }else {
//         degreeName.setCustomValidity('');
//     }
// });

// let facultyId=document.getElementById('txtFacultyId');
//
// facultyId.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,5}$/;
//     if (!regex.test(facultyId.value)) {
//         facultyId.setCustomValidity('Invalid faculty Id');
//     }else {
//         facultyId.setCustomValidity('');
//     }
// });
//
// let facultyName=document.getElementById('txtFacultyName');
//
// facultyName.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,30}$/;
//     if (!regex.test(facultyName.value)) {
//         facultyName.setCustomValidity('Invalid faculty Name');
//     }else {
//         facultyName.setCustomValidity('');
//     }
// });
//
// let universityName=document.getElementById('txtUniversityName');
//
// universityName.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,30}$/;
//     if (!regex.test(universityName.value)) {
//         universityName.setCustomValidity('Invalid university Name');
//     }else {
//         universityName.setCustomValidity('');
//     }
// });

// let universityCode=document.getElementById('txtUniversityCode');
//
// universityCode.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,5}$/;
//     if (!regex.test(universityCode.value)) {
//         universityCode.setCustomValidity('Invalid university Code');
//     }else {
//         universityCode.setCustomValidity('');
//     }
// });


// let courseId=document.getElementById('txtCourseId');
//
// courseId.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,5}$/;
//     if (!regex.test(courseId.value)) {
//         courseId.setCustomValidity('Invalid Course Id');
//     }else {
//         courseId.setCustomValidity('');
//     }
// });

// let courseName=document.getElementById('txtCourseName');
//
// courseName.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,30}$/;
//     if (!regex.test(courseName.value)) {
//         courseName.setCustomValidity('Invalid Course Name');
//     }else {
//         courseName.setCustomValidity('');
//     }
// });


// let examId=document.getElementById('txtExamId');
//
// examId.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,5}$/;
//     if (!regex.test(examId.value)) {
//         examId.setCustomValidity('Invalid Exam Id');
//     }else {
//         examId.setCustomValidity('');
//     }
// });

// let studentName=document.getElementById('txtStudentName');
//
// studentName.addEventListener('input', function(){
//     let regex = /^[a-zA-Z ]{2,30}$/;
//     if (!regex.test(studentName.value)) {
//         studentName.setCustomValidity('Invalid Student Name');
//     }else {
//         studentName.setCustomValidity('');
//     }
// });



