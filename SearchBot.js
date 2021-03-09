var twit = require('twit');
var config = require('./config.js');
var randomItem = require('random-item');
var Twitter = new twit(config);
console.log('Este bot está rodando...');
var schedule = require('node-schedule');

let startTime = new Date(Date.now());
let endTime = new Date(startTime.getTime() + 20000);

var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function() {
    let rdmNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const numeros = [rdmNumbers.length]
    rdm = randomItem(rdmNumbers)

    if (numeros.indexOf(rdm) == -1) {
        numeros.push(rdm);

        var query = {
            q: "Bom dia flor do dia!",
            result_type: "recent"
        }

        Twitter.get('search/tweets', query, BotGotLatestTweet);

        function BotGotLatestTweet(error, data, response) {
            if (error) {
                console.log('Bot não pôde achar o último tweet: ' + error);
            } else {
                console.log(rdm);
                var id = {
                    id: data.statuses[rdm].id_str
                }

                Twitter.post('statuses/retweet/:id', id, BotRetweeted);

                function BotRetweeted(error, response) {
                    if (error) {
                        console.log('Bot não pode retweetar: ' + error);
                    } else {
                        console.log('Bot retweetou: ' + id.id);
                    }
                }
            }
        }
    }
});