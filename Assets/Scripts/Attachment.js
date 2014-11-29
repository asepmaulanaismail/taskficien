// Task
var Attachment = Backbone.Model.extend({
    initialize: function(attachment) {
		//debugger;;
		if (attachment != undefined){
			this.task = attachment.task;
			this.attachment_type = attachment.attachment_type;
			this.attachment_file = attachment.attachment_file;
		}
	}
});

var Attachments = Backbone.Collection.extend({
	model: Attachment,
	url: apiUrl + 'attachment/',
	parse: function(response){
		return response.objects;
	},
	// Overwrite the sync method to pass over the Same Origin Policy
	sync: function(method, model, options) {
		var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'jsonp',
				url: that.url,
				processData: false
			}, options);

		return $.ajax(params);
	},
	setParams: function(params){
		this.url = apiUrl + 'attachment/';
		this.url += "?" + params;
	}
});

var AttachmentView = Backbone.View.extend({
    initialize: function(attachmets) {
		////debugger;;
		_.bindAll(this, 'render', 'renderHeader');

		// create a collection

		if (attachmets != undefined){
			this.collection = attachmets;
		}else{
			this.collection = new Attachments();
		}
    },
	
    // Use an extern template
    //template: _.template($("#userTemplate")),

    render: function() {
		removeRenderedPartDetailAttach();
		
        // Fill the html with the template and the collection
		// Fetch the collection and call render() method
		var that = this;
		//that.renderSearch();
		that.renderHeader(["Type","File", "Action"]);

		//fetch all data
		this.collection.fetch({
			success: function(){
				console.log("fetch all data success.");
		
				// redeclare
				that.el = $("#"+tblIdDetailAttach);
				
				var rowNum = 1;
				
				debugger;
				
				if (that.collection.length > 0){
				
				_.each(that.collection.toJSON(), function(attachment){
					var html = "";
					html += ("<tr>");
					html += ("<td>");
					html += (checkBoxDetail);
					html += (id.replace('{0}', attachment.id));
					html += ("</td>");
					html += ("<td>");
					html += (rowNum); 
					html += ("</td>");
					html += ("<td>");
					html += (attachment.attachment_type); 
					html += ("</td>");
					html += ("<td>");
					debugger;
					html += (attachment.attachment_file);
					html += ("</td>");
					html += ("<td>");
					html += ("<input type='button' class='btn btn-success' value='Download' onclick=\"download('" + attachment.attachment_file + "')\" />"); 
					html += ("</td>");
					html += ("</tr>");
					
					$(that.el).append(html);
					
					rowNum++;
				});
				
				}else{
					var html = "";
					html += ("<tr>");
					html += ("<td align=center colspan=5>");
					html += ("Data tidak ditemukan.");
					html += ("</td>");
					html += ("</tr>");
					
					$(that.el).append(html);
				}
			}
		});
    },

    renderHeader: function(headers) {
        // Fill the html with the template and the collection
		debugger;
		var html = "";
		html += ("<table class='table table-hover' id='" + tblIdDetailAttach + "'>");
		html += ("<tr>");
		html += ("<th>");
		html += ("#"); // checkBoxDetailes
		html += ("</th>");
		html += ("<th>");
		html += ("No."); // no.
		html += ("</th>");
		
		_.each(headers, function(text){
			html += ("<th>");
			html += (text);
			html += ("</th>");
		});
		
		html += ("</tr>");
		html += ("</table>");
		$('#renderAreaDetailAttach').append(html);
			
    },
	
	renderSearch: function(){
		var html = "";
		html += ("<table class='table table-hover' id='" + tblIdDetailAttach + "'>");
		html += ("<tr>");
		html += ("<th>");
		html += ("#"); // checkBoxDetailes
		html += ("</th>");
		html += ("<th>");
		html += ("No."); // no.
		html += ("</th>");
		
		_.each(headers, function(text){
			html += ("<th>");
			html += (text);
			html += ("</th>");
		});
		
		html += ("</tr>");
		html += ("</table>");
		$('#serchArea').append(html);
		
	}
});