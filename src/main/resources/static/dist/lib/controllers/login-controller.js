let txtUserName=$('#txtUserName');
let txtPassword=$('#txtPassword');
$(document).ready(function () {

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



txtPassword.keypress(function (){
    txtPassword.css("border-color","gainsboro");

});
txtUserName.keypress(function (){
    txtUserName.css("border-color","gainsboro");
});

