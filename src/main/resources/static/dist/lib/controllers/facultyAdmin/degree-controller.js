var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('degreeBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();
    getFacultyAdmin(userName);
    getAllDegrees();

    // Table Search Degree ID
    $("#txtSearchDegreeID").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#degreeTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        if(value==""){
            $('#btnSearchDegreeID').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchDegreeID').css("background-color","#3B9B76");
        }else{
            $('#btnSearchDegreeID').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchDegreeID').css("background-color","#54948F")
        }

    });

    $('#btnSearchDegreeID').click(function (){
        $('#btnSearchDegreeID').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchDegreeID').css("background-color","#3B9B76");
        $('#txtSearchDegreeID').val(null);
        getAllDegrees();
    })

    // Table Search
    $("#txtSearchDegreeName").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#degreeTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        if(value==""){
            $('#btnSearchDegreeName').html("<i class=\"fas fa-search\"></i> Search");
            $('#btnSearchDegreeName').css("background-color","#3B9B76");
        }else{
            $('#btnSearchDegreeName').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
            $('#btnSearchDegreeName').css("background-color","#54948F")
        }

    });

    $('#btnSearchDegreeName').click(function (){
        $('#btnSearchDegreeName').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearchDegreeName').css("background-color","#3B9B76");
        $('#txtSearchDegreeName').val(null);
        getAllDegrees();
    })


    // Add new
    $('#addNewDegree').submit(function (event) {
        event.preventDefault();
        let degreeID=$('#txtDegreeId').val();
        let degreeName=$('#txtDegreeName').val();

        let dataObj=JSON.stringify({
            "degreeID":degreeID,
            "degreeName":degreeName,
            "facultyID":facultyID,
            "uniName":facultyName
        });
        $.ajax({
            type: "POST",
            url: baseURL + "degree/save",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "Degree has been saved succeessfully!", "success");
                    $('#addNewModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtDegreeName').val("");
                    });
                    $("#addNewModal").modal('hide');
                    getAllDegrees();
                }else{
                    swal("OOps!", "You clicked the button!", "error");
                }
            },
            error:function (error){
                console.log(error);
            }
        })
    });

    $('#updateDegree').submit(function (event) {

        let degreeID=$('#txtEditDegreeID').val();
        let degreeName=$('#txtEditDegreeName').val();

        let dataObj=JSON.stringify({
            "degreeID":degreeID,
            "degreeName":degreeName,
            "facultyID":facultyID,
            "facultyName":facultyName
        });
        $.ajax({
            type: "PUT",
            url: baseURL + "degree/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "Your changes have been saved succeessfully!", "success");
                    $('#updateModal').on('hidden.bs.modal', function (e) {
                        let modal=$(this);
                        modal.find('#txtEditDegreeName').val("");
                    });
                    $("#updateModal").modal('hide');
                    getAllDegrees();
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


function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let select=modal.find('#selectFacultyID');
        let txtFacName=modal.find('#txtFacultyName');

        $.ajax({
            type:"GET",
            url:baseURL+"degree/getNewID",
            success:function (response){
                modal.find('#txtDegreeID').val(response);
            },
            error:function (error){
                console.log(error);
            }
        })
    })
    addNewModal.show();
}

function openUpdateModal(degreeID) {
    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    $('#updateModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let txtDegreeID=modal.find('#txtEditDegreeID');
        let txtDegreeName=modal.find('#txtEditDegreeName');

        $.ajax({
            type:"GET",
            url:baseURL+"degree/getDegree/"+degreeID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                txtDegreeID.val(response['degreeID']);
                txtDegreeName.val(response['degreeName']);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}


function deleteDegree(degreeID){
    swal({
        title: "Are you sure?",
        text: "Degree will be deleted..!!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type:"DELETE",
                    url:baseURL+"degree/delete/"+degreeID,
                    dataType:'json',
                    success:function (response){
                        if(response){
                            swal("Poof! Your imaginary file has been deleted!", {icon: "success"});
                            getAllDegrees();
                        }else{
                            swal("Poof! Your imaginary file has not been deleted!", {
                                icon: "error",
                            });
                        }
                    },
                    error:function (error){
                        console.log(error);
                    }
                });
            } else {
                swal("Your Degree data is safe!");
            }
        });
}

function getAllDegrees(){
    let tableDegree=$('#degreeTable');
    tableDegree.empty();
    $.ajax({
        type:"GET",
        url:baseURL+"degree/getAll",
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            for(i in response){
                let degree=response[i];
                let degreeID=degree['degreeID'];
                let degreeName=degree['degreeName'];

                let row="<tr>\n" +
                    "    <td class=\"p-3\">"+degreeID+"</td>\n" +
                    "    <td class=\"p-3\">"+degreeName+"</td>\n" +
                    "<div class=\"btn-group\" role=\"group\">\n" +
                    "<td>\n" +
                    "<button type=\"button\" class=\"btn btn-secondary rounded px-4 me-3\" id=\""+degreeID+"\" onclick=\"openUpdateModal(this.id)\"><i class=\"fas fa-edit\"></i> Edit</button>\n" +
                    "<button type=\"button\" class=\"btn btn-danger rounded px-4\" id=\""+degreeID+"\" onclick=\"deleteDegree(this.id)\"><i class=\"fas fa-trash-alt\"></i> Delete</button>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>";
                tableDegree.append(row);
            }
        }
    })
}

// Validation

let degreeName=document.getElementById('txtDegreeName');

degreeName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(degreeName.value)) {
        degreeName.setCustomValidity('Invalid Degree Name');
    }else {
        degreeName.setCustomValidity('');
    }
});

let editDegreeName=document.getElementById('txtEditDegreeName');

editDegreeName.addEventListener('input', function(){
    let regex = /^[a-zA-Z ]{2,200}$/;
    if (!regex.test(editDegreeName.value)) {
        editDegreeName.setCustomValidity('Invalid Degree Name');
    }else {
        editDegreeName.setCustomValidity('');
    }
});

