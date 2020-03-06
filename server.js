var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4001, function () {
    console.log('listen for request on port 4001,');
});

//Static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

//user connects to socket
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);

    //welcome message
        socket.emit('welcome', 'Welcome its time to play a game!');

    //on disconnect
    socket.on('disconnect', function () {
        console.log(`Socket ${socket.id} disconnected.`);
    });

    let guessword = [];
    let correctletters = [];
    let wrongletters = [];
    let lives = 10;
    let guessed = false;

    let words = [
        'fiestenmaker',
        'boomknuffelaar',
        'waterfiets',
    ];

    //Get random word from words list
    let wordLength = Math.floor(Math.random() * words.length);
    let word = words[wordLength];
    guessword.push(word.toUpperCase());
    console.log(guessword);
    socket.emit('randomWord', word);

    //Fetch guess from user and process it
    socket.on('guess', function (data){ 
        let letter = data;
        console.log(data);
        guessHandler(letter);
    });
    
    function guessHandler(letter){
        let check = guessword.toString().includes(letter);
        
        if (check === true) {
            correctletters.push(letter);
            socket.emit('correctguess', letter);
            console.log('is in word: ' + correctletters);
        

        }else{            
            wrongletters.push(letter);
            socket.emit('wrongguess', letter);
            lives--;

            console.log('not in word: ' + wrongletters);
            console.log('lives left: '+ lives);
            
        }
    }

});