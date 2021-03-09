let twit = require('twit');
let config = require('./config.js');
let randomItem = require('random-item');
let Twitter = new twit(config);
let fs = require('fs');

console.log('\nEste bot está rodando...');

let stream = Twitter.stream('statuses/filter', { track: ['#BomDiaBot'] });
stream.on('tweet', tweetEvent);

let imgsBot = [
    'ImagensBomDia/BD1.jpg',
    'ImagensBomDia/BD2.jpg',
    'ImagensBomDia/BD3.jpg',
    'ImagensBomDia/BD4.jpg',
    'ImagensBomDia/BD5.jpg',
    'ImagensBomDia/BD6.jpg',
    'ImagensBomDia/BD7.jpg',
    'ImagensBomDia/BD8.jpg',
    'ImagensBomDia/BD9.jpg',
    'ImagensBomDia/BD10.jpg',
    'ImagensBomDia/BD11.jpg',
    'ImagensBomDia/BD12.jpg',
    'ImagensBomDia/BD13.jpg',
    'ImagensBomDia/BD14.jpg',
    'ImagensBomDia/BD16.gif',
    'ImagensBomDia/BD17.gif',
    'ImagensBomDia/BD18.gif',
    'ImagensBomDia/BD19.gif',
    'ImagensBomDia/BD20.gif',
    'ImagensBomDia/BD21.jpg',
    'ImagensBomDia/BD22.jpg'
]

function tweetEvent(tweet) {
    let imgAleatoria = randomItem(imgsBot);
    console.log("imagem aleatoria: " + imgAleatoria);
    let b64content = fs.readFileSync(imgAleatoria, { encoding: 'base64' })
    let name = tweet.user.screen_name;
    let nameID = tweet.id_str;

    Twitter.post('media/upload', { media_data: b64content }, function(err, data, response) {
        let mediaIdStr = data.media_id_string
        let meta_params = { media_id: mediaIdStr }
        let reply = `Bom Dia! @${name} 😀`;
        let params = {
            status: reply,
            media_ids: [mediaIdStr],
            in_reply_to_status_id: nameID
        };
        Twitter.post('media/metadata/create', meta_params, function(err, data, response) {
            if (!err) {
                Twitter.post('statuses/update', params, function(err, data, response) {
                    if (err != undefined) {
                        console.log(err);
                        return;
                    }
                    console.log('Tweeted: ' + params.status);
                })
            }
        })
    });
}