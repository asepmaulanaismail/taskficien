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
	$("li").removeClass("active")
}

function users(li){
	removeRenderedPart();
	removeActivedMenu();
	$('#title').text("Users");
	var btnRender = "";
	btnRender += '<button class="btn btn-primary" id="btnAdd" type="button">Add</button>';
	btnRender += '<button class="btn btn-primary disabled" id="btnEdit" type="button">Edit</button>';
	btnRender += '<button class="btn btn-primary disabled" id="btnDelete" type="button">Delete</button>';
						
	$('#btnArea').html(btnRender);
						
	var app = new UserView();
	
	$(li).addClass("active");
}