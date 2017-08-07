var request = require('request');
var fs = require('fs');

var url = "http://bearpot.net";
var savePath = "test.html";

request(url).pipe(fs.createWriteStream(savePath));