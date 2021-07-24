var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('resultBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);
    getAllExamIDs();
    getAllResults();

    $('#selectSearchExamID').on('change',function (){
        getAllResults();
    });

    // Table Search Registration No
    $("#txtSearchRegistrationNo").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#resultTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearchRegNo').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchRegNo').css("background-color","#3B9B76");
        }else{
            $('#btnSearchRegNo').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchRegNo').css("background-color","#54948F")
        }
    });
    $('#btnSearchRegNo').click(function (){
        $('#btnSearchRegNo').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchRegNo').css("background-color","#3B9B76");
        $('#txtSearchRegistrationNo').val(null);
        getAllResults();
    });

    // Add new
    $('#addNewResult').submit(function (event) {
        let registrationNo=$('#txtRegistrationNo').val();
        let examID=$('#selectExamID').val();
        let courseID=$('#selectCourseID').val();
        let courseName=$('#txtCourseName').val();
        let level=$('#txtLevel').val();
        let grade=$('#txtGrade').val();
        let credits=$('#txtCredits').val();


        let dataObj=JSON.stringify({
            "registrationNo":registrationNo,
            "examID":examID,
            "courceID":courseID,
            "courceName":courseName,
            "level":level,
            "grade":grade,
            "credits":credits
        });

        $.ajax({
            type: "POST",
            url: baseURL + "result/save",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "Result has been saved succeessfully!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtRegistrationNo').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllResults();
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



    $('#updateResult').submit(function (event) {
        let registrationNo=$('#txtEditRegistrationNo').val();
        let examID=$('#txtEditExamID').val();
        let courseID=$('#txtEditCourseID').val();
        let courseName=$('#txtEditCourseName').val();
        let level=$('#txtEditLevel').val();
        let grade=$('#txtEditGrade').val();
        let credits=$('#txtEditCredits').val();


        let dataObj=JSON.stringify({
            "registrationNo":registrationNo,
            "examID":examID,
            "courceID":courseID,
            "courceName":courseName,
            "level":level,
            "grade":grade,
            "credits":credits
        });


        $.ajax({
            type: "PUT",
            url: baseURL + "result/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (response) {
                if(response){
                    swal("Good job!", "Your changes have been saved succeessfully!", "success");
                    $("#updateModal").modal('hide');
                    getAllResults();
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
            $('#txtLevel').val(response['courseLevel']);
            $('#txtCredits').val(response['credits']);
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
            $('#txtEditLevel').val(response['courseLevel']);
            $('#txtEditCredits').val(response['credits']);
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
        getAllExamIDs();
        let selectCourseID=modal.find('#selectCourseID');
        let txtCourseName=modal.find('#txtCourseName');
        let txtLevel=modal.find('#txtLevel');
        let txtCredits=modal.find('#txtCredits');

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
                        txtLevel.val(course['courseLevel']);
                        txtCredits.val(course['credits']);
                    }
                }

            },error(error) {
                console.log(error);
            }
        })

    })
    addNewModal.show();
}

function openUpdateModal(result) {
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);

    let regNo=result.split("-")[0];
    let examID=result.split("-")[1];

    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);

        $.ajax({
            type:"GET",
            url:baseURL+"result/getResult/"+regNo+"/"+examID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                $('#txtEditRegistrationNo').val(response['registrationNo']);
                $('#txtEditCourseID').val(response['courseID']);
                $('#txtEditExamID').val(response['examID']);
                $('#txtEditCourseName').val(response['courseName']);
                $('#txtEditLevel').val(response['level']);
                $('#txtEditCredits').val(response['credits']);
                $('#txtEditGrade').val(response['grade']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}
function getAllExamIDs() {
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    let selectExamID=$('#selectExamID');
    let selectSearchExamID=$('#selectSearchExamID');
    $.ajax({
        type: "GET",
        url: baseURL + "exam/getAllByFacultyID/" + facultyID,
        dataType: 'json',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var sel = document.getElementById('selectExamID');
            for (i = sel.length; i >= 1; i--) {
                sel.remove(i - 1);
            }

            var selSearchID = document.getElementById('selectSearchExamID');
            for (i = selSearchID.length; i >= 1; i--) {
                selSearchID.remove(i - 1);
            }

            for (i in response) {
                let exam = response[i];
                let examID = exam['examID'];
                let option = "<option>" + examID + "</option>";
                selectExamID.append(option);
                selectSearchExamID.append(option);
            }
        }, error(error) {
            console.log(error);
        }
    })
}



function getAllResults() {
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);

    let resultTable = $('#resultTable');
    resultTable.empty();

    let examID=$('#selectSearchExamID').val();
    $.ajax({
        type: "GET",
        url: baseURL + "result/getAllByExamID/"+examID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let result = response[i];
                let registrationNo = result['registrationNo'];
                let examID = result['examID'];
                let courseID = result['courseID'];
                let courseName = result['courseName'];
                let level = result['level'];
                let credits = result['credits'];
                let grade = result['grade'];
                let row = "<tr>\n" +
                    "    <td class=\"p-3\">" + registrationNo + "</td>\n" +
                    "    <td class=\"p-3\">" + examID + "</td>\n" +
                    "    <td class=\"p-3\">" + courseID + "</td>\n" +
                    "    <td class=\"p-3\">" + courseName + "</td>\n" +
                    "    <td class=\"p-3\">" + level + "</td>\n" +
                    "    <td class=\"p-3\">" + credits + "</td>\n" +
                    "    <td class=\"p-3\">" + grade + "</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\"" + registrationNo+"-"+examID + "\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\"" +  registrationNo+"-"+examID + "\" onclick=\"deleteResult(this.id)\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                resultTable.append(row);
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

