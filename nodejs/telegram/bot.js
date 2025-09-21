const { get, save } = require("../config/config");
const { Telegraf } = require('telegraf');

// Bot token
const bot = new Telegraf('BOT_TOKEN');

async function start() {
    bot.start((ctx) => {
        const chatId = get('chatId');
        if (chatId === 0) {
            save('chatId', ctx.chat.id);
            bot.chatId = ctx.chat.id;
            ctx.reply('Your chat id was successfully saved to config.json');
            return;
        }
        ctx.reply('Previous chat id was successfully restored from config.json');
        bot.chatId = chatId;
    });

    await bot.launch();
}

start().catch(console.error);

module.exports = { bot }
