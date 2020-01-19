var config = require('./config.json');
var TelegramBot = require('node-telegram-bot-api');
var cron = require('node-cron');
const Sequelize = require('sequelize');
const taskDB = require('./bd/task');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var config = require('./config.json');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet(config.sheet_id);
var sheet;
var date = new Date();

var token = config.token
var bot = new TelegramBot(token, {polling: true});
var name = "";
var rStat = 0;
var aStat = 0;
var gStat = 0;


bot.onText(/\/р (.+) ч (.+)/, function (msg, match) {
    rStat = 1;
    var userId = msg.from.id;
    var task = match[1];
    var time = match[2];
    var today = new Date();
    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    async.series([
      function setAuth(step) {
        // see notes below for authentication instructions!
        var creds = require('./google-generated-creds.json');
        // OR, if you cannot save the file locally (like on heroku)
        var creds_json = {
          client_email: creds.client_email,
          private_key: creds.private_key
        }

        doc.useServiceAccountAuth(creds, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          console.log('Loaded doc: '+info.title+' by '+info.author.email);
          sheet = info.worksheets[0];
          console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
        });
      },
      function addTime(step) {
        doc.addRow(1, { date: date, task: task, time: time }, function(err) {
      if(err) {
        console.log(err);
      }
    });
      }
    ], function(err){
        if( err ) {
          console.log('Error: '+err);
        }
    });
});

bot.onText(/\/а (.+) ч (.+)/, function (msg, match) {
    rStat = 1;
    var userId = msg.from.id;
    var task = match[1];
    var time = match[2];
    var today = new Date();
    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    async.series([
      function setAuth(step) {
        // see notes below for authentication instructions!
        var creds = require('./google-generated-creds.json');
        // OR, if you cannot save the file locally (like on heroku)
        var creds_json = {
          client_email: creds.client_email,
          private_key: creds.private_key
        }

        doc.useServiceAccountAuth(creds, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          console.log('Loaded doc: '+info.title+' by '+info.author.email);
          sheet = info.worksheets[1];
          console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
        });
      },
      function addTime(step) {
        doc.addRow(2, { date: date, task: task, time: time }, function(err) {
      if(err) {
        console.log(err);
      }
    });
      }
    ], function(err){
        if( err ) {
          console.log('Error: '+err);
        }
    });
});

bot.onText(/\/г (.+) ч (.+)/, function (msg, match) {
    rStat = 1;
    var userId = msg.from.id;
    var task = match[1];
    var time = match[2];
    var today = new Date();
    var date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    async.series([
      function setAuth(step) {
        // see notes below for authentication instructions!
        var creds = require('./google-generated-creds.json');
        // OR, if you cannot save the file locally (like on heroku)
        var creds_json = {
          client_email: creds.client_email,
          private_key: creds.private_key
        }

        doc.useServiceAccountAuth(creds, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          console.log('Loaded doc: '+info.title+' by '+info.author.email);
          sheet = info.worksheets[2];
          console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
        });
      },
      function addTime(step) {
        doc.addRow(3, { date: date, task: task, time: time }, function(err) {
      if(err) {
        console.log(err);
      }
    });
      }
    ], function(err){
        if( err ) {
          console.log('Error: '+err);
        }
    });
});


bot.onText(/\/remind/, function (msg, match) {
    var userId = msg.from.id;
      var today = new Date();
    bot.sendMessage(userId, 'Привет, в 22 00 не забудь про статус ' + today);
    cron.schedule('0 19 * * *', () => {
      bot.sendMessage(userId, 'статус 1 Что я делал сегодня? 2 Что планирую завтра? 3 Какие проблемы возникают?' + date);
    });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Сообщение получено, чтобы записать в эксель введи /(первая буква имени на русском) (Описание задачи с пробелами) ч (количество времени). Пример /р Работал над мониторингом и идеей ч 5');
});

bot.on("polling_error", (err) => console.log(err));
