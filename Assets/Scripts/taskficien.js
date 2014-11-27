var host = 'http://192.168.0.109:8000';
var baseUrlAPI = '/api/v1/';
var apiUrl = host + baseUrlAPI;
var tblId = "idTbl";

var checkBox = "<input type='checkbox' onchange='setEnable()'>";

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
	}
});

var UserView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render', 'renderHeader');
	  
      // create a collection
      this.collection = new Users;
	  
      // Fetch the collection and call render() method
      var that = this;
	  that.renderHeader(["Username","Full Name", "Email", "Last Login"]);
	  
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
		debugger;
		var that = this;
		
		// redeclare
		that.el = $(idTbl);
		
		var rowNum = 1;
		
		_.each(this.collection.toJSON(), function(user){
			debugger;
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
			html += (user.last_login); 
			html += ("</td>");
			html += ("</tr>");
			
			$(that.el).append(html);
			
			rowNum++;
		});
    },

    renderHeader: function(headers) {
        // Fill the html with the template and the collection
		debugger;
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
			
    }
});