'use strict';

var _     = require('lodash');
var fs      = require('fs');
var express = require('express');
var React   = require('react');

var port = process.env.PORT || 9000;
var server = express();

var App = require('./build/app.js');

var apiManager = require('./build/api.js');

// TODO: Cache all HTML
// var indexHtml = fs.readFileSync('./index.html', { encoding: 'utf-8' });

console.log('\n\n### ROUTES\n');

global.app = new App();
global.app.routes.forEach(function(route) {

  console.log("Adding route: "+route.path);
  server.get(route.path, function(req, res) {
    console.log("Following route %s",route.path, req.params);
    // Routes return a promise for a React element
    route.controller.apply(global.app, [req.params, req.query])
      .then(function(route_payload) {
        var payload = _.extend({}, App.defaults().route_payload, route_payload);
        // render the ReactElement returned by the controller to
        // a static HTML string. This is our page content.
        var elementHtml = React.renderToStaticMarkup(payload.element);
        // replace token values in the source HTML file

        // TODO: after caching HTML above, change this line
        var html = fs.readFileSync('./index.html', { encoding: 'utf-8' })
          .replace('{{HEAD}}',    payload.header)
          .replace('{{CONTENT}}', elementHtml);
        res.setHeader('Content-Type','text/html');
        res.send(html);
      })
      .catch(function(err) {
        throw err;
      });
  });

});

console.log('\n\n### API PATHS\n');

apiManager.routes.forEach(function(handler) {

  console.log("Adding API path: ", handler.path);

});

console.log('\nServing static assets at /public');
server.use('/public', express.static('./public'));
server.use('/public', express.static('./build/public'));

server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

console.log("\nServer started successfully, listening on port %d", port);
server.listen(port);