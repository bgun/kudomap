'use strict';

var _     = require('lodash');
var page  = require('page');
var React = require('react');

var App = require('./app.js');

(function() {

  global.app = new App();

  global.app.routes.forEach(function(route) {
    console.log("Adding route: "+route.path);
    page(route.path, function(ctx) {
      console.log("Following route %s",route.path, ctx.params);
      // Routes return a promise for a React element
      route.controller.call(global.app, ctx.params)
        .then(function(route_payload) {
          var payload = _.extend({}, App.defaults().route_payload, route_payload);
          React.render(payload.element, document.getElementById('page'));
        });
    });
  });

  console.log("Starting client at route %s", document.location.pathname);
  page();

})();