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

var path = require('path');
var utils = require('./utils');
var Proxy = require('./proxy');
var logger = require('./logger');
var cp = require('child_process');
var install = require('./install');
var SP = require('./spawn-promise');

exports.version = '2.20';

var fileName = exports.fileName = utils.getPlatform() === 'win32' ? 'chromedriver.exe' : 'chromedriver';

var binPath = exports.binPath = path.join(__dirname, fileName);

var chromedriver = exports.chromedriver = null;

exports.start = function() {
  chromedriver = cp.execFile(binPath);
  return chromedriver;
};

exports.stop = function () {
  if (chromedriver){
    chromedriver.kill();
    logger.info('chromedriver killed');
  }
};

exports.install = function() {
  install();
};

function ChromeDriver(options) {
  this.proxyHost = options.proxyHost;
  this.proxyPort = options.proxyPort;
  this.chromedriver = null;
  this.proxy = null;
}

ChromeDriver.prototype.startPorxy = function() {
  this.proxy = new Proxy();
};

ChromeDriver.prototype.start = function() {

};

exports.ChromeDriver = ChromeDriver;
