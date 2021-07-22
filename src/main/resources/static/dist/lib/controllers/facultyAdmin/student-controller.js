var facultyID;
var facultyName;
var uniCode;
var uniName;
$(document).ready(function () {
    document.getElementById('studentBtn').style.color = "#ffffff";
    var userName=$(txtUserName).html();
    getFacultyAdmin(userName);

    // DatePicker
    $(".date").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
    });
    var d = new Date();
    let txtYear=$('#txtYear');
    txtYear.val(d.getFullYear());

    $("#studentTable tr").filter(function() {
        date.toggle(date.text().toLowerCase().indexOf(value) > -1)
    });


    // Table Search year
    $("#txtYear").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#studentTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        if(value==""){
            getAllStudents();
        }
    });

    $('#btnSearch').click(function (){
        $('#btnSearch').html("<i class=\"fas fa-search\"></i> Search");
        $('#btnSearch').css("background-color","#3B9B76");
        $('#search').val(null);
        getAllFaculties();
    })





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
    let year=$('#txtYear').val();
    if(year==""){
        swal("OOps!", "Select year before add student!", "error");
    }else{
        $('#addNewModal').on('show.bs.modal', function(event) {
            let modal = $(this);

            $.ajax({
                type:"GET",
                url:baseURL+"degree/getAll",
                dataType:'json',
                contentType: 'application/json; charset=utf-8',
                success:function (response) {
                    let sel = document.getElementById('selectDegreeID');
                    let select=$('#selectDegreeID');
                    for (i = sel.length - 1; i >= 0; i--) {
                        sel.remove(i);
                    }
                    for (i in response) {
                        let degree = response[i];
                        let degreeID = degree['degreeID'];
                        let degreeName = degree['degreeName'];
                        let option = "<option>" + degreeID + "</option>";

                        select.append(option);
                        if(i==0){$('#txtDegreeName').val(degreeName)}
                    }
                },error(error) {
                    console.log(error);
                }
            })

            $.ajax({
                type:"GET",
                url:baseURL+"student/getNewIndex/"+uniCode,
                success:function (response){
                    modal.find('#txtIndexNo').val(response);
                },
                error:function (error){
                    console.log(error);
                }
            })

            $.ajax({
                type:"GET",
                url:baseURL+"student/getNewRegistrationNo/"+year,
                success:function (response){
                    modal.find('#txtRegistrationNo').val(response);
                },
                error:function (error){
                    console.log(error);
                }
            })

        })
        addNewModal.show();
    }

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

$('#selectDegreeID').change(function() {
    let degreeID = $(this).val();
    $.ajax({
        type: "GET",
        url: baseURL + "degree/getDegree/" + degreeID,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#txtDegreeName').val(response['degreeName']);
        },
        error: function (error) {
            console.log(error);
        }
    });
});



