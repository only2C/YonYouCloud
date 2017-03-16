/*jslint node:true */

'use strict';

const express = require('express');
const httpProxy = require('http-proxy');
const router = express.Router();
const iwebapProxy = httpProxy.createProxyServer();

module.exports = function (config) {
  var ncBackend = {
    target: 'http://20.1.75.41:6615'/*config.ncUrl*/
  };
  console.log(ncBackend);
  router.all("/iwebap/*", function(req, res) {
    console.log('redirecting to NC');
    iwebapProxy.web(req, res, ncBackend);
  });
  router.all("/portal", function(req, res) {
    console.log('redirecting to NC');
    iwebapProxy.web(req, res, ncBackend);
  });
  router.all("/portal/*", function(req, res) {
    console.log('redirecting to NC');
    iwebapProxy.web(req, res, ncBackend);
  });
  router.all("/lfw/*", function(req, res) {
    console.log('redirecting to NC');
    iwebapProxy.web(req, res, ncBackend);
  });
  return router;
};


