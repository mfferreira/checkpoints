// File: /js/app.js

// 'jquery' returns the jQuery object into '$'
//
// 'bootstrap' does not return an object. Must appear at the end

require(['jquery', 'api', 'bootstrap', 'sb-admin'], function($, api){

	$('.preventclick').click(function(e) {
		e.preventDefault();
	});

	$('#userSubmit').click(function(e) {

		api.addUser(
			$('#firstName').val(),
			$('#lastName').val(),
			$('#email').val(),
			$('#userType').val(),
			$('#userGroup').val()
		);

	});

});
