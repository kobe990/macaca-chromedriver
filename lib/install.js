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
var util = require('util');
var JSZip = require("jszip");
var request = require('request');
var logger = require('./logger');
var chromedriver = require('./macaca-chromedriver');

var CDNURL = process.env.CHROMEDRIVER_CDNURL || 'http://chromedriver.storage.googleapis.com';

function getDownloadUrl(platform) {
  var url = util.format('%s/%s/chromedriver_%s.zip', CDNURL, chromedriver.version, platform);
  logger.info('chromedriver cdn url: %s', url);
  return url;
}

module.exports = function(platform) {

  var url = getDownloadUrl(platform);
  var distPath = path.join(__dirname, 'chromedriver');
  var distZipPath = distPath + '.zip';

  return new Promise(function(resolve, reject) {
    request(url)
      .on('error', function(err) {
        return reject(err);
      })
      .pipe(function(err, data) {
        console.log(err);
        console.log(data);
        var zip = new JSZip();
        zip.file(distPath, data);
      })
      //.pipe(fs.createWriteStream(distPath))
      .on('finish', function() {
        logger.info('chromedriver local in %s', distPath);

        if (platform != 'win32') {
          var stat = fs.statSync(distPath);
          if (!(stat.mode & 64)) {
            logger.info('Fixed file permissions');
            fs.chmodSync(distPath, '755');
          }
        }
        resolve();
      });
  });
};
