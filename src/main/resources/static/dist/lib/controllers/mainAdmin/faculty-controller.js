$(document).ready(function () {
    document.getElementById('facultyBtn').style.color = "#4FB3A1";
});


function openAddNewModal() {
    let addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'));
    $('#addNewModal').on('show.bs.modal', function(event) {
        let modal = $(this);
        $.ajax({
            type:"GET",
            url:baseURL+"faculty/getNewID",
            success:function (response){
                modal.find('#txtFacultyID').val(response);
            },
            error:function (error){
                console.log(error);
            }
        })

    });
    addNewModal.show();
}

function loadUniCodes(){
    // <option value="3">Three</option>
}
