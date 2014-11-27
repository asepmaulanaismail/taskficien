// User
var User = Backbone.Model.extend({
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
    initialize: function(url) {
		if (url != undefined)
			this.url = url;
	}
});

var UserView = Backbone.View.extend({
    initialize: function(params) {
		_.bindAll(this, 'render', 'renderHeader');

		// create a collection

		if (params == undefined){
			this.collection = new Users();
		}else{
			this.collection = new Users(apiUrl + 'user/?' + params);
		}

		// Fetch the collection and call render() method
		var that = this;
		//that.renderSearch();
		that.renderHeader(["Username","Name", "Email", "Is Staff"]);

		this.collection.fetch({
			success: function () {
				that.render();
			}
		});
    },
    // Use an extern template
    //template: _.template($("#userTemplate")),

    render: function() {
        // Fill the html with the template and the collection
		var that = this;
		
		// redeclare
		that.el = $(idTbl);
		
		var rowNum = 1;
		
		_.each(this.collection.toJSON(), function(user){
			var html = "";
			html += ("<tr>");
			html += ("<td>");
			html += (checkBox);
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
			html += (user.is_staff); 
			html += ("</td>");
			html += ("</tr>");
			
			$(that.el).append(html);
			
			rowNum++;
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