$(document).ready(function () {
    document.getElementById('resultBtn').style.color = "#ffffff";
    var userName = $('#txtUserName').html();
    loadDetails(userName.split("@")[0]);
    getAllResults();
});

function getAllResults() {
    var userName = $('#txtUserName').html();
    let regNo = userName.split("@")[0];
    loadDetails(regNo);

    let tableLevel1 = $('#tableLevel1');
    tableLevel1.empty();

    let tableLevel2 = $('#tableLevel2');
    tableLevel2.empty();

    let tableLevel3 = $('#tableLevel3');
    tableLevel3.empty();

    let tableLevel4 = $('#tableLevel4');
    tableLevel4.empty();

    $.ajax({
        type: "GET",
        url: baseURL + "result/getAllByRegNo/" + regNo,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            for (i in response) {
                let result = response[i];
                let courseID = result['courseID'];
                let courseName = result['courseName'];
                let level = result['level'];
                let credits = result['credits'];
                let grade = result['grade'];

                if (level.valueOf() == 1) {
                    let row = "<tr>\n" +
                        "    <td class=\"p-3\">" + courseID + "</td>\n" +
                        "    <td class=\"p-3\">" + courseName + "</td>\n" +
                        "    <td class=\"p-3\">" + credits + "</td>\n" +
                        "    <td class=\"p-3\">" + grade + "</td>\n" +
                        "</tr>";
                    tableLevel1.append(row);
                } else if (level.valueOf() == 2) {
                    let row = "<tr>\n" +
                        "    <td class=\"p-3\">" + courseID + "</td>\n" +
                        "    <td class=\"p-3\">" + courseName + "</td>\n" +
                        "    <td class=\"p-3\">" + credits + "</td>\n" +
                        "    <td class=\"p-3\">" + grade + "</td>\n" +
                        "</tr>";
                    tableLevel2.append(row);
                } else if (level.valueOf() == 3) {
                    let row = "<tr>\n" +
                        "    <td class=\"p-3\">" + courseID + "</td>\n" +
                        "    <td class=\"p-3\">" + courseName + "</td>\n" +
                        "    <td class=\"p-3\">" + credits + "</td>\n" +
                        "    <td class=\"p-3\">" + grade + "</td>\n" +
                        "</tr>";
                    tableLevel3.append(row);
                } else if (level.valueOf() == 4) {
                    let row = "<tr>\n" +
                        "    <td class=\"p-3\">" + courseID + "</td>\n" +
                        "    <td class=\"p-3\">" + courseName + "</td>\n" +
                        "    <td class=\"p-3\">" + credits + "</td>\n" +
                        "    <td class=\"p-3\">" + grade + "</td>\n" +
                        "</tr>";
                    tableLevel4.append(row);
                }

            }
        }
    })
}
