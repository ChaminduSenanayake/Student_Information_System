$(document).ready(function () {
    document.getElementById('examBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();
    loadDetails(userName.split("@")[0]);
    getExams();
});

function getExams(){
    let regNo=$('#txtUserName').html().split("@")[0];
    let examTable=$('#examTable');
    examTable.empty();
    $.ajax({
        type:"GET",
        url:baseURL+"studentExam/getExamsByRegNo/"+regNo,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success:function (response){
            for(i in response){
                let courseRegistration=response[i];
                let courseID=courseRegistration['courseID'];
                let courseName=courseRegistration['courseName'];
                let level=courseRegistration['level']
                let semester=courseRegistration['semester'];
                let credits=courseRegistration['credits'];

                let row="<tr>\n" +
                    "<td class=\"p-3\">"+courseID+"</td>\n" +
                    "<td class=\"p-3\">"+courseName+"</td>\n" +
                    "<td class=\"p-3\">"+level+"</td>\n" +
                    "<td class=\"p-3\">"+semester+"</td>\n" +
                    "<td class=\"p-3\">"+credits+"</td>\n" +
                    "</tr>";
                examTable.append(row);
            }
        }
    })
}