define(['sessionstorage', 'lodash', 'cookie'], function(sessionstorage, _){

    function apiCall(args) {

        var loggedUser = JSON.parse($.cookie("loggedUser")),
            apiCookie = JSON.parse($.cookie("api"));

        var url = "http://"+apiCookie.host+":"+apiCookie.port+"/api/"+args.api;
            url += (args.auth || args.auth === undefined ? "?access_token="+loggedUser.id : "");

        if (args.filter)
            url += "&filter="+encodeURI(JSON.stringify(args.filter));

        // manipulate data based on operation type
        switch (args.type) {
            case 'POST':
                if (loggedUser) _.extend(args.data, {createdBy: loggedUser.userId}); // login wont have cache
                break;
            // case 'PUT':
            //     // append a new edit
            //     _.extend(args.data, {edits: {userId: loggedUser.userId, timestamp: (new Date()).valueOf()} });
            //     break;
        }

        return $.ajax({
            type: args.type,
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(args.data),
            statusCode: args.statusCode,
            success: function(res) {
                console.log(res);
                if (args.successCallback) args.successCallback(res);
            },
            error: function(res) {
                console.error(res);
                if (args.errorCallback) args.errorCallback(res);
            }
        });
    }

    var api = {

        signup: function(args, successCallback) {
            console.log("signup starting");

            if (!args.data || !args.data.email) {
                console.log('ERROR: email or password is empty');
                return;
            }

            return apiCall({
                type: "POST",
                api: 'users',
                successCallback: successCallback,
                auth: false,
                data: args.data
            });
        },


        createType: function(args/*name, model*/, successCallback) {
            console.log("createType starting");

            return apiCall({
                type: "POST",
                api: 'types',
                successCallback: successCallback,
                data: args.data
            });
        },

        getOneType: function(args/*name, model*/) {
            console.log("getOneType starting");

            return $.get("http://altitude.co:3000/api/types/findOne", {
                where: {
                    model: args.model,
                    name: args.name
                }
            });
        },

        createGroup: function(args, successCallback) {
            console.log("createGroup starting");

            return apiCall({
                type: "POST",
                api: 'groups',
                successCallback: successCallback,
                data: args.data
            });
        },

        // Add user function
        addUser: function(firstName, lastName, email, userType, userGroup) {
            console.log("adding user");

            var createUser = function(typeId, next) {
                console.log("creating user account with blank password");
                api.signup({
                    data: {
                        email: email,
                        password: "", // blank until user sets it
                        firstName: firstName,
                        lastName: lastName,
                        typeId: typeId
                    }
                }, next);
            };

            var createType = function(next) {
                console.log("creating type");
                api.createType({
                    data: {
                        name: userType,
                        model: 'user'
                    }
                }, next);
            };

            var createGroup = function(userId, next) {
                console.log("creating group");
                api.createGroup({
                    data: {
                        name: userGroup,
                        userIds: [userId]
                    }
                }, next);
            };


            if (userType) {
                createType(function(res){
                    createUser(res.id, function(res){
                        if (userGroup) {
                            createGroup(res.id);
                        }
                    });
                });
            }
            else {
                createUser(function(res){
                    if (userGroup) {
                        createGroup(res.id);
                    }
                });
            }

        },

        // get a list of all users
        getUsers: function(successCallback) {
            console.log("getting users");

            return apiCall({
                type: "GET",
                api: 'users',
                successCallback: successCallback
            });
        },

        // Add Location function
        addLocation: function(args, successCallback) {
            console.log("adding location");

            return apiCall({
                type: "POST",
                api: 'locations',
                successCallback: successCallback,
                data: args.data
            });
        },

        createStatus: function(args/*name, model*/, successCallback) {
            console.log("createStatus starting");

            return apiCall({
                type: "POST",
                api: 'statuses',
                successCallback: successCallback,
                data: args.data
            });
        },

        createCheckpoint: function(args/*name, model*/, successCallback) {
            console.log("createCheckpoint starting");

            return apiCall({
                type: "POST",
                api: 'checkpoints',
                successCallback: successCallback,
                data: args.data
            });
        },

        createCheckpointFunction: function(args/*name, model*/, successCallback) {
            console.log("createCheckpointFunction starting");

            return apiCall({
                type: "POST",
                api: 'checkpointFunctions',
                successCallback: successCallback,
                data: args.data
            });
        },

    };

    return api;

});
