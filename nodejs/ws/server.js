const { WebSocket } = require('ws');

// Web server port
const port = 8081;
const server = new WebSocket.Server({ port });

module.exports = { server };
