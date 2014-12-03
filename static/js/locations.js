/*jslint esnext: true */
/*jslint multistr: true */

require(['jquery', 'api', 'bluebird', 'cookie'], function($, api, Promise){
    
    $('#locationSubmit').click(function(e) {
            
        var locationName = $('#locationName').val(),
            address = $('#locationAddress').val(),
            typeName = $('#locationType').val(),
            groupName = $('#locationGroup').val(),

            newType, newLocation, newGroup, locationData;

        if (!locationName.length || !address.length || !typeName.length) {
            alert('Provide at least name, address and type');
            return;
        }

        Promise.coroutine(function* () {

            locationData = {
                title: locationName,
                buildingName: locationName,
                buildingAddress: address,
                clientId: JSON.parse($.cookie("loggedUser")).id
            };

            if (typeName.length) {
                newType = yield api.createType({
                    data: {
                        name: typeName,
                        model: 'location'
                    }
                });

                locationData.typeId = newType.id;
            }

            newLocation = yield api.addLocation({ data: locationData });

            if (groupName.length)
                newGroup = yield api.createGroup({
                    data: {
                        name: groupName,
                        userIds: [newLocation.id]
                    }
                });

            $('#list').prepend('\
                <li>\
                    <span class="pull-left">\
                    <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle">\
                    </span>\
                    <h3 class="primary-font">'+newLocation.buildingName+'</h3> \
                    <p>'+newLocation.typeId+' - '+newLocation.buildingAddress+'</p>\
                </li>\
            ');

        $('#locationName').val('');
        $('#locationAddress').val('');
        $('#locationType').val('');
        $('#locationGroup').val('');


        })().catch(function(errs) {
            console.log(errs);
        });

    });


    // $('#locationType').textext({
    //     plugins : 'autocomplete ajax',
    //     tagsItems : [],
    //     ajax : {
    //         url : "http://altitude.co:3000/api/types?filter="+
    //             encodeURI(JSON.stringify( {"where": {"model": "location"}, "fields": {"name": true, "created": false}} ))+
    //             "&access_token="+(localStorage.getItem("api.accessToken") || sessionStorage.getItem("api.accessToken")),
    //         dataType : 'json',
    //         cacheResults : true
    //     }
    // });

});