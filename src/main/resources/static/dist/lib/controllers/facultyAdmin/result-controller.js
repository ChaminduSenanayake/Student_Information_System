var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('resultBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);
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
$('#selectCourseID').change(function() {
    let courseID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "course/getCourse/" + courseID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtCourseName').val(response['courseName']);
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
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let selectCourseID=modal.find('#selectCourseID');
        let txtCourseName=modal.find('#txtCourseName');

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

function openUpdateModal(examID) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let selectCourseID=modal.find('#selectCourseID');
        let txtCourseName=modal.find('#txtCourseName');

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
                    selectCourseID.append(option);
                    if(i==0){txtCourseName.val(course['courseName'])}
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


