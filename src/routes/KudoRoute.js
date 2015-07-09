'use strict';

var React = require('react');

var KudoPage = require('../components/pages/KudoPage.js');

module.exports = function(params) {

  return new Promise(function(resolve, reject) {
    resolve({
      title: "Kudo",
      header: "",
      element: React.createElement(KudoPage, params)
    });
  });

}