loadUni();

function loadUni() {
    let cardset = $('#cardset');
    cardset.empty();
    $.ajax({
        type: "GET",
        url: baseURL + "university/getAll",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            if(response.length==0){
                location.href= baseURL+"login/";
            }else{
                for (i in response) {
                    let university = response[i];
                    let uniCode = university['uniCode'];
                    let uniName = university['uniName'];
                    let imagePath = university['imagePath'];

                    let card = " <div id=\"" + uniCode + "\" onclick=\"openLoginWindow(this.id)\" class=\"col-sm-3 py-2\">\n" +
                        "            <div class=\"card card-body h-200\">\n" +
                        "                <img class=\"rounded mx-auto d-block\" id=\"img_" + uniCode + "\">\n" +
                        "                <h4>" + uniName + "</h4>\n" +
                        "            </div>\n" +
                        "        </div>";
                    cardset.append(card);
                    $('#img_' + uniCode).attr("src", imagePath);
                }
            }

        }
    });
}




function openWindow(tabName) {
    location.href= baseURL+"homepage/"+tabName;
    return false;
}
function openLoginWindow() {
    location.href= baseURL+"login/";
    return false;
}
