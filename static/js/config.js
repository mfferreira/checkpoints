System.config({
  "baseURL": "/js",
  "paths": {
    "*": "*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "jquery": "github:components/jquery@^2.1.1",
    "lodash": "npm:lodash-node@^2.4.1",
    "npm:lodash-node@2.4.1": {},
    "github:jspm/nodelibs@0.0.2": {
      "json": "github:systemjs/plugin-json@master",
      "inherits": "npm:inherits@^2.0.1",
      "Base64": "npm:Base64@0.2",
      "base64-js": "npm:base64-js@^0.0.4",
      "ieee754": "npm:ieee754@^1.1.1"
    },
    "npm:Base64@0.2.1": {},
    "npm:ieee754@1.1.3": {},
    "npm:base64-js@0.0.4": {},
    "npm:inherits@2.0.1": {},
    "bluebird": "plugins/bluebird",
    "cookie": "plugins/jquery.cookie",
    "metisMenu": "plugins/metisMenu/metisMenu",
    "sb-admin": "plugins/sb-admin-2",
    "sessionstorage": "plugins/sessionstorage.min",
    "typeahead": "plugins/typeahead.bundle.min",
    "morris": "plugins/morris/morris",
    "morris-data": "plugins/morris/morris-data",
    "bootstrap": "github:twbs/bootstrap@^3.2.0",
    "github:twbs/bootstrap@3.2.0": {
      "css": "github:systemjs/plugin-css@^0.1.0",
      "jquery": "github:components/jquery@^2.1.1"
    },
    // "raphael": "github:DmitryBaranovskiy/raphael@^2.1.2"
    "raphael": "plugins/morris/raphael.min"
  }
});

System.config({
  "versions": {
    "github:components/jquery": "2.1.1",
    "npm:lodash-node": "2.4.1",
    "github:jspm/nodelibs": "0.0.2",
    "github:systemjs/plugin-json": "master",
    "npm:inherits": "2.0.1",
    "npm:Base64": "0.2.1",
    "npm:base64-js": "0.0.4",
    "npm:ieee754": "1.1.3",
    "github:twbs/bootstrap": "3.2.0",
    "github:systemjs/plugin-css": "0.1.0",
    // "github:DmitryBaranovskiy/raphael": "2.1.2"
  }
});

