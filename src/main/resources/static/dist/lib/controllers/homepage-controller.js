$(document).ready(function () {
    loadUni();
    getAllStudents();
    getAllCourses();

});

function loadUni() {
    let cardset = $('#cardset');
    cardset.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "university/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtUniversityCountIndex').attr('data-purecounter-end', response.length);
            $('#txtUniversityCountAbout').attr('data-purecounter-end', response.length);
            for (i in response) {
                let university = response[i];
                let uniCode = university['uniCode'];
                let uniName = university['uniName'];
                let imagePath = university['imagePath'];

                let card = " <div id=\"" + uniCode + "\" onclick=\"openLoginWindow(this.id)\" class=\"col-sm-3 py-2\">\n" +
                    "            <div class=\"card card-body h-200\">\n" +
                    "                <img class=\"rounded mx-auto d-block\" id=\"img_" + uniCode + "\">\n" +
                    "                <h4>" + uniName + "</h4>\n" +
                    "            </div>\n" +
                    "        </div>";
                cardset.append(card);
                $('#img_' + uniCode).attr("src", imagePath);
            }
        }, error: function () {
            $('#txtUniversityCountIndex').attr('data-purecounter-end',0);
            $('#txtUniversityCountAbout').attr('data-purecounter-end', 0);
        }
    });
}


function getAllStudents() {
    $.ajax({
        type: "GET",
        url: baseURL + "student/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtStudentCountIndex').attr('data-purecounter-end', response.length);
            $('#txtStudentCountAbout').attr('data-purecounter-end', response.length);
        }, error: function () {
            $('#txtStudentCountIndex').attr('data-purecounter-end', 0);
            $('#txtStudentCountAbout').attr('data-purecounter-end', 0);
        }
    })
}


function getAllCourses(){
    $.ajax({
        type:"GET",
        url:baseURL+"course/getAll",
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            $('#txtCourseCountIndex').attr('data-purecounter-end', response.length);
            $('#txtCourseCountAbout').attr('data-purecounter-end', response.length);
        },
        error:function(){
            $('#txtCourseCountIndex').attr('data-purecounter-end', 0);
            $('#txtCourseCountAbout').attr('data-purecounter-end', 0);
        }
    })
}


function openWindow(tabName) {
    location.href = baseURL + "homepage/" + tabName;
    return false;
}

function openLoginWindow() {
    location.href = baseURL + "login/";
    return false;
}
