require(['jquery', 'sessionstorage', 'api'], function($, sessionstorage, api){
    
    // fetch all users and display them on the page
    api.getUsers(function(users){
        for (var i=users.length; i--;) {
            var user = users[i];
            $('#listUsers').prepend('<li>\
                <span class="pull-left">\
                    <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle">\
                </span>\
                <h3 class="primary-font">'+ user.firstName +' '+ user.lastName +'</h3>\
                <p>'+ user.email +'</p>\
            </li>');
        }
    });
    
});