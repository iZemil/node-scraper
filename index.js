const fs = require('fs'),
    util = require('util'),
    request = require("request"),
    rp = require('request-promise'),
    cheerio = require("cheerio");

// TODO: more patterns for hrefs
const uri = "http://www.profinance.ru/techanalitics_arch.php",
    hrefSelector = '.pfs-title a';
// var hrefPattern = 'http://www.profinance.ru/news/2018/06/07/';
const config = {

};
// /^\s{0,}((по теме)|(источник)|(подпишитесь)|(\d)).+$/gim
const $transform = (body) => cheerio.load(body);

const options = {
    uri,
    transform: $transform,
};

// list for sort out
rp(options)
    .then(function($) {
        console.log('\n<==== Start fetching ===>\n');

        const hrefs = $(hrefSelector);
        const hrefsArray = [];


        hrefs.each((ndx, el) => {
            hrefsArray.push(el.attribs.href);
        });

        // fs.appendFile('result.json', util.inspect(hrefs));
        // fs.appendFile('result.json', JSON.stringify(xxx));


        console.log('Successful operation');


        return hrefsArray;
    })
    .then(function(hrefsArray) {
        const workArray = hrefsArray.slice(0, 2);

        workArray.forEach((url, ndx) => {
            rp({ uri: url, transform: $transform })
                .then(($) => {
                    const content = $('div.news').text();
                    const formattedContent = content.replace(/^\s*((по теме)|(источник)|(подпишитесь)|(\d)).+$/gim, '');

                    fs.appendFile(`content${ndx}.txt`, formattedContent, (err) => {
                        if (err) throw err;
                        console.log('The "data to append" was appended to file: ', url);
                    });
                });
        });

    })
    .then(() => console.log('\n<==== finished ===>\n'))
    .catch(function(error) {
        console.log("\nSomething went wrong: " + error);

        throw error;
    });


