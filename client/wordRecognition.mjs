"use strict";
import { checkWordExists } from './fetch.mjs';
import { letterTilesTracker, specialTilesTracker, clearLetterTilesTracker, dragHandler } from './eventHandler.mjs';
import { givePoints, warningMessages } from './game.mjs';

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
    for (const oldWord of oldWords) {
        if (words.includes(oldWord)) {
            const index = words.indexOf(oldWord)
            words.splice(index, 1);
        }
    }
    oldWords = [...tempOldWords];
    // To check if the first round is played or not
    wordsLength = words.length;
    console.log(words);
    if (firstRound === false && starSquarePink.hasChildNodes() && words[0].length === letterTilesTracker.length) {
        checkWordExists(words)
    } else {
        // checkLetterConnection(newWord, words);
        checkLetterConnectionInitial(words);
    }
}

function checkLetterConnectionInitial(words) {
    let tileTrackLetters = [];
    console.log(tileTrackLetters);
    for (const letterTileID of letterTilesTracker) {
        const letterTile = document.getElementById(letterTileID);
        tileTrackLetters.push(letterTile.textContent[0]);
    }

    let checker = (arr, target) => target.every(v => arr.includes(v));

    let letterConnection = false;
    for (const newWord of words) {
        let newLetters = newWord.split('');
        console.log(newLetters);
        if (checker(newLetters, tileTrackLetters)) {
            letterConnection = true;
            break;
        } else {
            for (const word of words) {
                if (oldWords.includes(word)) {
                    const index = oldWords.indexOf(word)
                    oldWords.splice(index, 1);
                }
                letterConnection = false;
            }
        }
    }
    if (letterConnection === true) {
        for (const newWord of words) {
            checkLetterConnection(newWord, words);
        }
    } else if (words === null) {
        alert("No new letter tiles added to the board!");
    } else {
        alert("At one round, you can either place letters horizontally or vertically, not both ways!");
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
            checkWordExists(words);
            break;

        } else if (nextDivRight !== null && nextDivRight.firstChild !== null && nextDivRight.firstChild.draggable === false) {
            checkWordExists(words);
            break;
            
        } else if (nextDivTop !== null && nextDivTop.firstChild !== null && nextDivTop.firstChild.draggable === false) {
            checkWordExists(words);
            break;

        }  else if (nextDivBottom !== null && nextDivBottom.firstChild !== null && nextDivBottom.firstChild.draggable === false) {
            checkWordExists(words);
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

export function removeOldWords(words) {
    for (const word of words) {
        if (oldWords.includes(word)) {
            const index = oldWords.indexOf(word)
            oldWords.splice(index, 1);
        }
    }
}
export function validateWords(validWords) {
    if (validWords.length === wordsLength) {
        for (const word of validWords) {
            givePoints(word, validWords);
            if (firstRound === false) {
                firstRoundPlayed();
            }
        }
    } else {
        alert("Inavlid words made!");
    }
}