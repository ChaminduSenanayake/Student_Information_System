$(document).ready(function () {
    document.getElementById('courseBtn').style.color = "#ffffff";
    getAllCourses();
    var userName=$('#txtUserName').html();
    loadDetails(userName.split("@")[0]);


    // // Add new
    // $('#courseRegistration').submit(function (event) {
    //     let courseID=$('#txtCourseID').val();
    //     let courseName=$('#txtCourseName').val();
    //     let level=$('#txtCourseID').val();
    //     let credits=$('#txtCredits').val();
    //     let registrationNo=userName.split("@")[0];
    //
    //
    //     let dataObj=JSON.stringify({
    //         "registrationNo":registrationNo,
    //         "courseID":courseID,
    //         "courseName":courseName,
    //         "level":level,
    //         "credits":credits
    //     });
    //     $.ajax({
    //         type: "POST",
    //         url: baseURL + "studentCourse/save",
    //         data: dataObj,
    //         dataType: 'json',
    //         contentType:'application/json; charset=utf-8',
    //         success: function (responce) {
    //             if(responce){
    //                 swal("Good job!", "Registration has been saved succeessfully!", "success");
    //                 getAllCourses();
    //             }else{
    //                 swal("OOps!", "You clicked the button!", "error");
    //             }
    //         },
    //         error:function (error){
    //             console.log(error);
    //         }
    //     })
    //     event.preventDefault();
    // });

});


function getAllCourses(){
    $.ajax({
        type:"GET",
        url:baseURL+"course/getAll",
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            let sel = document.getElementById('txtCourseID');
            let select=$('#txtCourseID');
            for (i = sel.length - 1; i >= 0; i--) {
                sel.remove(i);
            }
            for(i in response){
                let course=response[i];
                let courseID=course['courseID'];
                let courseName=course['courseName']
                let semester= course['semester'];
                let level=course['courseLevel'];
                let credits=course['credits'];

                let option = "<option>" + courseID + "</option>";
                select.append(option);
                    if(i==0){
                        $('#txtCourseName').val(courseName);
                        $('#txtSemester').val(semester);
                        $('#txtCourseLevel').val(level);
                        $('#txtCredits').val(credits);
                    }
                }
        }
    })
}

$('#txtCourseID').change(function() {
    let courseID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "course/getCourse/" + courseID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let courseName=response['courseName']
            let semester= response['semester'];
            let level=response['courseLevel'];
            let credits=response['credits'];

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


