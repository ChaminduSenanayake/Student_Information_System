var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('examBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);
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
