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