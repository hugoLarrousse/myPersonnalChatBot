/* Modules */
const express = require('express');
const bodyParser = require('body-parser');

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

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
      });
});

server.listen(port, function (res) {
    console.log("ChatBot API is running on " + port);
});
