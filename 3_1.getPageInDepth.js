var client = require('cheerio-httpcli');
var request = require('request');
var urlModule = require('url');
var fs = require('fs');
var path = require('path');

var LINK_LEVEL = 3;
var TARGET_URL = "https://nodejs.org/dist/latest-v6.x/docs/api/";
var list = {};
var idx = 0;

var checkSaveDir = (fname) => {
  var dir = path.dirname(fname);

  var dirlist = dir.split('/');
  var p = '';
  for (var i in dirlist) {
    p += dirlist[i] + "/";
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
}

var checkUrl = (url) => {
  for (var i in list) {
    if (list[i] == url) {
      return false;
    }
  }
  return true;
}

var downloadRecursive = (url, level) => {
  if (level >= LINK_LEVEL)
    return;

  if (!checkUrl(url)) {
    return;
  } else {
    list[idx] = url;
    idx++;
  }
  
  if (url.indexOf(TARGET_URL) < 0)
    return;


  client.fetch(url, {}, function(err, $, res) {
    $('a').each(function(idx){
      var href = $(this).attr('href');

      if (!href)
        return;

      href = urlModule.resolve(url, href);

      href = href.replace(/\#.+$/,"");
      downloadRecursive(href, level + 1);
    });

    if (url.substr(url.length-1, 1) == '/') {
      url += "index.html";
    }
    var savePath = url.split("/").slice(2).join("/");
    checkSaveDir(savePath);
    console.log('save : ' + savePath);
    fs.writeFileSync(savePath, $.html());
  })
}

downloadRecursive(TARGET_URL, 0);