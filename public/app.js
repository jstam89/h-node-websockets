var socket = io.connect('http://localhost:4001');

let hangmanWord = [];
let correctletters = [];

socket.on('welcome', function (data) {
    console.log(data);
});

//Get random word from server
socket.on('randomWord', function (random) {
    hangmanWord.push(random);
    console.log('guess this word: ' + random)
    let wordView = document.getElementById('word');
    wordView.innerHTML = random.replace(/./g, '*');
    keyBoard();
});

//Generate alphabet keys
function keyBoard(){
    let allkeys = document.getElementById('letters');
    for (let i = 65; 90 >= i; i++) {
        let letters = String.fromCharCode(i);
        allkeys.innerHTML += '<button id="guessbtn" class="guessbtn">' + letters + '</button>';
    }
    makeGuess(letters);
};

//Make a guess here
function makeGuess(letters){
    let guessButton = document.getElementsByClassName('guessbtn');
    for (let i = 0; i < guessButton.length; i++) {
        let button = guessButton[i];
        let guess = button.parentElement.innerText[i];
        button.addEventListener('click', function (){
            socket.emit('guess', guess);
        });
    }
}

//Process wrong guesses and display in view
socket.on('wrongguess', function(data){
    console.log('wrong letters:' + data);
    let wrongGuessView = document.getElementById('wrongletters');
    wrongGuessView.innerHTML += data;    
});

//Process correct guesses
socket.on('correctguess', function(data){
    console.log('correct letters:' + data);
    correctletters.push(data);
    let correctGuessView = document.getElementById('correctletters');
    correctGuessView.innerHTML += data;
    console.log(hangmanWord);
});