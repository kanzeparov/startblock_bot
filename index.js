var config = require('./config.json');
var TelegramBot = require('node-telegram-bot-api');
var cron = require('node-cron');

var token = config.token
var bot = new TelegramBot(token, {polling: true});

var notes = [];



bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');

    cron.schedule('*/1 * * * * *', () => {
      bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
    });

});

bot.onText(/\/bookmark/, (msg, match) => {
   const chatId = msg.chat.id;
   const url = match.input.split(' ')[1];
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message

   if (url === undefined) {
       bot.sendMessage(
           chatId,
           'Please provide URL of article!',
       );
       return;
   }

   URLs.push(url);
   bot.sendMessage(
       chatId,
       'URL has been successfully saved!',
   );
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);
