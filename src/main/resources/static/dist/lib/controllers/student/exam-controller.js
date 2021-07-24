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
                let examID=courseRegistration['examID']
                let date=courseRegistration['date'];
                let startTime=courseRegistration['startTime'];
                let endTime=courseRegistration['endTime'];

                let row="<tr>\n" +
                    "<td class=\"p-3\">"+courseID+"</td>\n" +
                    "<td class=\"p-3\">"+courseName+"</td>\n" +
                    "<td class=\"p-3\">"+examID+"</td>\n" +
                    "<td class=\"p-3\">"+date+"</td>\n" +
                    "<td class=\"p-3\">"+startTime+"</td>\n" +
                    "<td class=\"p-3\">"+endTime+"</td>\n" +
                    "</tr>";
                examTable.append(row);
            }
        }
    })
}