// http://api.aoikujira.com/kawase/
// JSON
// - http://api.aoikujira.com/kawase/get.php?code=USD&amp;format=json

var API = 'http://api.aoikujira.com/kawase/get.php?code=USD&amp;format=xml';

var request = require('request');
var fs = require('fs');
var parseString = require('xml2js').parseString;

request(API, function(err, response, body) {
    if (err || response.statusCode != 200) {
        console.log(err);
        return;
    }

    parseString(body, function(err, result) {
        //var r = JSON.parse(JSON.stringify(result));
        var r = JSON.parse(JSON.stringify(result));
        var krw = r.kawase.KRW;
        
        var t = new Date();
        var fname = "USD_KRW_" + t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate() + ".txt";
        var text = "lusd=" + krw + "krw";
        
        console.log(text);
        fs.writeFile(fname, text);    
    });
})
