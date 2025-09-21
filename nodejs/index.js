const { server } = require('./ws/server');
const { bot } = require('./telegram/bot');

async function send(data) {
    if (!bot.chatId) return;
    await bot.telegram.sendMessage(bot.chatId, data);
}

server.on('connection', function(socket) {
    console.log('Client connected');

    socket.on('message', send);
    socket.on('close', () => console.log('Client disconnected'));
});
