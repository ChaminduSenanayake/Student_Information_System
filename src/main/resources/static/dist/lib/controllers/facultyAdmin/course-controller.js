var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('courseBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    getAllCourses();


    // Table Search Course ID
    $("#txtSearchCourseID").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#courseTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearchCourseID').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchCourseID').css("background-color","#3B9B76");
        }else{
            $('#btnSearchCourseID').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchCourseID').css("background-color","#54948F")
        }

    });

    $('#btnSearchCourseID').click(function (){
        $('#btnSearchCourseID').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchCourseID').css("background-color","#3B9B76");
        $('#txtSearchCourseID').val(null);
        getAllCourses();
    })

    // Table Search Course Name
    $("#txtSearchCourseName").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#courseTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearchCourseName').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchCourseName').css("background-color","#3B9B76");
        }else{
            $('#btnSearchCourseName').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchCourseName').css("background-color","#54948F")
        }

    });

    $('#btnSearchCourseName').click(function (){
        $('#btnSearchCourseName').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchCourseName').css("background-color","#3B9B76");
        $('#txtSearchCourseName').val(null);
        getAllCourses();
    })

    // Add new
    $('#addNewCourse').submit(function (event) {
        var userName=$('#txtUserName').html();
        getFacultyAdmin(userName);
        let courseID=$('#txtCourseID').val();
        let courseName=$('#txtCourseName').val();
        let semester=$('#txtSemester').val();
        let level=$('#txtLevel').val();
        let credits=$('#txtCourseCredits').val();
        let departmentID=$('#selectDepartmentID').val();
        let departmentName=$('#txtDepartmentName').val();

        let dataObj=JSON.stringify({
            "courseID":courseID,
            "courseName":courseName,
            "semester":semester,
            "courseLevel":level,
            "credits":credits,
            "departmentID":departmentID,
            "departmentName":departmentName
        });
        $.ajax({
            type: "POST",
            url: baseURL + "course/save",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "Course has been saved succeessfully!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtCourseName').val("");
                        modal.find('#txtDepartmentName').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllCourses();
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



    $('#updateCourse').submit(function (event) {
        var userName=$('#txtUserName').html();
        getFacultyAdmin(userName);
        let courseID=$('#txtEditCourseID').val();
        let courseName=$('#txtEditCourseName').val();
        let semester=$('#txtEditSemester').val();
        let level=$('#txtEditLevel').val();
        let credits=$('#txtEditCourseCredits').val();
        let departmentID=$('#selectEditDepartmentID').val();
        let departmentName=$('#txtEditDepartmentName').val();

        let dataObj=JSON.stringify({
            "courseID":courseID,
            "courseName":courseName,
            "semester":semester,
            "courseLevel":level,
            "credits":credits,
            "departmentID":departmentID,
            "departmentName":departmentName
        });

        $.ajax({
            type: "PUT",
            url: baseURL + "course/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (response) {
                if(response){
                    swal("Good job!", "Your Changes have been saved succeessfully!", "success");
                    $("#updateModal").modal('hide');
                    getAllCourses();
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

$('#selectDepartmentID').change(function() {
    let departmentID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "department/getDepartment/" + departmentID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtDepartmentName').val(response['name']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$('#selectEditDepartmentID').change(function() {
    let departmentID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "department/getDepartment/" + departmentID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtEditDepartmentName').val(response['name']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

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
        let selectDepID=modal.find('#selectDepartmentID');
        let txtDepName=modal.find('#txtDepartmentName');

        $.ajax({
            type:"GET",
            url:baseURL+"department/getAll",
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectDepartmentID');
                for (i = sel.length ; i >= 1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let department = response[i];
                    let depID = department['departmentID'];
                    let option = "<option>" + depID + "</option>";
                    selectDepID.append(option);
                    if(i==0){txtDepName.val(department['name'])}
                }

            },error(error) {
                console.log(error);
            }
        })

        $.ajax({
            type:"GET",
            url:baseURL+"course/getNewID",
            success:function (response){
                modal.find('#txtCourseID').val(response);
            },
            error:function (error){
                console.log(error);
            }
        })
    })
    addNewModal.show();
}

function openUpdateModal(courseID) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);

        $.ajax({
            type:"GET",
            url:baseURL+"department/getAll",
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectEditDepartmentID');
                for (i = sel.length ; i >= 1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let department = response[i];
                    let depID = department['departmentID'];
                    let option = "<option>" + depID + "</option>";
                    $('#selectEditDepartmentID').append(option);
                    if(i==0){$('#txtEditDepartmentName').val(department['name'])}
                }

            },error(error) {
                console.log(error);
            }
        })

        $.ajax({
            type:"GET",
            url:baseURL+"course/getCourse/"+courseID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                $('#txtEditCourseID').val(response['courseID']);
                $('#txtEditCourseName').val(response['courseName']);
                $('#txtEditSemester').val(response['semester']);
                $('#txtEditLevel').val(response['courseLevel']);
                $('#selectEditDepartmentID').val(response['departmentID']);
                $('#txtEditDepartmentName').val(response['departmentName']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}


function deleteCourse(courseID){
    swal({
        title: "Are you sure?",
        text: "Course will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type:"DELETE",
                    url:baseURL+"course/delete/"+courseID,
                    dataType:'json',
                    success:function (response){
                        if(response){
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllCourses();
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
                swal("Your Course data is safe!");
            }
        });
}

function getAllCourses(){
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    let courseTable=$('#courseTable');
    courseTable.empty();
    $.ajax({
        type:"GET",
        url:baseURL+"course/getAllByFacultyID/"+facultyID,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            for(i in response){
                let course=response[i];
                let courseID=course['courseID'];
                let courseName=course['courseName']
                let semester= course['semester'];
                let level=course['courseLevel'];
                let credits=course['credits'];
                let departmentID=course['departmentID'];
                let departmentName=course['departmentName'];

                let row="<tr>\n" +
                    "    <td class=\"p-3\">"+courseID+"</td>\n" +
                    "    <td class=\"p-3\">"+courseName+"</td>\n" +
                    "    <td class=\"p-3\">"+semester+"</td>\n" +
                    "    <td class=\"p-3\">"+level+"</td>\n" +
                    "    <td class=\"p-3\">"+credits+"</td>\n" +
                    "    <td class=\"p-3\">"+departmentID+"</td>\n" +
                    "    <td class=\"p-3\">"+departmentName+"</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\""+courseID+"\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\""+courseID+"\" onclick=\"deleteCourse(this.id)\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                courseTable.append(row);
            }
        }
    })
}


// Validation
let courseName=document.getElementById('txtCourseName');
courseName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(courseName.value)) {
        courseName.setCustomValidity('Invalid Course Name');
    }else {
        courseName.setCustomValidity('');
    }
});

let editCourseName=document.getElementById('txtEditCourseName');
editCourseName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(editCourseName.value)) {
        editCourseName.setCustomValidity('Invalid Course Name');
    }else {
        editCourseName.setCustomValidity('');
    }
});