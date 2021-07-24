function tabChange(tab){
    location.href=baseURL+tab+"/";
}
function logOut(){
    location.href=baseURL+"login/logout";
}

window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


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
            $('#txtViewEmail').val(response['email']);
            $('#txtViewTelephone').val(response['telephone']);
            $('#txtViewGender').val(response['gender']);
            $('#txtViewLevel').val(response['level']);
            $('#txtViewParentName').val(response['parentName']);
            $('#txtViewParentTelephone').val(response['parentTelNo']);
            $('#txtViewDegreeID').val(response['degreeID']);
            $('#txtViewDegreeName').val(response['degreeName']);
            $('#txtTitle').html(response['fName']+"'s Profile");
            $('#studentName').html(response['fName']+" "+response['mName']+" "+response['lName']);
        },error(error) {
            console.log(error);
        }
    })
}



function openUpdateStudentProfileModal() {
    var userName=$('#txtUserName').html();
    var registrationNo=userName.split("@")[0];
    let updateModal = new bootstrap.Modal(document.getElementById('updateStudentProfileModal'));
    $('#updateStudentProfileModal').on('show.bs.modal', function(event) {
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