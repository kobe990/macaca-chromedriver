/* ================================================================
 * macaca-chromedriver by xdf(xudafeng[at]126.com)
 *
 * first created at : Fri Sep 11 2015 00:49:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var logger = require('./logger');
var request = require('request');

function Proxy(proxyHost, proxyPort) {
  this.proxyHost = proxyHost;
  this.proxyPort = proxyPort;
  this.init();
}

Proxy.prototype.init = function() {
  
};

Proxy.prototype.command = function(url, method, body) {
  
};

module.exports = Proxy;
