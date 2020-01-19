var config = require('./config.json');
var TelegramBot = require('node-telegram-bot-api');
var cron = require('node-cron');
const Sequelize = require('sequelize');
const DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/startblock';
const database = new Sequelize(DATABASE_URL);
const taskDB = require('./bd/task');

var token = config.token
var bot = new TelegramBot(token, {polling: true});


bot.onText(/напомни/, function (msg, match) {
    var userId = msg.from.id;
    cron.schedule('0 19 * * *', () => {
      bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)' + date);
    });
});

bot.onText(/\/start_test/, function (msg, match) {
  newQuestion(msg);
});

bot.onText(/\/добавить_работу (.+)/, function (msg, match) {
  newQuestion(msg);
});

bot.onText(/\/показать_работы/, function (msg, match) {
  var userId = msg.from.id;
  var info_job = taskDB.findAll({
  attributes: ['name']
});
  bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)' + info_job);
});

bot.onText(/\/удалить_работу (.+)/, function (msg, match) {
  newQuestion(msg);
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
