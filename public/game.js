//Make connection
let socket = io.connect('http://localhost:4000');


let words = [
    'volkswagen',
    'volvo',
    'bmw'
];

//Pick random word from array
function randomWord() {
    let wordLength = Math.floor(Math.random() * words.length);
    let word = words[wordLength];
    wordOutput(word);
}

//Output the word in asterixes
function wordOutput(word) {
    
    allLetters();
}

//Create clickable letters
function allLetters() {
    let letterView = document.getElementById('letters');
    for (let i = 65; 90 >= i; i++) {
        let letters = String.fromCharCode(i);
        letterView.innerHTML += '<button id="guessbtn" class="guessbtn">' + letters + '</button>';
    }
    guessHandler();
}

//Make a guess by clicking on a letter
function guessHandler() {
    let guessButton = document.getElementsByClassName('guessbtn');

    for (let i = 0; i < guessButton.length; i++) {
        let button = guessButton[i];
        button.addEventListener('click', guessHandler);
    }
}
