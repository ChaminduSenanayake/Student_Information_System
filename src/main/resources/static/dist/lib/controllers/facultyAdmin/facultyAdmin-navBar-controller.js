function getFacultyAdmin(userName) {
    $.ajax({
        type: "GET",
        url: baseURL + "facultyAdmin/getByUserName/"+userName,
        dataType: 'json',
        async:false,
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtAdminName').html(response['fName']+" "+response['lName']);
            facultyID=response['facultyID'];
            facultyAdminID=response['facultyAdminID'];
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


// Open Faculty Admin Settings
function openSettingsFacultyAdminModal() {
    let updateModal = new bootstrap.Modal(document.getElementById('updateAdminModal'));
    $('#updateAdminModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        $.ajax({
            type:"GET",
            url:baseURL+"facultyAdmin/getFacultyAdmin/"+facultyAdminID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                $('#txtSettingsFacultyAdminID').val(response['facultyAdminID']);
                $('#txtSettingsName').val(response['fName']+" "+response['lName']);
                $('#txtSettingsEmail').val(response['email']);
                $('#txtSettingsUserName').val(response['userName']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}

//Update Faculty Admin Password
$('#updateAdminPassword').submit(function (event){
    event.preventDefault();
    let adminID=$('#txtSettingsFacultyAdminID').val();
    let password=$('#txtSettingsPassword').val();
    let confirmPassword=$('#txtSettingsConfirmPassword').val();

    if(password==confirmPassword){
        let dataObj=JSON.stringify({
            "facultyAdminID":adminID,
            "fName":null,
            "lName":null,
            "address":null,
            "telephone":null,
            "email":null,
            "userName":null,
            "password":password,
            "facultyID":null,
            "facultyName":null,
        });
        $.ajax({
            type: "PUT",
            url: baseURL + "facultyAdmin/updatePassword",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "Your changes have been saved succeessfully!", "success");
                    $('#updateAdminModal').on('hidden.bs.modal', function (e) {
                        modal.find('#txtSettingsPassword').val("");
                        modal.find('#txtSettingsConfirmPassword').val("");
                    });
                    $("#updateAdminModal").modal('hide');
                }else{
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error:function (error){
                console.log(error);
            }
        })
    }else{
        swal("OOps!", "Input Passwords Correctly!", "error");
    }
});

// Password Change Validation
let settingsPassword=document.getElementById('txtSettingsPassword');
let confirmSettingsPassword=document.getElementById('txtSettingsConfirmPassword');
settingsPassword.addEventListener('input', function(){
    let regex = /^[A-Za-z]\w{6,14}$/;
    if (!regex.test(settingsPassword.value)) {
        settingsPassword.setCustomValidity('Please choose a password with 6-14 characters');
    }else {
        settingsPassword.setCustomValidity('');
    }
});


confirmSettingsPassword.addEventListener('input', function(){
    let regex = /^[A-Za-z]\w{6,14}$/;
    if (!regex.test(confirmSettingsPassword.value)) {
        confirmSettingsPassword.setCustomValidity('Please choose a password with 6-14 characters');
    }else {
        confirmSettingsPassword.setCustomValidity('');
    }
});