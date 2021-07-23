var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {

    document.getElementById('studentBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    getAllStudents();
    getUniCount();

    // DatePicker
    $(".date").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
    });
    var d = new Date();
    let txtYear=$('#txtYear');
    txtYear.val(d.getFullYear());

    // Table Search year
    $("#txtYear").on("change", function() {
        var value = $(this).val().toLowerCase();
        $("#studentTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        if(value==""){
            getAllStudents();
        }
    });


    // Table search
    $("#txtSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#studentTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        if(value==""){
            $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearch').css("background-color", "#3B9B76");
        }else{
            $('#btnSearch').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearch').css("background-color", "#54948F")
        }
    });

    $('#btnSearch').click(function () {
        $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearch').css("background-color", "#3B9B76");
        $('#txtSearch').val(null);
        getAllStudents();
    })


    // Add New
    $('#addNewSudent').submit(function (event) {
        let regNo=$('#txtRegistrationNo').val();
        let index=$('#txtIndexNo').val();
        let fName=$('#txtFirstName').val();
        let mName=$('#txtMiddleName').val();
        let lName=$('#txtLastName').val();
        let address=$('#txtAddress').val();
        let email=$('#txtEmail').val();
        let telephone=$('#txtTelephone').val();
        let NIC=$('#txtNIC').val();
        let gender=$("input[name='radioGender']:checked").val();
        let level=$('#txtLevel').val();
        let parentName=$('#txtParentName').val();
        let parentTelephone=$('#txtParentTelephone').val();
        let degreeID=$('#selectDegreeID').val();
        let degreeName=$('#txtDegreeName').val();
        let password = $('#txtPassword').val();
        let confirmPassword = $('#txtConfirmPassword').val();

        if (password == confirmPassword) {
            let dataObj = JSON.stringify({
                "registrationNo":regNo,
                "indexNo":index,
                "fName":fName,
                "mName":mName,
                "lName":lName,
                "address":address,
                "email":email,
                "telephone":telephone,
                "NIC":NIC,
                "gender":gender,
                "level":level,
                "parentName":parentName,
                "parentTelNo":parentTelephone,
                "password":password,
                "degreeID":degreeID,
                "degreeName":degreeName,
                "unicode":uniCode
            });
            $.ajax({
                type: "POST",
                url: baseURL + "student/save",
                data: dataObj,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    if (response) {
                        swal("Good job!", "Student has been saved succeessfully!", "success");
                        $('#addNewModal').on('hidden.bs.modal', function (e) {
                            let modal = $(this);
                            modal.find('#txtFirstName').val("");
                            modal.find('#txtMiddleName').val("");
                            modal.find('#txtLastName').val("");
                            modal.find('#txtAddress').val("");
                            modal.find('#txtTelephone').val("");
                            modal.find('#txtNIC').val("");
                            modal.find('#txtEmail').val("");
                            modal.find('#txtParentName').val("");
                            modal.find('#txtParentTelephone').val("");
                            modal.find('#txtPassword').val("");
                            modal.find('#txtConfirmPassword').val("");
                        });
                        $("#addNewModal").modal('hide');
                        getAllStudents();
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


    // Update Student
    $('#updateStudent').submit(function (event) {
        let regNo=$('#txtEditRegistrationNo').val();
        let index=$('#txtEditIndexNo').val();
        let fName=$('#txtEditFirstName').val();
        let mName=$('#txtEditMiddleName').val();
        let lName=$('#txtEditLastName').val();
        let address=$('#txtEditAddress').val();
        let email=$('#txtEditEmail').val();
        let telephone=$('#txtEditTelephone').val();
        let NIC=$('#txtNIC').val();
        let gender=$("input[name='editRadioGender']:checked").val();
        let level=$('#txtEditLevel').val();
        let parentName=$('#txtEditParentName').val();
        let parentTelephone=$('#txtEditParentTelephone').val();
        let degreeID=$('#selectEditDegreeID').val();
        let degreeName=$('#txtEditDegreeName').val();
        let password = $('#txtEditPassword').val();
        let confirmPassword = $('#txtEditConfirmPassword').val();

        if (password == confirmPassword) {
            let dataObj = JSON.stringify({
                "registrationNo":regNo,
                "indexNo":index,
                "fName":fName,
                "mName":mName,
                "lName":lName,
                "address":address,
                "email":email,
                "telephone":telephone,
                "NIC":NIC,
                "gender":gender,
                "level":level,
                "parentName":parentName,
                "parentTelNo":parentTelephone,
                "password":password,
                "degreeID":degreeID,
                "degreeName":degreeName,
                "unicode":uniCode
            });
            $.ajax({
                type: "PUT",
                url: baseURL + "student/update",
                data: dataObj,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    if (response) {
                        swal("Good job!", "Your changes have been saved succeessfully!", "success");
                        $('#addNewModal').on('hidden.bs.modal', function (e) {
                            let modal = $(this);
                            modal.find('#txtEditFirstName').val("");
                            modal.find('#txtEditMiddleName').val("");
                            modal.find('#txtEditLastName').val("");
                            modal.find('#txtEditAddress').val("");
                            modal.find('#txtEditTelephone').val("");
                            modal.find('#txtEditNIC').val("");
                            modal.find('#txtEditEmail').val("");
                            modal.find('#txtEditParentName').val("");
                            modal.find('#txtEditParentTelephone').val("");
                            modal.find('#txtEditPassword').val("");
                            modal.find('#txtEditConfirmPassword').val("");
                        });
                        $("#updateModal").modal('hide');
                        getAllStudents();
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
    let year=$('#txtYear').val();
    if(year==""){
        swal("OOps!", "Select year before add student!", "error");
    }else{
        $('#addNewModal').on('show.bs.modal', function(event) {
            let modal = $(this);

            $.ajax({
                type:"GET",
                url:baseURL+"degree/getAll",
                dataType:'json',
                contentType: 'application/json; charset=utf-8',
                success:function (response) {
                    let sel = document.getElementById('selectDegreeID');
                    let select=$('#selectDegreeID');
                    for (i = sel.length - 1; i >= 0; i--) {
                        sel.remove(i);
                    }
                    for (i in response) {
                        let degree = response[i];
                        let degreeID = degree['degreeID'];
                        let degreeName = degree['degreeName'];
                        let option = "<option>" + degreeID + "</option>";

                        select.append(option);
                        if(i==0){$('#txtDegreeName').val(degreeName)}
                    }
                },error(error) {
                    console.log(error);
                }
            })

            $.ajax({
                type:"GET",
                url:baseURL+"student/getNewIndex/"+uniCode,
                success:function (response){
                    modal.find('#txtIndexNo').val(response);
                },
                error:function (error){
                    console.log(error);
                }
            })

            $.ajax({
                type:"GET",
                url:baseURL+"student/getNewRegistrationNo/"+year,
                success:function (response){
                    modal.find('#txtRegistrationNo').val(response);
                    modal.find('#txtEmail').val(response+"@stu.heisis.lk");
                },
                error:function (error){
                    console.log(error);
                }
            })

        })
        addNewModal.show();
    }

}

function openUpdateModal(registrationNo) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);

        $.ajax({
            type:"GET",
            url:baseURL+"degree/getAll",
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                let sel = document.getElementById('selectEditDegreeID');
                let select=$('#selectEditDegreeID');
                for (i = sel.length - 1; i >= 0; i--) {
                    sel.remove(i);
                }
                for (i in response) {
                    let degree = response[i];
                    let degreeID = degree['degreeID'];
                    let degreeName = degree['degreeName'];
                    let option = "<option>" + degreeID + "</option>";
                    select.append(option);
                }
            },error(error) {
                console.log(error);
            }
        })


        $.ajax({
            type:"GET",
            url:baseURL+"student/getStudent/"+registrationNo,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                modal.find('#txtEditRegistrationNo').val(response['registrationNo']);
                modal.find('#txtEditIndexNo').val(response['indexNo']);
                modal.find('#txtEditFirstName').val(response['fName']);
                modal.find('#txtEditMiddleName').val(response['mName']);
                modal.find('#txtEditLastName').val(response['lName']);
                modal.find('#txtEditAddress').val(response['address']);
                modal.find('#txtEditEmail').val(response['email']);
                modal.find('#txtEditTelephone').val(response['telephone']);
                modal.find('#txtEditNIC').val(response['nic']);
                $("input[name='editRadioGender']:checked").val(response['gender']);
                modal.find('#txtEditLevel').val(response['level']);
                modal.find('#txtEditParentName').val(response['parentName']);
                modal.find('#txtEditParentTelephone').val(response['parentTelNo']);
                modal.find('#selectEditDegreeID').val(response['degreeID']);
                modal.find('#txtEditDegreeName').val(response['degreeName']);
                modal.find('#txtEditPassword').val(response['password']);
                modal.find('#txtEditConfirmPassword').val(response['password']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}

function openViewModal(registrationNo) {
    let viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
    $('#viewModal').on('show.bs.modal', function(event) {
        let modal = $(this);

        $.ajax({
            type:"GET",
            url:baseURL+"student/getStudent/"+registrationNo,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                modal.find('#txtViewRegistrationNo').val(response['registrationNo']);
                modal.find('#txtViewIndexNo').val(response['indexNo']);
                modal.find('#txtViewFirstName').val(response['fName']);
                modal.find('#txtViewMiddleName').val(response['mName']);
                modal.find('#txtViewLastName').val(response['lName']);
                modal.find('#txtViewAddress').val(response['address']);
                modal.find('#txtViewEmail').val(response['email']);
                modal.find('#txtViewTelephone').val(response['telephone']);
                modal.find('#txtViewNIC').val(response['nic']);
                modal.find('#txtViewGender').val(response['gender']);
                modal.find('#txtViewLevel').val(response['level']);
                modal.find('#txtViewParentName').val(response['parentName']);
                modal.find('#txtViewParentTelephone').val(response['parentTelNo']);
                modal.find('#txtViewDegreeID').val(response['degreeID']);
                modal.find('#txtViewDegreeName').val(response['degreeName']);
            },error(error) {
                console.log(error);
            }
        })

    })
    viewModal.show();
}


$('#selectDegreeID').change(function() {
    let degreeID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "degree/getDegree/" + degreeID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtDegreeName').val(response['degreeName']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$('#selectEditDegreeID').change(function() {
    let degreeID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "degree/getDegree/" + degreeID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtEditDegreeName').val(response['degreeName']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});



function getAllStudents(){
    let tableStudents=$('#studentTable');
    tableStudents.empty();
    $.ajax({
        type:"GET",
        url:baseURL+"student/getAllByFacultyID/"+facultyID,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            $('#txtNumberOfStudents').html(response.length);
            let batchCount=0;
            let batch=null;
            for(i in response){
                let student=response[i];
                let regNo=student['registrationNo'];
                let tempBatch=regNo.split("s")[0];
                if(batch!=tempBatch){
                    batch=tempBatch;
                    batchCount=batchCount+1;
                }

                let indexNo=student['indexNo'];
                let name=student['fName']+" "+student['mName']+" "+student['lName'];
                let email=student['email'];
                let telephone=student['telephone'];
                let level=student['level'];

                let row="<tr>\n" +
                    "<td class=\"p-3\">"+regNo+"</td>\n" +
                    "<td class=\"p-3\">"+indexNo+"</td>\n" +
                    "<td class=\"p-3\">"+name+"</td>\n" +
                    "<td class=\"p-3\">"+email+"</td>\n" +
                    "<td class=\"p-3\">"+telephone+"</td>\n" +
                    "<td class=\"p-3\">"+level+"</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn bg-light text-dark border-info rounded px-4 me-3\" id=\""+regNo+"\" onclick=\"openViewModal(this.id)\"><i class=\"fas fa-clipboard-list\"></i></button>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\""+regNo+"\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i></button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\""+regNo+"\" onclick=\"deleteStudent(this.id)\" name=\"btnDelete\"><i class=\"fas fa-trash-alt\"></i></button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                tableStudents.append(row);
            }
            $('#txtNumberOfBatches').html(batchCount);
        }
    })
}

function getUniCount() {
    $.ajax({
        type: "GET",
        url: baseURL + "university/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtNumberOfUniversities').html(response.length);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function deleteStudent(registrationNo){
    swal({
        title: "Are you sure?",
        text: "Student will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type:"DELETE",
                    url:baseURL+"student/delete/"+registrationNo,
                    dataType:'json',
                    success:function (response){
                        if(response){
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllStudents();
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
                swal("Your Student data is safe!");
            }
        });
}

// Validation

let telephone=document.getElementById('txtTelephone');
let firstName=document.getElementById('txtFirstName');
let middleName=document.getElementById('txtMiddleName');
let lastName=document.getElementById('txtLastName');
let password=document.getElementById('txtPassword');

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

middleName.addEventListener('input', function(){
    let regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(middleName.value)) {
        middleName.setCustomValidity('Invalid Name');
    }else {
        middleName.setCustomValidity('');
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
    let regex = /^[A-Za-z]\w{6,14}$/;
    if (!regex.test(password.value)) {
        password.setCustomValidity('Please choose a password with 6-14 characters');
    }else {
        password.setCustomValidity('');
    }
});