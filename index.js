var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var List = require('collections/list');

app.get('/scrape_imdb', function(req, res){
    url = 'http://www.imdb.com/title/tt1229340';

    request(url, function(error, response, html){
        if(!error) {
            var $ = cheerio.load(html);
            
            var title, release, rating;
            var json = {title:'', release:'',rating:''};

            $('meta[property="og:title"]').filter(function() {
                var data = $(this);
                title = data[0].attribs.content;
                json.title = title;
            })

            $('a[title="See more release dates"]').filter(function() {
                var data = $(this);
                release = data.text().split('\n\n')[0];
                json.release = release;
            })

            $('span[itemprop="ratingValue"]').filter(function() {
                var data = $(this);
                rating = data.text();
                json.rating = rating;
            })
            
            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
                console.log('File successfully written')
            })
        } else {
            console.log('error : ' + error);
        }
    })

    res.send("success");
});

app.get('/scrape_lotto', function(req, res){
    url = 'http://www.nlotto.co.kr/gameResult.do?method=byWin'
    var current;

    request(url, function(error, response, html){
        if (!error) {
            var $ = cheerio.load(html);
            $('.result_title').filter(function() {
                var data = $(this);
                current = data.text().split(' ')[0];
                res.redirect('/'+current);
            })
        }
    })    
})

app.get('/:current', function(req, res){
    var currentRound = req.params.current;
    var lottos = new List();
    
    for (var i = 1; i <= currentRound; i++) {
        url = 'http://www.nlotto.co.kr/gameResult.do?method=byWin&drwNo='+i;
        request(url, function(error, response, html){
            if (!error) {
                var $ = cheerio.load(html);
                $('#desc').filter(function() {
                    var data = $(this)[0].attribs.content;
                    var extract = data.split(' ');
                    
                    var lottoJson = {
                        round: '', one : '', two : '',three : '',four : '',five : '',six : '',
                        people : '',cost : '',totalCost : ''};
                        
                    lottoJson.round = extract[1].split('ȸ')[0];
                    var temp = extract[3].split('+')[0].split(',');
                    lottoJson.one = temp[0];
                    lottoJson.two = temp[1];
                    lottoJson.three = temp[2];
                    lottoJson.four = temp[3];
                    lottoJson.five = temp[4];
                    lottoJson.six = temp[5];
                    lottoJson.people = extract[6].split('��')[0];
                    lottoJson.cost = extractNumber(extract[9].split('��')[0]);
                    lottoJson.totalCost = parseInt(lottoJson.people) * parseInt(extractNumber(lottoJson.cost));
                    lottos.add(lottoJson);
                    console.log(lottoJson);

                    var json = {result: ''};
                    json.result = lottos;
                    fs.writeFileSync("lottos.json", JSON.stringify(json, null, 4), 'utf-8', function(err, data){
                        console.log(data.toString());
                    });
                })
            } else {
                console.log(error);
            }
        })
    }
    res.send('Extract Success!');
})

function extractNumber(str) {
    var temp = str.split(',');
    var result ='';
    for (var i = 0; i < temp.length; i++) {
        result += temp[i];
    }
    return result;
}

app.listen('3000', function() {
    console.log('Server up!')
});