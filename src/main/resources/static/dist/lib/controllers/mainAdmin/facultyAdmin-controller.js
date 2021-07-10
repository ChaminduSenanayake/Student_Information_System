$(document).ready(function () {
    document.getElementById('facultyAdminBtn').style.color = "#4FB3A1";
});


function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let selectUniCode=modal.find('#selectUniCode');
        let txtUniName=modal.find('#txtUniName');
        let selectFacultyID=modal.find('#selectFacultyID');
        let txtFacultyName=modal.find('#txtFacultyName');
        // let txtAdminID=modal.find('#txtFacultyAdminID');
        // let txtFirstName=modal.find('#txtFirstName');
        // let txtLastName=modal.find('#txtLastName');
        // let txtAddress=modal.find('#txtAddress');
        // let txtTelephone=modal.find('#txtTelephone');
        // let txtEmail=modal.find('#txtEmail');
        // let txtUserName=modal.find('#txtUserName');
        // let txtPassword=modal.find('#txtPassword');
        // let txtConfirmPassword=modal.find('#txtConfirmPassword');

        $.ajax({
            type:"GET",
            url:baseURL+"university/getAll",
            dataType:'json',
            async:false,
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectUniCode');
                for (i = sel.length ; i >= 1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let university = response[i];
                    let uniCode = university['uniCode'];
                    let uniName = university['uniName'];

                    let option = "<option>" + uniCode + "</option>";

                    selectUniCode.append(option);
                    if(i==0){txtUniName.val(uniName)}
                }
            },error(error) {
                console.log(error);
            }
        });
        loadFacIDs(selectUniCode);

        $.ajax({
            type:"GET",
            url:baseURL+"facultyAdmin/getNewID",
            success:function (response){
                modal.find('#txtFacultyAdminID').val(response);
            },
            error:function (error){
                console.log(error);
            }
        })
    })
    addNewModal.show();
}

$('#selectUniCode').change(function() {
    let uniCode=$(this).val();
    $.ajax({
        type:"GET",
        url:baseURL+"university/getUniversity/"+uniCode,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            $('#txtUniName').val(response['uniName']);
        },
        error:function (error){
            console.log(error);
        }
    });

    loadFacIDs(uniCode);
});

function loadFacIDs(selectUniCode){
    let uniCode=selectUniCode.val();
    if(uniCode!=null){
        $.ajax({
            type:"GET",
            url:baseURL+"faculty/getAllByUniCode/"+selectUniCode.val(),
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectFacultyID');
                for (i = sel.length; i >=1; i--) {
                    sel.remove(i-1);
                }
                for (i in response) {
                    let faculty = response[i];
                    let facultyID = faculty['facultyID'];
                    let facultyName = faculty['facultyName'];
                    let option = "<option>" + facultyID + "</option>";

                    selectFacultyID.append(option);
                    if(i==0){txtFacultyName.val(facultyName)}
                }
            },error(error) {
                console.log(error);
            }
        })

    }
}