"use strict";
import { letterScores } from './game.mjs';

// To make the scrabble board
// This function takes a parameter (different board designs)
export function drawSquares(boardList) {
    const scrabbleBoard = document.querySelector('.scrabbleBoard');
    
    let tracker = 0;
    let xCoord = 0;
    let yCoord = 0;
    
    for (let x=0; x<boardList.length; x++) {
        const square = document.createElement('div');

        if (x>0) {
            tracker += 1;
            xCoord += 1;
        }

        if (tracker === 15) {
            yCoord += 1;
            tracker = 0;
            xCoord = 0;
        }

        // Each element will be given x and y coordinates
        if (boardList[x] === '3ws') {
            square.className = 'specialSquareRed';
            square.dataset.x = xCoord;
            square.dataset.y = yCoord;
            square.textContent = "3WS";

            scrabbleBoard.append(square);
        } else if (boardList[x] === '2ls') {
            square.className = 'specialSquareCyan';
            square.dataset.x = xCoord;
            square.dataset.y = yCoord;
            square.textContent = "2LS";

            scrabbleBoard.append(square);
        } else if (boardList[x] === '3ls') {
            square.className = 'specialSquareBlue';
            square.dataset.x = xCoord;
            square.dataset.y = yCoord;
            square.textContent = "3LS";

            scrabbleBoard.append(square);
        } else if (boardList[x] === '2ws') {
            square.className = 'specialSquarePink';
            square.dataset.x = xCoord;
            square.dataset.y = yCoord;
            square.textContent = "2WS";

            scrabbleBoard.append(square);
        } else if (boardList[x] === '') {
            square.className = 'boardSquareGrey';
            square.dataset.x = xCoord;
            square.dataset.y = yCoord;

            scrabbleBoard.append(square);
        } else {
            square.className = 'starSquarePink';
            square.dataset.x = xCoord;
            square.dataset.y = yCoord;

            scrabbleBoard.append(square);
        }
    } 
}

// To make the letter tiles for the tile rack
export function tileRack() {
    const tileRack = document.querySelector('.tileRack');
    let amountOfTiles;
    if (tileRack != null) {
        amountOfTiles = tileRack.childNodes.length;
    }
    // 7 letter tiles will be be present in the tile rack
    // The letter tiles will also contain their score
    if (amountOfTiles != 7) {
        for (let x=0; x<7-amountOfTiles; x++) {
            const letterAndScore = letterScores();

            const letterTile = document.createElement('p');
            letterTile.className = 'letterTile';
            letterTile.id = `tile${Math.floor(Math.random() * 1000)}`;
            letterTile.draggable = true;

            const point = document.createElement('span');
            point.className = "point";
            point.textContent = letterAndScore[1];

            letterTile.textContent = letterAndScore[0];
            letterTile.appendChild(point);

            tileRack.append(letterTile);
        }  
    } 
}

export function drawBoards() {
    tileRack();
}
