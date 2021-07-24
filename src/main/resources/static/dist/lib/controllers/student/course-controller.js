var userName;
var registrationNo;
$(document).ready(function () {
    document.getElementById('courseBtn').style.color = "#ffffff";
    getAllCourses();
    getAllRegistrations();
    userName = $('#txtUserName').html();
    registrationNo = userName.split("@")[0];
    loadDetails(registrationNo);


    // Add new
    $('#courseRegistration').submit(function (event) {
        let courseID = $('#txtCourseID').val();
        let courseName = $('#txtCourseName').val();
        let level = $('#txtCourseLevel').val();
        let semester = $('#txtSemester').val();
        let credits = $('#txtCredits').val();
        let registrationNo = userName.split("@")[0];

        let dataObj = JSON.stringify({
            "registrationNo": registrationNo,
            "courseID": courseID,
            "courseName": courseName,
            "level": level,
            "semester": semester,
            "credits": credits
        });
        $.ajax({
            type: "POST",
            url: baseURL + "studentCourse/save",
            data: dataObj,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (responce) {
                if (responce) {
                    swal("Good job!", "Registration has been saved succeessfully!", "success");
                    getAllCourses();
                    getAllRegistrations();
                } else {
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
        event.preventDefault();
    });

});


function getAllCourses() {
    let studentLevel;
    let degreeID;
    let facultyID;
    let regNo = $('#txtUserName').html().split("@")[0];
    $.ajax({
        type: "GET",
        url: baseURL + "student/getStudent/" + regNo,
        dataType: 'json',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            studentLevel = response['level'];
            degreeID=response['degreeID'];
        }, error(error) {
            console.log(error);
        }
    })

    $.ajax({
        type: "GET",
        url: baseURL + "degree/getDegree/" + degreeID,
        dataType: 'json',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            facultyID=response['facultyID'];
        }, error(error) {
            console.log(error);
        }
    })

    $.ajax({
        type: "GET",
        url:baseURL+"course/getAllByFacultyID/"+facultyID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let sel = document.getElementById('txtCourseID');
            let select = $('#txtCourseID');
            for (i = sel.length - 1; i >= 0; i--) {
                sel.remove(i);
            }
            for (i in response) {
                let course = response[i];
                let courseID = course['courseID'];
                let courseName = course['courseName']
                let semester = course['semester'];
                let level = course['courseLevel'];
                let credits = course['credits'];
                if (level.valueOf() != studentLevel.valueOf()) {
                    continue;
                }
                ;
                let option = "<option>" + courseID + "</option>";
                select.append(option);
                if (i == 0) {
                    $('#txtCourseName').val(courseName);
                    $('#txtSemester').val(semester);
                    $('#txtCourseLevel').val(level);
                    $('#txtCredits').val(credits);
                }
            }
        }
    })
}

$('#txtCourseID').change(function () {
    let courseID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "studentCourse/getCourse/" + courseID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let courseName = response['courseName']
            let semester = response['semester'];
            let level = response['courseLevel'];
            let credits = response['credits'];

            $('#txtCourseName').val(courseName);
            $('#txtSemester').val(semester);
            $('#txtCourseLevel').val(level);
            $('#txtCredits').val(credits);
        },
        error: function (error) {
            console.log(error);
        }
    });
});


function getAllRegistrations() {
    let regNo = $('#txtUserName').html().split("@")[0];
    let registrationTable = $('#registrationTable');
    registrationTable.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "studentCourse/getCourses/" + regNo,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let courseRegistration = response[i];
                let courseID = courseRegistration['courseID'];
                let courseName = courseRegistration['courseName'];
                let level = courseRegistration['level']
                let semester = courseRegistration['semester'];
                let credits = courseRegistration['credits'];

                let row = "<tr>\n" +
                    "<td class=\"p-3\">" + courseID + "</td>\n" +
                    "<td class=\"p-3\">" + courseName + "</td>\n" +
                    "<td class=\"p-3\">" + level + "</td>\n" +
                    "<td class=\"p-3\">" + semester + "</td>\n" +
                    "<td class=\"p-3\">" + credits + "</td>\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\"" + courseID + "\" onclick=\"deleteCourseRegistration(this.id)\" name=\"btnDelete\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</td>\n" +
                    "</tr>";
                registrationTable.append(row);
            }
        }
    })
}


function deleteCourseRegistration(courseID) {
    let regNo = $('#txtUserName').html().split("@")[0];
    alert(regNo);
    swal({
        title: "Are you sure?",
        text: "Registration will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "studentCourse/delete/" + regNo + "/" + courseID,
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