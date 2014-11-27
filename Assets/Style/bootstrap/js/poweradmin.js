function addRow(tblId){
	var row = "";
	row += "<tr>";
	row += "<td>";
	row += "<select name='product[]' onchange='javascript: setPrice($(this).val(), this);' required>";
	row += $("#products").clone().html();
	// row += "<option value=''>-- SELECT --</option>";
	// row += "<option value='1'>Product1</option>";
	row += "<select>";
	row += "</td>";
	row += "<td>";
	row += "<input type='text' name='quantity[]' required onchange='javascript: getTotalPrice(this);' value='0' style='text-align:right'/>";
	row += "</td>";
	row += "<td>";
	row += "<input type='text' name='price[]' required readonly value='0' style='text-align:right'/>";
	row += "</td>";
	row += "<td valign=top>";
	row += "<input type='text' name='totalPrice' required readonly value='0' style='text-align:right'/>&nbsp;&nbsp;&nbsp;";
	row += "<input type='button' name='btnRemove' class='btn btn-danger' value='X' onclick='javascript: removeThisRow(this);' title='Remove this row'/>";
	row += "</td>";
	row += "</tr>";
	$("#" + tblId).append(row);
}

function removeThisRow(btn){
	$(btn).parent().parent().remove();
	setTotal();
}

function setPrice(productId, select){
	var price = $("#"+productId).val();
	$(select).parent().next().next().children().val(price);
	
	var qtyElement = $(select).parent().next().children();
	var qty = $(qtyElement).val();
	var price = $(qtyElement).parent().next().children().val();	
	$(qtyElement).parent().next().next().children().val(qty*price);	
	setTotal();
}

function getTotalPrice(qtyElement){
	var qty = $(qtyElement).val();
	var price = $(qtyElement).parent().next().children().val();	
	$(qtyElement).parent().next().next().children().first().val(qty*price);	
	setTotal();
}

function setTotal(){
	var discount = $("[name=salesDiscount]").val();
	var totalPrices = $("[name=totalPrice");
	var total = 0;
	for(var i=0; i<totalPrices.length; i++){
		total += parseInt($(totalPrices[i]).val());
	}
	$("#total").text(total - ((total*discount)/100));
}

function changeDiscount(){
	setTotal();
	$("#discount").text($("[name=salesDiscount]").val() + "%");
}