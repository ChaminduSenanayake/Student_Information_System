let txtUserName=$('#txtUserName');
let txtPassword=$('#txtPassword');
$(document).ready(function () {
    loadUni();


    $("#loginBtn").click(function (event){
        let dataObj =JSON.stringify({
            'userName':txtUserName.val(),
            'password':txtPassword.val()

        });
        $.ajax({
                type: "POST",
                url: baseURL + "login/validate",
                data: dataObj,
                dataType: 'json',
                contentType:'application/json; charset=utf-8',
                success: function (response) {
                    if (response['userName']==null && response['password']==null ){
                        txtUserName.css("border-color","#D44A4A")
                        txtUserName.val("Invalid User");
                        txtUserName.select();
                        txtPassword.val("");
                    }else if(response['userName']!=null && response['password']==null){
                        txtPassword.css("border-color","#D44A4A")
                        txtPassword.val("Invalid Password");
                        txtPassword.select();
                    }else{
                        location.href=response['url'];
                    }

                },
                error: function (error) {
                    console.log(error);
                }
            }
        )
    });


});

function loadUni() {
    let cardset = $('#cardset');
    cardset.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "university/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if(response==null){
                location.href= baseURL+"login/"+0;
            }else{
                for (i in response) {
                    let university = response[i];
                    let uniCode = university['uniCode'];
                    let uniName = university['uniName'];
                    let imagePath = university['imagePath'];
                    let card = " <div id=\"" + uniCode + "\" onclick=\"openLoginWindow(this.id)\" class=\"col-sm-3 py-2\">\n" +
                        "            <div class=\"card card-body h-200\">\n" +
                        "                <img class=\"rounded mx-auto d-block\" id=\"img_" + uniCode + "\">\n" +
                        "                <p>" + uniName + "</p>\n" +
                        "            </div>\n" +
                        "        </div>";
                    cardset.append(card);
                    $('#img_' + uniCode).attr("src", imagePath);
                }
            }

        }
    });
}

function openLoginWindow(uniCode) {
    sessionStorage.setItem("uniCode",uniCode);
    location.href= baseURL+"login/";
}


txtPassword.keypress(function (){
    txtPassword.css("border-color","gainsboro");

});
txtUserName.keypress(function (){
    txtUserName.css("border-color","gainsboro");
});