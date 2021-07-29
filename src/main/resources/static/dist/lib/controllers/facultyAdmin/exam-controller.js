var facultyID;
var facultyName;
var uniCode;
var uniName;
var facultyAdminID;
$(document).ready(function () {
    document.getElementById('examBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);
    getAllExams();

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
    $('#btnSearchExamID').click(function (){
        $('#btnSearchExamID').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchExamID').css("background-color","#3B9B76");
        $('#txtSearchExamID').val(null);
        getAllExams();
    });

    // Table Search Exam Date
    $("#txtSearchExamDate").on("keyup", function() {
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
        $('#btnSearchExamDate').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchExamDate').css("background-color","#3B9B76");
        $('#txtSearchExamDate').val(null);
        getAllExams();
    });


    // Add new
    $('#addNewExam').submit(function (event) {
        var userName=$('#txtUserName').html();
        getFacultyAdmin(userName);
        let examID=$('#txtExamID').val();
        let examName=$('#txtExamName').val();
        let courseID=$('#selectCourseID').val();
        let courseName=$('#txtCourseName').val();
        let date=$('#txtExamDate').val();
        let startTime=tConvert($('#txtExamStartTime').val());
        let endTime=tConvert($('#txtExamEndTime').val());

        let dataObj=JSON.stringify({
            "examID":examID,
            "examName":examName,
            "date":date,
            "startTime":startTime,
            "endTime":endTime,
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
                    swal("Good job!", "Exam has been saved succeessfully!", "success");
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
        var userName=$('#txtUserName').html();
        getFacultyAdmin(userName);
        let examID=$('#txtEditExamID').val();
        let examName=$('#txtEditExamName').val();
        let courseID=$('#selectEditCourseID').val();
        let courseName=$('#txtEditCourseName').val();
        let date=$('#txtEditExamDate').val();
        let startTime=tConvert($('#txtEditExamStartTime').val());
        let endTime=tConvert($('#txtEditExamEndTime').val());

        let dataObj=JSON.stringify({
            "examID":examID,
            "examName":examName,
            "date":date,
            "startTime":startTime,
            "endTime":endTime,
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
                    swal("Good job!", "Your changes have been saved succeessfully!", "success");
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
            $('#txtCourseName').val(response['courseName']);
            $('#txtExamName').val(courseID+" - Final Exam");
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
            $('#txtEditCourseName').val(response['courseName']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});


function openAddNewModal() {
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let selectCourseID=modal.find('#selectCourseID');
        let txtCourseName=modal.find('#txtCourseName');
        let txtExamName=modal.find('#txtExamName');

        $.ajax({
            type:"GET",
            url:baseURL+"course/getAllByFacultyID/"+facultyID,
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
                    if(i==0){
                        txtCourseName.val(course['courseName']);
                        txtExamName.val(courseID+" - Final Exam");
                    }
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

function openUpdateModal(examID) {
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);

        $.ajax({
            type:"GET",
            url:baseURL+"course/getAllByFacultyID/"+facultyID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectEditCourseID');
                for (i = sel.length ; i >= 1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let course = response[i];
                    let courseID = course['courseID'];
                    let option = "<option>" + courseID + "</option>";
                    $('#selectEditCourseID').append(option);
                    if(i==0){$('#txtEditCourseName').val(course['courseName'])}
                }

            },error(error) {
                console.log(error);
            }
        })

        $.ajax({
            type:"GET",
            url:baseURL+"exam/getExam/"+examID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                $('#txtEditExamID').val(response['examID']);
                $('#txtEditExamName').val(response['examName']);
                $('#selectEditCourseID').val(response['courseID']);
                $('#txtEditCourseName').val(response['courseName']);
                $('#txtEditExamDate').val(response['date']);
                $('#txtEditExamStartTime').val(response['startTime']);
                $('#txtEditExamEndTime').val(response['endTime']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}


function deleteExam(examID){
    swal({
        title: "Are you sure?",
        text: "Exam will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type:"DELETE",
                    url:baseURL+"exam/delete/"+examID,
                    dataType:'json',
                    success:function (response){
                        if(response){
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllExams();
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

function getAllExams() {
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    let examTable = $('#examTable');
    examTable.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "exam/getAllByFacultyID/"+facultyID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let exam = response[i];
                let examID = exam['examID'];
                let examName = exam['examName'];
                let courseID = exam['courseID'];
                let courseName = exam['courseName'];
                let date = exam['date'];
                let startTime = exam['startTime'];
                let endTime = exam['endTime'];
                let row = "<tr>\n" +
                    "    <td class=\"p-3\">" + examID + "</td>\n" +
                    "    <td class=\"p-3\">" + examName + "</td>\n" +
                    "    <td class=\"p-3\">" + courseID + "</td>\n" +
                    "    <td class=\"p-3\">" + courseName + "</td>\n" +
                    "    <td class=\"p-3\">" + date + "</td>\n" +
                    "    <td class=\"p-3\">" + startTime+"-"+endTime + "</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\"" + examID + "\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i></button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\"" + examID + "\" onclick=\"deleteExam(this.id)\"><i class=\"fas fa-trash-alt\"></i></button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                examTable.append(row);
            }
        }
    })
}
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


// Validation
let examName=document.getElementById('txtExamName');
examName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(examName.value)) {
        examName.setCustomValidity('Invalid Exam Name Name');
    }else {
        examName.setCustomValidity('');
    }
});

let editExamName=document.getElementById('txtEditExamName');
editExamName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(editExamName.value)) {
        editExamName.setCustomValidity('Invalid Exam Name Name');
    }else {
        editExamName.setCustomValidity('');
    }
});


//Time Converter
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}