var setEnable = function(){
	var n = $( "input:checked" ).length;
	if (n > 0){
	
		if (n == 1){
			$("#btnEdit").removeClass("disabled");
		}else{
			$("#btnEdit").addClass("disabled");
		}
		
		$("#btnDelete").removeClass("disabled");
	}else{
		$("#btnEdit").addClass("disabled");
		$("#btnDelete").addClass("disabled");
	}
}

function removeRenderedPart(){
	$('#renderArea').html('');
}

function removeActivedMenu(){
	$("li").removeClass("active");
}

function goToFile(cat){
	window.location = cat + ".html";
}

function loading(e){
	var loading = "";
	loading += '<div id="loader" style="display:block; background-color: #fff;left: 0; top: 0; position:absolute; width:100%;  text-align:center;">';
	loading += '	<img id="loaderImg" src="Assets/Images/loader.gif" title="Loading..."/>';
	loading += '</div>';
	
	if (e == "show"){
		$("body").append(loading);
	}else if (e == "hide"){
		$("#loader").hide({effect: "fade", duration: 300});
		$("#loader").remove();
	}
}

function showMessageAlert(msg){
	var div = "";
	div += '<div class="alert alert-error">';
	div += '  <button type="button" class="close" data-dismiss="alert">&times;</button>';
	div += '  <strong>Error!</strong> ' + msg;
	div += '</div>';
	
	$("#msgArea").html("");
	
	$("#msgArea").append(div);
}

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

function doLogout(){
	writeCookie("sessionId", "", 1);
	writeCookie("username", "", 1);
	writeCookie("password", "", 1);
	writeCookie("isLoggedIn", "", 1);
	writeCookie("Authorization", "", 1);
	
	window.location = "index.html";
}