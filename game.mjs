"use strict";
import { checkWordExists } from './fetch.mjs';
import { letterTileTracker, specialTileTracker } from './dragHandler.mjs';

// Global object containing how many letters should be in the letter bag for the game
let letterTilesBag = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1,
    L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R:6, S: 4, T: 6, U: 4, V: 2, W: 2,
    X: 1, Y: 2, Z: 1 
};

// Once letter tiles have been played, it will be reduced from the letter tiles bag (object)
export function removeLetterTiles(word) {
    for (const letter of word) {
        letterTilesBag[letter] = letterTilesBag[letter]-1;
    }
}

// Picks random letters from the letter tiles bag to place on the tile rack
export function randomLetters() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = [];

    // Puts all the letters available from the letter tile bag into letters array 
    // to be randomly picked later
    for (let i=0; i<alphabet.length; i++) {
        const count = letterTilesBag[alphabet[i]];
        for (let x=0; x<count; x++) {
            letters.push(alphabet[i]);
        }
    }

    // Randomly selecting the letters from the letters array and returning it
    const randomNumber = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomNumber];
    return randomLetter;
}

// To display the score of the letter on the letter tiles
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

// Clears the warning message after being displayed on the information board
function clearInfoBoard() {
    const p = document.querySelector('.warning');
    p.parentNode.removeChild(p);
}

// Word recognition 
export function wordsRecognition() {
    const starSquarePink = document.querySelector('.starSquarePink');

    // To display a warning message if the first letter tile isn't placed on the star sqaure
    const infoBoard = document.querySelector('.infoBoard')
    const p = document.createElement('p');
    if (!starSquarePink.hasChildNodes()) {
        p.className = 'warning';
        p.textContent = "First letter tile must be placed in the star square.";
        infoBoard.append(p);
        window.setTimeout(clearInfoBoard, 4000);
    }

    const boardSquares = document.querySelectorAll('div.boardSquareGrey, div.specialSquareRed, div.specialSquareCyan, div.specialSquareBlue, div.specialSquarePink, div.starSquarePink');
    // boardLetters will become a 2D array storing all the letters on thr scrabble board
    let boardLetters = [];
    // tempLetters will be used to store 14 letters left to right from top of the scrabble board to bottom
    // This 1D array will append to boardLetters making boardLetters a 2D array at the end containing 14 1D arrays
    let tempLetters = [];

    let counter = 0;
    // Takes all the letters on the scrabble board and stores it in a 2D array (boardLetters)
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

    // Text of the special squares will be read and appended to the boardLetters array
    // This nested for loops remove that
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

    // When the text content is appended to the boardLetters 2D array, it will contain
    // the score of the letter from the letter tile and this nested for loop removes that
    // leaving only the letters
    for (let i=0; i<boardLetters.length; i++) {
        for (let x=0; x<boardLetters[i].length; x++) {
            const oldLetter = boardLetters[i][x];
            if (oldLetter.length > 1) {
                boardLetters[i].splice(x, 1, oldLetter[0]);
            }
        }
    }
    
    // tempWords array to store joined words
    let tempWords = [];
    // tempLettersToJoin array will have the letters that needs to be
    // joined to make it a word
    let tempLettersToJoin = [];

    // This nested for loop will iterate through the 2D array boardLetters joining any possible words
    // This nested for loop will iterate through the arrays from left to right to identify
    // any words that can be formed
    for (let i=0; i<boardLetters.length; i++) {
        tempLettersToJoin = [];
        for (let x=0; x<boardLetters[i].length; x++) {
            if (boardLetters[i][x] != "") {
                tempLettersToJoin.push(boardLetters[i][x]);
            } else {
                tempWords.push(tempLettersToJoin.join(''));
                tempLettersToJoin = [];
            }
        }
        tempWords.push(tempLettersToJoin.join(''));
    }

    // This nested for loop will iterate through the arrays top to bottom to identify any words that 
    // can be formed
    for (let i=0; i<boardLetters.length; i++) {
        tempLettersToJoin = [];
        for (let x=0; x<boardLetters.length; x++) {
            if (boardLetters[x][i] != "") {
                tempLettersToJoin.push(boardLetters[x][i]);
            } else {
                tempWords.push(tempLettersToJoin.join(''));
                tempLettersToJoin = [];
            }
        }
        tempWords.push(tempLettersToJoin.join(''));
    }
    // tempWords array will contain empty strings which will be filtered here
    tempWords = tempWords.filter(item => item);
    
    let words = [];
    // This for loop will filter out single letters and only push words (2 or more letters)
    for (let i=0; i<tempWords.length; i++) {
        if (tempWords[i].length > 1) {
            words.push(tempWords[i]);
        }
    }
    compareWords(words);
}

// To keep track of words that have been already played
let oldWords = [];
// To check if first round have been played
let firstRound = false;

// This function will compare the words array with the oldWords array to identify
// the latest/ new words played
function compareWords(words) {
    const starSquarePink = document.querySelector('.starSquarePink');

    const tempOldWords = [...words];

    // Filtering out the words that's been previously played, leaving
    // the new words played on the words array
    for (const oldWord of oldWords) {
        if (words.includes(oldWord)) {
            const index = words.indexOf(oldWord)
            words.splice(index, 1);
        }
    }
    oldWords = [...tempOldWords];

    // To check if the first round is played or not
    for (const newWord of words) {
        console.log("New word: ", newWord);
        if (firstRound === false && starSquarePink.hasChildNodes()) {
            checkWordExists(newWord)
            firstRound = true;
        } else {
            // If first round have been already played, from now the letter connections will be checked
            // From now any letter tiles to be played will need to connect to existing tiles
            checkLetterConnection(newWord, words);
        }
    }
}

// Function to check if the letter tiles being played are connected to already existing tiles on the board
function checkLetterConnection(newWord, words) {
    for (let i=0; i<letterTileTracker.length; i++) {
        const tileID = document.getElementById(letterTileTracker[i]);

        // Using the tileID we get the X and Y coordinates of the letter tiles on the board
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

        // Checks if the word which have been played is connected to already existing letter tiles on the board 
        // (from previously played words/ rounds)
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
            // If the letter tiles are not connected the word played will be removed from the words array
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

let points = 0;

// Function to calculate the points
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

    // Caculate the normal points of the tiles
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

    // Calculate points if the letter tiles are placed on special board squares
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

// Function that will be used to reset the scrabble board, tile track, letter tile bag and score 
// when the user changes the board designs to play on a new board 
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

    letterTilesBag = {
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
