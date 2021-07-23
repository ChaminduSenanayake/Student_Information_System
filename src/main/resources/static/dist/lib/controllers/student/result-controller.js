$(document).ready(function () {
    document.getElementById('resultBtn').style.color = "#ffffff";
    var userName=$('#txtUserName').html();
    loadDetails(userName.split("@")[0]);
});