/*jslint esnext: true */
/*jslint multistr: true */

// File: /js/checkpoints.js

// 'jquery' returns the jQuery object into '$'
//
// 'bootstrap' does not return an object. Must appear at the end

require(['jquery', 'lodash', 'api', 'bluebird', 'cookie', 'typeahead'], function($, _, api, Promise){

    var access_token = JSON.parse($.cookie('loggedUser')).id,
        filter = encodeURI(JSON.stringify({where: {model: 'checkpoint'}})),

        types, statuses, locations, functions;

    var checkpointTypes = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // limit: 10,
        remote: {
            // url points to a json file that contains an array of country names, see
            // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
            url: 'http://altitude.co:3000/api/types?access_token='+access_token+"&filter="+filter,
            // the json file contains an array of strings, but the Bloodhound
            // suggestion engine expects JavaScript objects so this converts all of
            // those strings
            filter: function(list) {
                types = list;
                return $.map(list, function(obj) { return { name: obj.name }; });
            }
        }
    });

    var checkpointStatus = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10,
        remote: {
            // url points to a json file that contains an array of country names, see
            // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
            url: 'http://altitude.co:3000/api/statuses?access_token='+access_token,
            // the json file contains an array of strings, but the Bloodhound
            // suggestion engine expects JavaScript objects so this converts all of
            // those strings
            filter: function(list) {
                statuses = list;
                return $.map(list, function(obj) { return { name: obj.name }; });
            }
        }
    });

    var checkpointLocations = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10,
        remote: {
            // url points to a json file that contains an array of country names, see
            // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
            url: 'http://altitude.co:3000/api/locations?access_token='+access_token,
            // the json file contains an array of strings, but the Bloodhound
            // suggestion engine expects JavaScript objects so this converts all of
            // those strings
            filter: function(list) {
                locations = list;
                return $.map(list, function(obj) { return { name: obj.title }; });
            }
        }
    });

    var checkpointFunctions = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10,
        remote: {
            // url points to a json file that contains an array of country names, see
            // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
            url: 'http://altitude.co:3000/api/checkpointFunctions?access_token='+access_token,
            // the json file contains an array of strings, but the Bloodhound
            // suggestion engine expects JavaScript objects so this converts all of
            // those strings
            filter: function(list) {
                functions = list;
                return $.map(list, function(obj) { return { name: obj.name }; });
            }
        }
    });

    // kicks off the loading/processing of `local` and `prefetch`
    checkpointTypes.initialize();
    checkpointStatus.initialize();
    checkpointLocations.initialize();
    checkpointFunctions.initialize();

    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('#checkpointType').typeahead(null, {
        name: 'checkpointTypes',
        displayKey: 'name',
        // `ttAdapter` wraps the suggestion engine in an adapter that
        // is compatible with the typeahead jQuery plugin
        source: checkpointTypes.ttAdapter()
    });

    $('#checkpointStatus').typeahead(null, {
        name: 'checkpointStatus',
        displayKey: 'name',
        source: checkpointStatus.ttAdapter()
    });

    $('#location').typeahead(null, {
        name: 'location',
        displayKey: 'name',
        source: checkpointLocations.ttAdapter()
    });

    $('#checkpointFunction').typeahead(null, {
        name: 'checkpointFunction',
        displayKey: 'name',
        source: checkpointFunctions.ttAdapter()
    });

    // on submit ...
    $('#checkpointSubmit').click(function(e) {

        var checkpointName = $('#checkpointName').val(),
            checkpointType = $('#checkpointType').val(),
            checkpointStatus = $('#checkpointStatus').val(),
            checkpointFunction = $('#checkpointFunction').val(),
            beaconMajor = $('#beaconMajor').val(),
            beaconMinor = $('#beaconMinor').val(),
            checkpointLocation = $('#location').val(),

            newType, newCheckpoint, checkpointData,
            _checkpointType, _checkpointStatus, _checkpointLocation, _checkpointFunction;

        if (!checkpointName.length || !beaconMajor.length || !beaconMinor.length) {
            alert('Provide at least checkpointName, beaconMajor and beaconMinor');
            return;
        }

        Promise.coroutine(function* () {

            checkpointData = {
                name: checkpointName,
                beaconMajor: beaconMajor,
                beaconMinor: beaconMinor
            };

            if (checkpointType.length) {
                _checkpointType = _.find(types, {name: checkpointType});
                if (!_checkpointType)
                    _checkpointType = yield api.createType({
                        data: {
                            name: checkpointType,
                            model: 'checkpoint'
                        }
                    });

                checkpointData.typeId = _checkpointType.id;
            }

            if (checkpointStatus.length) {
                _checkpointStatus = _.find(statuses, {name: checkpointStatus});
                if (!_checkpointStatus)
                    _checkpointStatus = yield api.createStatus({
                        data: {
                            name: checkpointStatus
                        }
                    });

                checkpointData.statusId = _checkpointStatus.id;
            }

            if (checkpointLocation.length) {
                _checkpointLocation = _.find(locations, {title: checkpointLocation});
                if (!_checkpointLocation)
                    _checkpointLocation = yield api.addLocation({
                        data: {
                            title: checkpointLocation
                        }
                    });

                checkpointData.locationId = _checkpointLocation.id;
            }

            if (checkpointFunction.length) {
                _checkpointFunction = _.find(locations, {name: checkpointFunction});
                if (!_checkpointFunction)
                    _checkpointFunction = yield api.createCheckpointFunction({
                        data: {
                            name: checkpointFunction
                        }
                    });

                checkpointData.functionId = _checkpointFunction.id;
            }

            newCheckpoint = yield api.createCheckpoint({ data: checkpointData });

            $('#list').prepend('\
                <li class="left clearfix">\
                    <span class="chat-img pull-left">\
                        <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle">\
                    </span>\
                    <div class="chat-body clearfix">\
                        <div class="header">\
                            <strong class="primary-font">'+newCheckpoint.name+'</strong>\
                        </div>\
                        <p>\
                            '+_checkpointType.name+' - '+_checkpointFunction.name+'\
                        </p>\
                    </div>\
                </li>\
            ');

            // clear all inputs
            $('#checkpointName').val('');
            $('#checkpointType').val('');
            $('#checkpointStatus').val('');
            $('#checkpointFunction').val('');
            $('#beaconMajor').val('');
            $('#beaconMinor').val('');
            $('#location').val('');


        })().catch(function(errs) {
            console.log(errs);
        });

    });


});
