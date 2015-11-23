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

var Q = require('q');
var fs = require('fs');
var path = require('path');
var jszip = require('jszip');
var request = require('request');
var logger = require('./logger');

var CDNURL = process.env.CHROMEDRIVER_CDNURL || 'http://chromedriver.storage.googleapis.com';
var DEFAULT_VERSION = '2.20';

function getDownloadUrl(platform) {
  console.log(platform);
  return 'http://npm.taobao.org/mirrors/chromedriver/2.20/chromedriver_mac32.zip';
}

module.exports = function(platform) {

  var url = getDownloadUrl(platform);
  var distPath = path.join(__dirname, 'chromedriver');

  logger.info('chromedriver local in %s', distPath);

  return new Promise(function(resolve, reject) {
    request(url)
      .on('error', function(err) {
        return reject(err);
      })
      .pipe(fs.createWriteStream(distPath))
      .on('finish', function() {
        logger.info('chromedriver download finished');

        if (platform != 'win32') {
          var stat = fs.statSync(distPath)
          if (!(stat.mode & 64)) {
            logger.info('Fixed file permissions');
            fs.chmodSync(distPath, '755');
          }
        }
        resolve();
      });
  });
};
