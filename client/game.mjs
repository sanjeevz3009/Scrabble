"use strict";
import { checkWordExists } from './fetch.mjs';
import { letterTilesTracker, specialTilesTracker, clearLetterTilesTracker, dragHandler } from './eventHandler.mjs';
import { tileRack } from './drawBoards.mjs';
import { pickDesign } from './boardDesigns.mjs';

let letterTilesBag = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2, I: 9, J: 1, K: 1,
    L: 4, M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2,
    X: 1, Y: 2, Z: 1 
};

function removeLetterTiles(word) {
    // Once letter tiles have been played, it will be reduced from the letter tiles bag (object)
    for (const letter of word) {
        letterTilesBag[letter] = letterTilesBag[letter]-1;
    }

    let amountOfLetters = 0;
    for (let key in letterTilesBag) {
        amountOfLetters += letterTilesBag[key];
    }
    const letterTileCount = document.getElementById("letterTileCount");
    letterTileCount.textContent = `You have ${amountOfLetters} letter tiles in your bag.`
}

function randomLetters() {
    // Picks random letters from the letter tiles bag to place on the tile rack
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
    const randomNumber = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomNumber];
    return randomLetter;
}

export function letterScores() {
    // To display the score of the letter on the letter tiles
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

export function wordsRecognition() {
    warningMessages();
    // Word recognition 
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
    tempWords = tempWords.filter(item => item);
    
    let words = [];
    for (let i=0; i<tempWords.length; i++) {
        if (tempWords[i].length > 1) {
            words.push(tempWords[i]);
        }
    }
    compareWords(words);
}

export let firstRound = false;
export function firstRoundPlayed() {
    firstRound = true;
}

// To keep track of words that have been already played
let oldWords = [];
let wordsLength = 0;

function compareWords(words) {
    // This function will compare the words array with the oldWords array to identify
    // the latest/ new words played
    const starSquarePink = document.querySelector('.starSquarePink');

    const tempOldWords = [...words];

    // Filtering out the words that's been previously played, leaving
    // the new words played on the words array
    console.log(oldWords);
    for (const oldWord of oldWords) {
        console.log(oldWord);
        console.log(words.includes(oldWord));
        if (words.includes(oldWord)) {
            const index = words.indexOf(oldWord)
            words.splice(index, 1);
        }
    }
    oldWords = [...tempOldWords];
    // To check if the first round is played or not
    wordsLength = words.length;
    console.log(words);
    for (const newWord of words) {
        if (firstRound === false && starSquarePink.hasChildNodes() && newWord.length === letterTilesTracker.length) {
            checkWordExists(newWord)
        } else {
            // checkLetterConnection(newWord, words);
            checkLetterConnection(newWord, words);
        }
    }
}

function checkLetterConnection(newWord, words) {
    // Function to check if the letter tiles being played are connected to already existing tiles on the board
    for (let i=0; i<letterTilesTracker.length; i++) {
        const letterTile = document.getElementById(letterTilesTracker[i]);
        // Using the tileID we get the X and Y coordinates of the letter tiles on the board
        const div = letterTile.parentElement;
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
            for (const word of words) {
                if (oldWords.includes(word)) {
                    const index = oldWords.indexOf(word)
                    oldWords.splice(index, 1);
                }
            }
        }
    }
    warningMessages();
}

let points = 0;
export function givePoints(word, validWords) {
    // Function to calculate the points
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
        if (specialTilesTracker[i] === "specialSquareCyan") {
            tempPoints += letterScores[word[i]] * 2;
            console.log("1", tempPoints);
        } else if (specialTilesTracker[i] === "specialSquareBlue") {
            tempPoints += letterScores[word[i]] * 3;
            console.log("2", tempPoints);
        } else {
            tempPoints += letterScores[word[i]];
            console.log("3", tempPoints);
        }
    }
    console.log(tempPoints);
    // Calculate points if the letter tiles are placed on special board squares
    for (const specialTile of specialTilesTracker) {
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

    removeLetterTiles(word);
    dragFalse();
    tileRack();
    dragHandler();
}

function clearInfoBoard() {
    // Clears the warning message after being displayed on the information board
    const p = document.querySelector('.warning');
    p.parentNode.removeChild(p);
}

export function warningMessages(word, statusCode) {
    // To display a warning messages
    const starSquarePink = document.querySelector('.starSquarePink');
    const infoBoard = document.querySelector('.infoBoard')
    const p = document.createElement('p');
    p.className = 'warning';

    if (!starSquarePink.hasChildNodes()) {
        p.textContent = "First letter tile must be placed on the star square.";
        infoBoard.append(p);
        window.setTimeout(clearInfoBoard, 4000);
    } else if (statusCode === "404") {
        p.textContent = `${word} is not a valid word.`;
        infoBoard.append(p);
        window.setTimeout(clearInfoBoard, 4000);
    }
}

// Function to make the letter tiles played by the user not moveable after it has been confirmed a valid word
export function dragFalse() {
    for (const letterTile of letterTilesTracker) {
        const p = document.getElementById(letterTile);
        p.draggable = false;
    }
    clearLetterTilesTracker();
}

export function reset() {
    // Function that will be used to reset the scrabble board, tile track, letter tile bag and score,
    // when the user changes the board designs to play on a new board or game is finished
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

export function wordPlayed(word) {
    const wordPlayed = document.getElementById('wordPlayed');
    wordPlayed.textContent = `You played the word: ${word}`
}

export function gameFinished() {
    alert(`Your final score is ${points}. Thank you for playing.`);
    pickDesign(0);
}
// Double pop up on not connecting words and invalid