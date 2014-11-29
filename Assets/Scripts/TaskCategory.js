// Task Category
var TaskCategory = Backbone.Model.extend({
    initialize: function(task) {
		//debugger;;
		if (task != undefined){
			this.task_category_name = task.task_category_name;
			this.task_category_type = task.task_category_type;
			this.task_category_start_time = task.task_category_start_time;
			this.task_category_end_time = task.task_category_end_time;
		}
	}
});

var TasksCategory = Backbone.Collection.extend({
	model: TaskCategory,
	url: apiUrl + 'task_category/',
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
		this.url = apiUrl + 'task_category/';
		this.url += "?" + params;
	}
});

var TaskCategoryView = Backbone.View.extend({
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
		removeRenderedPart();
		
        // Fill the html with the template and the collection
		// Fetch the collection and call render() method
		var that = this;
		//that.renderSearch();
		that.renderHeader(["Name","Type", "Start Time", "End Time", "Action"]);

		//fetch all data
		this.collection.fetch({
			success: function(){
				console.log("fetch all data success.");
		
				// redeclare
				that.el = $(idTbl);
				
				var rowNum = 1;
				
				_.each(that.collection.toJSON(), function(taskCategory){
					var html = "";
					html += ("<tr>");
					html += ("<td>");
					html += (checkBox);
					html += (id.replace('{0}', taskCategory.id));
					html += ("</td>");
					html += ("<td>");
					html += (rowNum); 
					html += ("</td>");
					html += ("<td>");
					html += (taskCategory.task_category_name); 
					html += ("</td>");
					html += ("<td>");
					html += ((taskCategory.task_category_type == "S")? "Scheduled": "Incidental");
					html += ("</td>");
					html += ("<td>");
					html += (taskCategory.task_category_start_time); 
					html += ("</td>");
					html += ("<td>");
					html += (taskCategory.task_category_end_time); 
					html += ("</td>");
					html += ("<td>");
					html += ("<input type='button' class='btn btn-success' value='Add details' onclick='openDetail(" + taskCategory.id + ")' />"); 
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
		html += ("<table class='table table-hover' id='" + tblId + "'>");
		html += ("<tr>");
		html += ("<th>");
		html += ("#"); // checkboxes
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
		$('#renderArea').append(html);
			
    },
	
	renderSearch: function(){
		var html = "";
		html += ("<table class='table table-hover' id='" + tblId + "'>");
		html += ("<tr>");
		html += ("<th>");
		html += ("#"); // checkboxes
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
		
	},
	
	renderCombo: function(id){
		var that = this;
		this.collection.fetch({
			success: function(){					
				_.each(that.collection.toJSON(), function(taskCategory){
				debugger;
					var html = "";
					html += ("<option value='" + taskCategory.id + "'>");
					html += (taskCategory.task_category_name);
					html += ("</option>");
					
					$("#" + id).append(html);
				});
			}
		});
		
	}
});