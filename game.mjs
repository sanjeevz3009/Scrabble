"use strict";
import { checkWordExists } from './fetch.mjs';
import { letterTileTracker, specialTileTracker } from './dragHandler.mjs';

let letterCount = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1,
    L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R:6, S: 4, T: 6, U: 4, V: 2, W: 2,
    X: 1, Y: 2, Z: 1 
};

export function removeLetters(word) {
    for (const letter of word) {
        letterCount[letter] = letterCount[letter]-1;
    }
}

export function randomLetters() {
    const alphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"
    ];

    const letters = [];

    for (let i=0; i<alphabet.length; i++) {
        const count = letterCount[alphabet[i]];
        for (let x=0; x<count; x++) {
            letters.push(alphabet[i]);
        }
    }

    const randomNumber = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomNumber];
    return randomLetter;
}

export function letterScores() {
    const scores = {
        A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
        D: 2, G: 2,
        B: 3, C: 3, M: 3, P: 3,
        F: 4, H: 4, V: 4, W: 4, Y: 4,
        K: 5,
        J: 8, X: 8,
        Q: 10, Z: 10
    };

    const letter = randomLetters();
    
    for (const score in scores) {
        const letterAndScore = [];
        const letterScore = scores[letter];
        letterAndScore.push(letter, letterScore);
        return letterAndScore;
    }
}

function clearInfoBoard() {
    const p = document.querySelector('.warning');
    p.parentNode.removeChild(p);
}

let oldWords = [];

export function wordsRecognition() {
    const starSquarePink = document.querySelector('.starSquarePink');
    const infoBoard = document.querySelector('.infoBoard')
    const p = document.createElement('p');
   
    if (!starSquarePink.hasChildNodes()) {
        p.className = 'warning';
        p.textContent = "First letter tile must be placed in the middle square.";
        infoBoard.append(p);
        window.setTimeout(clearInfoBoard, 4000);
    }

    const boardSquares = document.querySelectorAll('div.boardSquareGrey, div.specialSquareRed, div.specialSquareCyan, div.specialSquareBlue, div.specialSquarePink, div.starSquarePink');
    let counter = 0;
    let boardLetters = [];
    let tempLetters = [];


    for (let i=0; i<boardSquares.length; i++) {
        if (counter === 14) {
            tempLetters.push(boardSquares[i].textContent);
            boardLetters.push(tempLetters);
            tempLetters = [];
            counter = 0;
        } else {
            tempLetters.push(boardSquares[i].textContent);
            counter += 1;
        }
    }

    for (let i=0; i<boardLetters.length; i++) {
        for (let x=0; x<boardLetters[i].length; x++) {
            switch(boardLetters[i][x]) {
                case "3WS":
                case "2WS":
                case "2LS":
                case "3LS":
                    boardLetters[i].splice(x, 1, "");
                    break;       
            }
        }
    }

    for (let i=0; i<boardLetters.length; i++) {
        for (let x=0; x<boardLetters[i].length; x++) {
            const oldLetter = boardLetters[i][x];
            if (oldLetter.length > 1) {
                boardLetters[i].splice(x, 1, oldLetter[0]);
            }
        }
    }
    
    let tempWords = [];
    let tempWordsHorz = [];

    for (let i=0; i<boardLetters.length; i++) {
        tempWordsHorz = [];
        for (let x=0; x<boardLetters[i].length; x++) {
            if (boardLetters[i][x] != "") {
                tempWordsHorz.push(boardLetters[i][x]);
            } else {
                tempWords.push(tempWordsHorz.join(''));
                tempWordsHorz = [];
            }
        }
        tempWords.push(tempWordsHorz.join(''));
    }

    let tempWordsVer = [];

    for (let i=0; i<boardLetters.length; i++) {
        tempWordsVer = [];
        for (let x=0; x<boardLetters.length; x++) {
            if (boardLetters[x][i] != "") {
                tempWordsVer.push(boardLetters[x][i]);
            } else {
                tempWords.push(tempWordsVer.join(''));
                tempWordsVer = [];
            }
        }
        tempWords.push(tempWordsVer.join(''));
    }
    tempWords = tempWords.filter(item => item);
    
    let words = [];
    for (let i=0; i<tempWords.length; i++) {
        if (tempWords[i].length > 1) {
            words.push(tempWords[i]);
        }
    }
    compareWords(words);
}

function checkLetterConnection(newWord, words) {
    for (let i=0; i<letterTileTracker.length; i++) {
        const tileID = document.getElementById(letterTileTracker[i]);

        const div = tileID.parentElement;
        const dataX = div.getAttribute('data-x');
        const dataY = div.getAttribute('data-y');

        let left = parseInt(dataX)-1;
        const nextDivLeft = document.querySelector(`[data-x="${left}"][data-y="${dataY}"]`);
        left = parseInt(dataX)+1;

        let right = parseInt(dataX)+1;
        const nextDivRight = document.querySelector(`[data-x="${right}"][data-y="${dataY}"]`);
        right = parseInt(dataX)-1;

        let top = parseInt(dataY)-1;
        const nextDivTop = document.querySelector(`[data-x="${dataX}"][data-y="${top}"]`);
        top = parseInt(dataY)+1;

        let bottom = parseInt(dataY)+1;
        const nextDivBottom = document.querySelector(`[data-x="${dataX}"][data-y="${bottom}"]`);
        bottom = parseInt(dataY)-1;

        if (nextDivLeft !== null && nextDivLeft.firstChild !== null && nextDivLeft.firstChild.draggable === false) {
            checkWordExists(newWord);
            break;

        } else if (nextDivRight !== null && nextDivRight.firstChild !== null && nextDivRight.firstChild.draggable === false) {
            checkWordExists(newWord);
            break;
            
        } else if (nextDivTop !== null && nextDivTop.firstChild !== null && nextDivTop.firstChild.draggable === false) {
            checkWordExists(newWord);
            break;

        }  else if (nextDivBottom !== null && nextDivBottom.firstChild !== null && nextDivBottom.firstChild.draggable === false) {
            checkWordExists(newWord);
            break;

        } else {
            console.log("Not a valid play!");
            for (const word of words) {
                if (oldWords.includes(word)) {
                    const index = oldWords.indexOf(word)
                    oldWords.splice(index, 1);
                }
            }
        }
    }
}

function compareWords(words) {
    const starSquarePink = document.querySelector('.starSquarePink');

    const tempOldWords = [...words];

    for (const oldWord of oldWords) {
        if (words.includes(oldWord)) {
            const index = words.indexOf(oldWord)
            words.splice(index, 1);
        }
    }
    oldWords = [...tempOldWords];

    for (const newWord of words) {
        console.log("New word: ", newWord);
        if (starSquarePink.hasChildNodes()) {
            checkWordExists(newWord)
        } else {
            checkLetterConnection(newWord, words);
        }
    }
}

let points = 0;

export function givePoints(word) {
    const letterScores = {
        A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
        D: 2, G: 2,
        B: 3, C: 3, M: 3, P: 3,
        F: 4, H: 4, V: 4, W: 4, Y: 4,
        K: 5,
        J: 8, X: 8,
        Q: 10, Z: 10
    };

    let tempPoints = 0;
    for (let i=0; i<word.length; i++) {
        if (specialTileTracker[i] === "specialSquareCyan") {
            tempPoints += letterScores[word[i]] * 2;
            console.log("1", tempPoints);
        } else if (specialTileTracker[i] === "specialSquareBlue") {
            tempPoints += letterScores[word[i]] * 3;
            console.log("2", tempPoints);
        } else {
            tempPoints += letterScores[word[i]];
            console.log("3", tempPoints);
        }
    }
    console.log(tempPoints);

    for (const specialTile of specialTileTracker) {
        if (specialTile === "starSquarePink") {
            tempPoints *= 2;
        } else if (specialTile === "specialSquareRed") {
            tempPoints *= 3;
        } else if (specialTile === "specialSquarePink") {
            tempPoints *= 2;
        } else {
            tempPoints += 0;
        }
    }
    points += tempPoints;
    
    const score = document.getElementById('score');
    score.textContent = `Player 1 Score: ${points}`;
    console.log("Points", points)

}

export function reset() {
    const squares = document.querySelector('.scrabbleBoard');
    while (squares.firstChild) {
        squares.removeChild(squares.firstChild);
    }

    const tiles = document.querySelector('.tileRack');
    while (tiles.firstChild) {
        tiles.removeChild(tiles.firstChild);
    }

    points = 0;
    const score = document.getElementById('score');
    score.textContent = `Player 1 Score: 0`;

    letterCount = {
        A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1,
        L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R:6, S: 4, T: 6, U: 4, V: 2, W: 2,
        X: 1, Y: 2, Z: 1 
    };
}

// End the game
// Express server
// Spit errors

// Improve UX/ UI
// Resize script
// Add sound maybe
// Animations
