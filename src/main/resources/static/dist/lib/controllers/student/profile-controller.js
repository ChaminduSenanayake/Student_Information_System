$(document).ready(function () {
    var userName=$('#txtUserName').html();
    loadDetails(userName.split("@")[0]);

    // Update Student
    $('#updateStudent').submit(function (event) {
        let regNo=$('#txtEditRegistrationNo').val();
        let password = $('#txtEditPassword').val();
        let confirmPassword = $('#txtEditConfirmPassword').val();

        if (password == confirmPassword) {
            let dataObj = JSON.stringify({
                "registrationNo":regNo,
                "indexNo":null,
                "fName":null,
                "mName":null,
                "lName":null,
                "address":null,
                "email":null,
                "telephone":null,
                "NIC":null,
                "gender":null,
                "level":null,
                "parentName":null,
                "parentTelNo":null,
                "password":password,
                "imagePath":null,
                "imageName":null,
                "degreeID":null,
                "degreeName":null,
                "unicode":null
            });
            $.ajax({
                type: "PUT",
                url: baseURL + "studentProfile/update",
                data: dataObj,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    if (response) {
                        swal("Good job!", "Your changes have been saved succeessfully!", "success");
                        $('#updateModal').on('hidden.bs.modal', function (e) {
                            let modal = $(this);
                            modal.find('#txtEditPassword').val("");
                            modal.find('#txtEditConfirmPassword').val("");
                        });
                        $("#updateModal").modal('hide');
                    } else {
                        swal("OOps!", "You clicked the button!", "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            })
        } else {
            swal("OOps!", "Input Passwords Correctly!", "error");
        }
        event.preventDefault();
    });

});


//
// function loadDetails(registrationNo) {
//     $.ajax({
//         type:"GET",
//         url:baseURL+"student/getStudent/"+registrationNo,
//         dataType:'json',
//         contentType: 'application/json; charset=utf-8',
//         success:function (response) {
//             $('#txtUserName').html(response['fName']+" "+response['lName']);
//             $('#txtViewRegistrationNo').val(response['registrationNo']);
//             $('#txtViewIndexNo').val(response['indexNo']);
//             $('#txtViewFirstName').val(response['fName']);
//             $('#txtViewMiddleName').val(response['mName']);
//             $('#txtViewLastName').val(response['lName']);
//             $('#txtViewAddress').val(response['address']);
//             $('#txtViewEmail').val(response['email']);
//             $('#txtViewTelephone').val(response['telephone']);
//             $('#txtViewGender').val(response['gender']);
//             $('#txtViewLevel').val(response['level']);
//             $('#txtViewParentName').val(response['parentName']);
//             $('#txtViewParentTelephone').val(response['parentTelNo']);
//             $('#txtViewDegreeID').val(response['degreeID']);
//             $('#txtViewDegreeName').val(response['degreeName']);
//             $('#txtTitle').html(response['fName']+"'s Profile");
//             $('#studentName').html(response['fName']+" "+response['mName']+" "+response['lName']);
//
//         },error(error) {
//             console.log(error);
//         }
//     })
// }


function loadDetails(registrationNo) {
    $.ajax({
        type:"GET",
        url:baseURL+"student/getStudent/"+registrationNo,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response) {
            $('#txtViewRegistrationNo').val(response['registrationNo']);
            $('#txtViewIndexNo').val(response['indexNo']);
            $('#txtViewFirstName').val(response['fName']);
            $('#txtViewMiddleName').val(response['mName']);
            $('#txtViewLastName').val(response['lName']);
            $('#txtViewAddress').val(response['address']);
            $('#txtViewNIC').val(response['nic']);
            $('#txtViewEmail').val(response['email']);
            $('#txtViewTelephone').val(response['telephone']);
            $('#txtViewGender').val(response['gender']);
            $('#txtViewLevel').val(response['level']);
            $('#txtViewParentName').val(response['parentName']);
            $('#txtViewParentTelephone').val(response['parentTelNo']);
            $('#txtViewDegreeName').val(response['degreeName']);
            $('#txtTitle').html(response['fName']+"'s Profile");
            $('#studentName').html(response['fName']+" "+response['mName']+" "+response['lName']);
            $('#studentImage').attr('src',response['imagePath']);
        },error(error) {
            console.log(error);
        }
    })
}



function openUpdateStudentProfileModal() {
    var userName=$('#txtUserName').html();
    var registrationNo=userName.split("@")[0];
    let updateModal = new bootstrap.Modal(document.getElementById('updateStudentModal'));
    $('#updateStudentModal').on('show.bs.modal', function(event) {
        let modal = $(this);

        $.ajax({
            type:"GET",
            url:baseURL+"student/getStudent/"+registrationNo,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                modal.find('#txtEditRegistrationNo').val(response['registrationNo']);
                modal.find('#txtEditIndexNo').val(response['indexNo']);
                modal.find('#txtEditFirstName').val(response['fName']);
                modal.find('#txtEditMiddleName').val(response['mName']);
                modal.find('#txtEditLastName').val(response['lName']);
                modal.find('#txtEditPassword').val(response['password']);
                modal.find('#txtEditConfirmPassword').val(response['password']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}