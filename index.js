var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
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

app.listen('3000', function() {
    console.log('Server up!')
});