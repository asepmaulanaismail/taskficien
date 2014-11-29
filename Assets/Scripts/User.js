// User
var User = Backbone.Model.extend({
    initialize: function(user) {
		//debugger;;
		if (user != undefined){
			this.username = user.username;
			this.password = user.password;
			this.first_name = user.first_name;
			this.last_name = user.last_name;
			this.email = user.email;
		}
	}
});

var Users = Backbone.Collection.extend({
	model: User,
	url: apiUrl + 'user/',
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
		this.url = apiUrl + 'user/';
		this.url += "?" + params;
	}
});

var UserView = Backbone.View.extend({
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
		that.renderHeader(["Username","Name", "Email", "Role", "Action"]);

		//fetch all data
		this.collection.fetch({
			success: function(){
				console.log("fetch all data success.");
		
				// redeclare
				that.el = $(idTbl);
				
				var rowNum = 1;
				
				_.each(that.collection.toJSON(), function(user){
					var html = "";
					html += ("<tr>");
					html += ("<td>");
					if (user.username != "admin"){
						html += (checkBox);
					}
					html += (id.replace('{0}', user.id));
					html += ("</td>");
					html += ("<td>");
					html += (rowNum); 
					html += ("</td>");
					html += ("<td>");
					html += (user.username); 
					html += ("</td>");
					html += ("<td>");
					html += (user.first_name + " " + user.last_name);
					html += ("</td>");
					html += ("<td>");
					html += (user.email); 
					html += ("</td>");
					html += ("<td>");
					html += (user.is_superuser == true)? "Admin" : "Staff"; 
					html += ("</td>");
					html += ("<td>");
					
					if (user.username != "admin"){
						html += ("<input class='btn btn-success' type='button' value='" + ((user.is_superuser != true)? "Make as admin" : "Cancel admin") + "' onClick='toogleAdmin(this, " + user.id + ", "+ ((user.is_superuser != true)? "true" : "false") +")' />"); 
					}
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
				_.each(that.collection.toJSON(), function(user){
				debugger;
					var html = "";
					html += ("<option value='" + user.id + "'>");
					html += (user.username);
					html += ("</option>");
					
					$("#" + id).append(html);
				});
			}
		});
		
	}
});