var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = xml2js.Builder;

var xml = "<fruits shop='TEST Market'>"+
"<item price='140'>Banana</item>"+
"<item price='200'>Apple</item>"+
"</fruits>";

parseString(xml, function(err,result) {
    console.log(JSON.stringify(result));

    var xml = new builder().buildObject(result);
    console.log(xml);
});