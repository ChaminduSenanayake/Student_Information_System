$(document).ready(function () {
    document.getElementById('profileBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();

    loadDetails(userName.split("@")[0]);
});



function loadDetails(registrationNo) {
    $.ajax({
        type:"GET",
        url:baseURL+"student/getStudent/"+registrationNo,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response) {
            $('#txtUserName').html(response['fName']+" "+response['lName']);
            $('#txtViewRegistrationNo').val(response['registrationNo']);
            $('#txtViewIndexNo').val(response['indexNo']);
            $('#txtViewFirstName').val(response['fName']);
            $('#txtViewMiddleName').val(response['mName']);
            $('#txtViewLastName').val(response['lName']);
            $('#txtViewAddress').val(response['address']);
            $('#txtViewEmail').val(response['email']);
            $('#txtViewTelephone').val(response['telephone']);
            $('#txtViewGender').val(response['gender']);
            $('#txtViewLevel').val(response['level']);
            $('#txtViewParentName').val(response['parentName']);
            $('#txtViewParentTelephone').val(response['parentTelNo']);
            $('#txtViewDegreeID').val(response['degreeID']);
            $('#txtViewDegreeName').val(response['degreeName']);
            $('#txtTitle').html(response['fName']+"'s Profile");
        },error(error) {
            console.log(error);
        }
    })
}
