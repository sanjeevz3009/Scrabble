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

function clearP() {
    let p = document.querySelector('.warning');
    p.parentNode.removeChild(p);
}

export function wordsRecognition() {
    const starSquarePink = document.querySelector('.starSquarePink');
    const infoBoard = document.querySelector('.infoBoard')
    const p = document.createElement('p');
   
    if (!starSquarePink.hasChildNodes()) {
        p.className = 'warning';
        p.textContent = "First letter tile must be placed in the middle square.";
        infoBoard.append(p);
        window.setTimeout(clearP, 4000);
    }

    const boardSquares = document.querySelectorAll('div.boardSquareGrey, div.specialSquareRed, div.specialSquareCyan, div.specialSquareBlue, div.specialSquarePink, div.starSquarePink');
    
    let counter = 0;
    let results = [];
    let tempLetterArr = [];

    for (let i=0; i<boardSquares.length; i++) {
        if (counter === 14) {
            tempLetterArr.push(boardSquares[i].textContent);
            results.push(tempLetterArr);
            tempLetterArr = [];
            counter = 0;
        } else {
            tempLetterArr.push(boardSquares[i].textContent);
            counter += 1;
        }
    }

    let wordsArr = [];
    let tempWordArr = [];

    for (let i=0; i<results.length; i++) {
        tempWordArr = [];
        for (let x=0; x<results[i].length; x++) {
            if (results[i][x] != "") {
                tempWordArr.push(results[i][x]);
            } else {
                wordsArr.push(tempWordArr.join(''));
                tempWordArr = [];
            }
        }
        wordsArr.push(tempWordArr.join(''));
    }

    let newWordsArr = [];
    for (let i=0; i<wordsArr.length; i++) {
        if (wordsArr[i].length > 1) {
            newWordsArr.push(wordsArr[i]);
        }
    }
    console.log(newWordsArr);

    let wordsArrVer = [];
    let tempWordArrVer = [];

    for (let i=0; i<results.length; i++) {
        tempWordArrVer = [];
        for (let x=0; x<results.length; x++) {
            if (results[x][i] != "") {
                tempWordArrVer.push(results[x][i]);
            } else {
                wordsArrVer.push(tempWordArrVer.join(''));
                tempWordArrVer = [];
            }
        }
        wordsArrVer.push(tempWordArrVer.join(''));
    }
    wordsArrVer = wordsArrVer.filter(item => item);

    let newWordsArrVer = [];

    for (let i=0; i<wordsArrVer.length; i++) {
        if (wordsArrVer[i].length > 1) {
            newWordsArrVer.push(wordsArrVer[i]);
        }
    }
    console.log(newWordsArrVer);
}

function compare() {
    let diff = 0;
    if (newWordsArr.length > oldWordsArr.length) {
        newWordsArr.reverse()
        diff = newWordsArr.length - oldWordsArr.length;
        for (let i=0; i<diff; i++) {
            console.log(newWordsArr[i]);
        } 
    } else {
        console.log("It will never get here!")
    }
} 

export function singlePlayer() {
    randomLetters();
    //tileRackLetters();
}