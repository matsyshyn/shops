// Web client host and port
const host = 'localhost';
const port = 8081;

let socket;

function connect() {
    socket = new WebSocket(`ws://${host}:${port}`);
    socket.onclose = function () {
        console.log('Connection closed');
    }
}

function send(data) {
    if (socket.readyState !== WebSocket.OPEN) return;
    socket.send(data);
}

connect();
