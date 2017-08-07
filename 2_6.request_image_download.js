var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var urlModule = require('url');

var saveDir = __dirname + "/img";
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir);
}

var url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent('고양이');
var param = {};

client.fetch(url, param, function(err, $, res) {
  if(!err) {
    $('img').each(function(idx){
      var src = $(this).attr('src');
      src = urlModule.resolve(url, src);

      var fname = urlModule.parse(src).pathname;
      fname = saveDir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '-');

      request(src).pipe(fs.createWriteStream(fname));
    })
  } else {
    console.log(err);
  }
});
