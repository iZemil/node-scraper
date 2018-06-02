var request = require("request"),
    cheerio = require("cheerio"),
    url = "https://www.wunderground.com/weather/ru/chelyabinsk";

request(url, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            temperature = $(".wu-value.wu-value-to").text();

        console.log(`Temperature is ${temperature} F`);
    } else {
        console.log("Error: " + error);
    }
});