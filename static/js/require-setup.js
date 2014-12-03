// file: js/require-setup.js
//
// Declare this variable before loading RequireJS JavaScript library
// To config RequireJS after it’s loaded, pass the below object into require.config();

var require = {
    shim : {
        "bootstrap" : { "deps": ['jquery'] },
        "metisMenu" : { "deps": ['jquery'] },
        "textext.core": { "deps": ['jquery'] },
        "textext.tags": { "deps": ['textext.core'] },
        "textext.autocomplete": { "deps": ['textext.core'] },
        "textext.suggestions": { "deps": ['textext.core'] },
        "textext.filter": { "deps": ['textext.core'] },
        "textext.focus": { "deps": ['textext.core'] },
        "textext.prompt": { "deps": ['textext.core'] },
        "textext.ajax": { "deps": ['textext.core'] },
        "textext.arrow": { "deps": ['textext.core'] },
        "typeahead": { "deps": ['jquery'] },
    },
    paths: {
        "jquery": [
            "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
            "jquery-1.11.0"
        ],
        "bootstrap": [
            "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min",
            "plugins/bootstrap.min"
        ],
        "metisMenu": "plugins/metisMenu/metisMenu.min",
        "raphael": [
            "//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min",
            "plugins/morris/raphael.min"
        ],
        "morris": "plugins/morris/morris",
        "morris-data": "plugins/morris/morris-data",
        "sb-admin": "plugins/sb-admin-2",
        "sessionstorage": "plugins/sessionstorage.min",
        "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min",
        "api": "api",

        // "textext.core": "plugins/textext/textext.core",
        // "textext.tags": "plugins/textext/textext.plugin.tags",
        // "textext.autocomplete": "plugins/textext/textext.plugin.autocomplete",
        // "textext.suggestions": "plugins/textext/textext.plugin.suggestions",
        // "textext.filter": "plugins/textext/textext.plugin.filter",
        // "textext.focus": "plugins/textext/textext.plugin.focus",
        // "textext.prompt": "plugins/textext/textext.plugin.prompt",
        // "textext.ajax": "plugins/textext/textext.plugin.ajax",
        // "textext.arrow": "plugins/textext/textext.plugin.arrow",

        "typeahead": "plugins/typeahead.bundle.min",
        "cookie": [
            "//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min",
            "plugins/jquery.cookie"
        ],

        "traceur": "https://google.github.io/traceur-compiler/bin/traceur",
        "traceurBootstrap": "https://google.github.io/traceur-compiler/src/bootstrap",
        "bluebird": "plugins/bluebird"
    }
};
