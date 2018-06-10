const fs = require('fs'),
    util = require('util'),
    request = require("request"),
    rp = require('request-promise'),
    cheerio = require("cheerio");


const uri = "http://www.profinance.ru/news/2018/06/08/bn00-chto-budet-glavnym-v-protivostoyanii-dollara-i-evro-na-sleduyuschej-nedele.html",
    hrefSelector = 'div.news';


const $transform = (body) => cheerio.load(body);

const options = {
    uri,
    transform: $transform,
};

// list for sort out
rp(options)
    .then(function($) {
        console.log('\n<==== Start fetching ===>\n');

        const hrefs = $(hrefSelector).text();

        fs.appendFile('test.txt', hrefs, 'utf8', function(err) {
            if (err) throw err;

            console.log('Process finished');
        });
    });


