/* Modules */
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').load({ path: '.env' });
const { weather } = require('./weatherAPi');

const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server);

const port = 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', async (msg) => {
        console.log('message: ' + msg);
        if(msg === "weather"){
           const toto = await weather();
           io.emit('chat message', toto);
        }
      });
});

server.listen(port, function (res) {
    console.log("ChatBot API is running on " + port);
});
