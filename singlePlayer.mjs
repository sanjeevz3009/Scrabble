import { lastID, xCoord, yCoord, boolTileRack } from './dragHandler.mjs';

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

let wordsArr = [];

export function wordsRecognition() {
    const starSquarePink = document.querySelector('.starSquarePink');
    const infoBoard = document.querySelector('.infoBoard')
    const p = document.createElement('p');

    // let number = 8;

    // let discoverLetter = document.querySelectorAll(`[data-y="${number}"]`);
    // console.log(discoverLetter);
    // console.log(discoverLetter[1].textContent);
   
    if (!starSquarePink.hasChildNodes()) {
        p.className = 'warning';
        p.textContent = "First letter tile must be placed in the middle square.";
        infoBoard.append(p);
        window.setTimeout(clearP, 4000);
    }

    console.log(xCoord, yCoord);

    // let lettersArrHorz = [];
    
    // let wordsArrHorz = [];

    // const boardSquares = document.querySelectorAll('div.boardSquareGrey, div.specialSquareRed, div.specialSquareCyan, div.specialSquareBlue, div.specialSquarePink, div.starSquarePink');
    // for (let i=0;  i<boardSquares.length; i++) {
    //     console.log(boardSquares[i].textContent);
    //     if (boardSquares[i].textContent === "") {
    //         lettersArrHorz.push("");
    //     } else {
    //         lettersArrHorz.push(boardSquares[i].textContent);
    //     }
    // }
    // console.log(lettersArrHorz);

    // let tempWordArrHorz = [];

    // for (let i=0; i<lettersArrHorz.length; i++) {
    //     if (lettersArrHorz[i].length >= 1) {
    //         tempWordArrHorz.push(lettersArrHorz[i]);
    //     } else if (lettersArrHorz[i].length <=0) {
    //         wordsArrHorz.push(tempWordArrHorz.join(''));
    //         tempWordArrHorz = [];

    //     }
    // }

    // console.log(tempWordArrHorz);
    // wordsArrHorz = wordsArrHorz.filter(item => item);
    // console.log(wordsArrHorz);

    // const initialLetter = document.getElementById(lastID);
    // wordsArr.push(initialLetter.textContent);

    // let xRight = 14-xCoord;
    // let xLeft = 14-xRight;
    // console.log(xLeft, xRight);

    // let takeAway = xLeft;

    // for (let i=0; i<xLeft; i++) {
    //     takeAway -=1;
    //     console.log(takeAway);
    //     let findLetter = document.querySelectorAll(`[data-y="${yCoord}"]`);
    //     let identifyLetter = findLetter[takeAway].textContent;
    //     console.log(identifyLetter);
    //     if (identifyLetter === "") {
    //         console.log("Single letter or another word!");
    //         break;
    //     } else if (boolTileRack === true) {
    //         break;
    //     } else {
    //         wordsArr.push(identifyLetter);  
    //         console.log(wordsArr);          
    //     }
    // }
    // console.log(wordsArr);
}

export function popMoved() {
    
}

// export class wordsRecognition2 {
//     constructor(lastID, xCoord, yCoord) {
//         this.xCoord = xCoord;
//         this.yCoord = yCoord;
//         this.lastID = lastID
//     }
//     show() {
//         let x = this.xCoord;
//         let y = this.yCoord;
//         console.log(x, y);
//     }
// }

export function singlePlayer() {
    randomLetters();
    //tileRackLetters();
}