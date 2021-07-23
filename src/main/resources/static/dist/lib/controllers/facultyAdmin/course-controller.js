var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('courseBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);


    // Add new
    $('#addNewCourse').submit(function (event) {
        let departmentID=$('#txtDepartmentID').val();
        let departmentName=$('#txtDepartmentName').val();

        let dataObj=JSON.stringify({
            "departmentID":departmentID,
            "name":departmentName,
            "facultyID":facultyID,
            "facultyName":facultyName
        });
        $.ajax({
            type: "POST",
            url: baseURL + "department/save",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "You clicked the button!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtDepartmentName').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllDepartments();
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



    $('#updateDepartment').submit(function (event) {
        let departmentID=$('#txtEditDepartmentID').val();
        let departmentName=$('#txtEditDepartmentName').val();

        let dataObj=JSON.stringify({
            "departmentID":departmentID,
            "name":departmentName,
            "facultyID":facultyID,
            "facultyName":facultyName
        });
        $.ajax({
            type: "PUT",
            url: baseURL + "department/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (response) {
                if(response){
                    swal("Good job!", "You clicked the button!", "success");
                    $('#updateModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtEditDepartmentName').val("");
                    });
                    $("#updateModal").modal('hide');
                    getAllDepartments();
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
