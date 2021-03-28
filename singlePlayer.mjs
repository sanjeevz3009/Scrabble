export function randomLetters() {
    const letterTiles = document.querySelectorAll('.letterTile');
    
    const alphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    let randomNumber = Math.floor(Math.random() * alphabet.length);
    let randomLetter = alphabet[randomNumber];
    return randomLetter;
}

function letterScores() {

    // Can make it efficient
    const scores = {
        A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
        D: 2, G: 2,
        B: 3, C: 3, M: 3, P: 3,
        F: 4, H: 4, V: 4, W: 4, Y: 4,
        K: 5,
        J: 8, X: 8,
        Q: 10, Z: 10
    };

    let letter = randomLetters();
    
    for (let score in scores) {
        let letterScore = scores[letter];
        let letterAndScore = `${letter}${letterScore}`;
        return letterAndScore;

    }
}
export function tileRackLetters() {
    const letterTiles = document.querySelectorAll('.letterTile');

    for (let i=0; i<letterTiles.length; i++) {
        letterTiles[i].textContent = letterScores();
    }
}

export function wordsRecognition() {
    const starSquarePink = document.querySelector('.starSquarePink');
    const infoBoard = document.querySelector('.infoBoard')
    const p = document.createElement('p');

    if (!starSquarePink.hasChildNodes()) {
        p.className = 'warning';
        p.textContent = "First letter tile must be placed in the middle square.";
        infoBoard.append(p);
    }
}

export function singlePlayer() {
    randomLetters();
    tileRackLetters();
    wordsRecognition();
}