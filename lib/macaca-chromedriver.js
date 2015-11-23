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
var logger = require('./logger');
var cp = require('child_process');
var install = require('./install');

function getPlatform() {
  var platform = process.platform;

  if (platform === 'linux') {
    if (process.arch === 'x64') {
      platform += '64';
    } else {
      platform += '32';
    }
  } else if (platform === 'darwin') {
    platform = 'mac32';
  } else if (platform !== 'win32') {
    console.log('Unexpected platform or architecture:', process.platform, process.arch);
    process.exit(1);
  }

  return platform;
}

var chromedriver;

exports.version = '2.20';

exports.start = function() {
  var platform = getPlatform();
  var distPath = path.join(__dirname, 'chromedriver');

  if (platform === 'win32') {
    distPath += '.exe';
  }

  chromedriver = cp.execFile(distPath);
  return chromedriver;
};

exports.stop = function () {
  if (chromedriver){
    chromedriver.kill();
    logger.info('chromedriver killed');
  }
};

exports.install = function() {
  var platform = getPlatform();
  install(platform);
};
