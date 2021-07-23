var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('examBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);

    // Table Search Exam ID
    $("#txtSearchExamID").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#examTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearchExamID').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchExamID').css("background-color","#3B9B76");
        }else{
            $('#btnSearchExamID').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchExamID').css("background-color","#54948F")
        }

    });

    // Table Search Exam Date
    $("#txtSearchExamID").on("change", function() {
        var value = $(this).val().toLowerCase();
        $("#examTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearchExamDate').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchExamDate').css("background-color","#3B9B76");
        }else{
            $('#btnSearchExamDate').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchExamDate').css("background-color","#54948F")
        }

    });


    $('#btnSearchExamDate').click(function (){
        $('#btnSearchExamID').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchExamID').css("background-color","#3B9B76");
        $('#txtSearchExamID').val(null);
        getAllExams();
    });

    $('#btnSearchExamDate').click(function (){
        $('#btnSearchExamDate').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchExamDate').css("background-color","#3B9B76");
        $('#txtSearchExamDate').val(null);
        getAllExams();
    });


    // Add new
    $('#addNewExam').submit(function (event) {
        let examID=$('#txtExamID').val();
        let examName=$('#txtExamName').val();
        let courseID=$('#selectCourseID').val();
        let courseName=$('#txtCourseName').val();
        let date=$('#txtExamDate').val();
        let duration=$('#txtExamDuration').val();

        let dataObj=JSON.stringify({
            "examID":examID,
            "examName":examName,
            "date":date,
            "duration":duration,
            "courseID":courseID,
            "courseName":courseName
        });
        $.ajax({
            type: "POST",
            url: baseURL + "exam/save",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "You clicked the button!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtExamName').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllExams();
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



    $('#updateExam').submit(function (event) {
        let examID=$('#txtExamID').val();
        let examName=$('#txtExamName').val();
        let courseID=$('#selectCourseID').val();
        let courseName=$('#txtCourseName').val();
        let date=$('#txtExamDate').val();
        let duration=$('#txtExamDuration').val();

        let dataObj=JSON.stringify({
            "examID":examID,
            "examName":examName,
            "date":date,
            "duration":duration,
            "courseID":courseID,
            "courseName":courseName
        });

        $.ajax({
            type: "PUT",
            url: baseURL + "exam/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (response) {
                if(response){
                    swal("Good job!", "You clicked the button!", "success");
                    $("#updateModal").modal('hide');
                    getAllExams();
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

$('#selectCourseID').change(function() {
    let courseID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "course/getCourse/" + courseID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtCourseName').val(response['name']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$('#selectEditCourseID').change(function() {
    let courseID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "course/getCourse/" + courseID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtEditCourseName').val(response['name']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});

function getFacultyAdmin(userName) {
    $.ajax({
        type: "GET",
        url: baseURL + "facultyAdmin/getByUserName/"+userName,
        dataType: 'json',
        async:false,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtUserName').html(response['fName']+" "+response['lName']);
            facultyID=response['facultyID'];
            $.ajax({
                type: "GET",
                url: baseURL + "university/getUniversityByFacultyID/"+response['facultyID'],
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    $('#uniImage').attr("src",response['imagePath']);
                    $('#uniName').html(response['uniName']);
                    uniCode=response['uniCode'];
                    uniName= response['uniName'];
                }
            })
        }
    });
}

function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let selectCourseID=modal.find('#selectCourseID');
        let txtCourseName=modal.find('#txtCourseName');

        $.ajax({
            type:"GET",
            url:baseURL+"course/getAll",
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectCourseID');
                for (i = sel.length ; i >= 1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let course = response[i];
                    let courseID = course['courseID'];
                    let option = "<option>" + courseID + "</option>";
                    selectCourseID.append(option);
                    if(i==0){txtCourseName.val(course['courseName'])}
                }

            },error(error) {
                console.log(error);
            }
        })

        $.ajax({
            type:"GET",
            url:baseURL+"exam/getNewID",
            success:function (response){
                modal.find('#txtExamID').val(response);
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

function getAllCourses() {
    let courseTable = $('#courseTable');
    courseTable.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "course/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let course = response[i];
                let courseID = course['courseID'];
                let courseName = course['courseName']
                let semester = course['semester'];
                let level = course['courseLevel'];
                let departmentID = course['departmentID'];
                let departmentName = course['departmentName'];

                let row = "<tr>\n" +
                    "    <td class=\"p-3\">" + courseID + "</td>\n" +
                    "    <td class=\"p-3\">" + courseName + "</td>\n" +
                    "    <td class=\"p-3\">" + semester + "</td>\n" +
                    "    <td class=\"p-3\">" + level + "</td>\n" +
                    "    <td class=\"p-3\">" + departmentID + "</td>\n" +
                    "    <td class=\"p-3\">" + departmentName + "</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\"" + courseID + "\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\"" + courseID + "\" onclick=\"deleteCourse(this.id)\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                courseTable.append(row);
            }
        }
    })
}