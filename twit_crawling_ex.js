// npm install twit --save

var Twit = require('twit');

var T = new Twit({
    consumer_key:'',
    consumer_secret:'',
    access_token:'2406885595-',
    access_token_secret:''
});

// Javascript 관련 글 검색.
var stream = T.stream('statuses/filter',{track:'홍준표'});
var count = 1;

stream.on('tweet', function(tw){
    var text = tw.text;
    var location = tw.user.location;
    var user_name = tw.user.name;
    console.log(count++ +"."+ user_name+"/"+location+"> " + text);
})