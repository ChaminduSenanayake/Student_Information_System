$(document).ready(function () {
    document.getElementById('degreeBtn').style.color = "#ffffff";
    getAllDegrees();

    // Table Search
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#degreeTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        $('#btnSearch').html("<i class=\"fas fa-eraser\"></i>&nbsp&nbspClear");
        $('#btnSearch').css("background-color","#54948F")
    });

    $('#btnSearch').click(function (){
        $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearch').css("background-color","#3B9B76");
        $('#search').val(null);
        getAllDegrees();
    })

    // Add new
    $('#btnAddNew').click(function (){
        let degreeID=$('#txtDegreeId').val();
        let degreeName=$('#txtDegreeName').val();
        let facultyID=$('#selectFacultyID').val();
        let facultyName=$('#txtFacultyName').val();

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
                    swal("Good job!", "You clicked the button!", "success");
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

    $('#btnUpdate').click(function (){
        let degreeID=$('#txtEditDegreeID').val();
        let degreeName=$('#txtEditDegreeName').val();
        let facultyID=$('#txtEditFacultyID').val();
        let facultyName=$('#txtEditFacultyName').val();

        let dataObj=JSON.stringify({
            "degreeID":degreeID,
            "degreeName":degreeName,
            "facultyID":facultyID,
            "uniName":facultyName
        });
        $.ajax({
            type: "PUT",
            url: baseURL + "degree/update",
            data: dataObj,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            success: function (responce) {
                if(responce){
                    swal("Good job!", "You clicked the button!", "success");
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
    });
});

function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        let select=modal.find('#selectFacultyID');
        let txtFacName=modal.find('#txtFacultyName');

        $.ajax({
            type:"GET",
            url:baseURL+"faculty/getAll",
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                var sel = document.getElementById('selectFacultyID');
                for (i = sel.length - 1; i >= 0; i--) {
                    sel.remove(i);
                }
                for (i in response) {
                    let faculty = response[i];
                    let facultyID = faculty['facultyID'];
                    let facultyName = faculty['facultyName'];
                    let option = "<option>" + facultyID + "</option>";

                    select.append(option);
                    if(i==0){txtFacName.val(facultyName)}
                }
            },error(error) {
                console.log(error);
            }
        })

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
        let txtFacultyID=modal.find('#txtEditFacultyID');
        let txtFacultyName=modal.find('#txtEditFacultyName');

        $.ajax({
            type:"GET",
            url:baseURL+"degree/getDegree/"+degreeID,
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success:function (response) {
                txtDegreeID.val(response['degreeID']);
                txtDegreeName.val(response['degreeName']);
                txtFacultyID.val(response['facultyID']);
                txtFacultyName.val([response['facultyName']]);
            },error(error) {
                console.log(error);
            }
        })

    })
    updateModal.show();
}

$('#selectFacultyID').change(function() {
    let facultyID=$(this).val();
    $.ajax({
        type:"GET",
        url:baseURL+"faculty/getFaculty/"+facultyID,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            $('#txtFacultyName').val(response['facultyName']);
        },
        error:function (error){
            console.log(error);
        }
    });
});

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
                let facultyID=degree['facultyID'];
                let facultyName=degree['facultyName'];

                let row="<tr>\n" +
                    "    <td class=\"p-3\">"+facultyID+"</td>\n" +
                    "    <td class=\"p-3\">"+facultyName+"</td>\n" +
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