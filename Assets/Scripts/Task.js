// Task
var Task = Backbone.Model.extend({
    initialize: function(task) {
		//debugger;;
		if (task != undefined){
			this.task_category = task.task_category;
			this.task_name = task.task_name;
			this.task_description = task.task_description;
			this.task_manual = task.task_manual;
			this.task_note = task.task_note;
		}
	}
});

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: apiUrl + 'task/',
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
		this.url = apiUrl + 'task/';
		this.url += "?" + params;
	}
});

var TaskView = Backbone.View.extend({
    initialize: function(tasks) {
		////debugger;;
		_.bindAll(this, 'render', 'renderHeader');

		// create a collection

		if (tasks != undefined){
			this.collection = tasks;
		}else{
			this.collection = new Tasks();
		}
    },
	
    // Use an extern template
    //template: _.template($("#userTemplate")),

    render: function() {
		removeRenderedPartDetail();
		
        // Fill the html with the template and the collection
		// Fetch the collection and call render() method
		var that = this;
		//that.renderSearch();
		that.renderHeader(["Name","Category", "Description", "Action"]);

		//fetch all data
		this.collection.fetch({
			success: function(){
				console.log("fetch all data success.");
		
				// redeclare
				that.el = $(idTblDetail);
				
				var rowNum = 1;
				
				_.each(that.collection.toJSON(), function(task){
					var html = "";
					html += ("<tr>");
					html += ("<td>");
					html += (checkBoxDetail);
					html += (id.replace('{0}', task.id));
					html += ("</td>");
					html += ("<td>");
					html += (rowNum); 
					html += ("</td>");
					html += ("<td>");
					html += (task.task_name); 
					html += ("</td>");
					html += ("<td>");
					debugger;
					html += (task.task_category.task_category_name);
					html += ("</td>");
					html += ("<td>");
					html += (task.task_description); 
					html += ("</td>");
					html += ("<td>");
					html += ("<input type='button' class='btn btn-success' value='View attachments' onclick='openAttachments(" + task.id + ")' />"); 
					html += ("</td>");
					html += ("</tr>");
					
					$(that.el).append(html);
					
					rowNum++;
				});
			}
		});
    },

    renderHeader: function(headers) {
        // Fill the html with the template and the collection
		var html = "";
		html += ("<table class='table table-hover' id='" + tblIdDetail + "'>");
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
		$('#renderAreaDetail').append(html);
			
    },
	
	renderSearch: function(){
		var html = "";
		html += ("<table class='table table-hover' id='" + tblIdDetail + "'>");
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