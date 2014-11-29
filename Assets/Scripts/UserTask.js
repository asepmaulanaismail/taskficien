// UserTask
var UserTask = Backbone.Model.extend({
    initialize: function(userTask) {
		//debugger;;
		if (userTask != undefined){
			this.user = userTask.username;
			this.task = userTask.password;
			this.usertask_status = userTask.first_name;
			this.usertask_note = userTask.last_name;
		}
	}
});

var UserTasks = Backbone.Collection.extend({
	model: UserTask,
	url: apiUrl + 'user_task/',
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
		this.url = apiUrl + 'user_task/';
		this.url += "?" + params;
	}
});

var UserTaskView = Backbone.View.extend({
    initialize: function(users) {
		////debugger;;
		_.bindAll(this, 'render', 'renderHeader');

		// create a collection

		if (users != undefined){
			this.collection = users;
		}else{
			this.collection = new Users();
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
		that.renderHeader(["Task","User", "Status", "Note"]);

		//fetch all data
		this.collection.fetch({
			success: function(){
				console.log("fetch all data success.");
		
				// redeclare
				that.el = $(idTbl);
				
				var rowNum = 1;
				
				_.each(that.collection.toJSON(), function(userTask){
					debugger;
					
					var status = "";
					if (userTask.usertask_status == "D"){
						status = "Done";
					}else if (userTask.usertask_status == "A"){
						status = "Accepted";
					}else if (userTask.usertask_status == "R"){
						status = "Rejected";
					}
					var html = "";
					html += ("<tr>");
					html += ("<td>");
					html += (checkBox);
					html += (id.replace('{0}', userTask.id));
					html += ("</td>");
					html += ("<td>");
					html += (rowNum); 
					html += ("</td>");
					html += ("<td>");
					html += (userTask.task.task_category_name); 
					html += ("</td>");
					html += ("<td>");
					html += (userTask.user.username); 
					html += ("</td>");
					html += ("<td>");
					html += (status); 
					html += ("</td>");
					html += ("<td>");
					html += (userTask.usertask_note); 
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
		
	}
});