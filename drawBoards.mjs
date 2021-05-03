"use strict";
import { letterScores } from './singlePlayer.mjs';

export function drawSquares() {
    const boardList = [
        "3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws",
        "", "2ws", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "2ws", "",
        "", "", "2ws", "", "", "", "2ls", "", "2ls", "", "", "", "2ws", "", "",
        "2ls", "", "", "2ws", "", "", "", "2ls", "", "", "", "2ws", "", "", "2ls",
        "", "", "", "", "2ws", "", "", "", "", "", "2ws", "", "", "", "",
        "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "",
        "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
        "3ws", "", "", "2ls", "", "", "", "star", "", "", "", "2ls", "", "", "3ws",
        "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
        "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "",
        "", "", "", "", "2ws", "", "", "", "", "", "2ws", "", "", "", "",
        "2ls", "", "", "2ws", "", "", "", "2ls", "", "", "", "2ws", "", "", "2ls",
        "", "", "2ws", "", "", "", "2ls", "", "2ls", "", "", "", "2ws", "", "",
        "", "2ws", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "2ws", "",
        "3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws",
    ];

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

function animateLetterTile() {
    const letterTiles = document.querySelectorAll('.letterTile');
    letterTiles[0].addEventListener("animation", e => {
        document.querySelector(".element").classList.toggle("flip-scale-down-diag-2")
    })
}

export function tileRack() {
    const tileRack = document.querySelector('.tileRack');
    const amountOfTiles = tileRack.childNodes.length-1;

    if (amountOfTiles != 7) {
        for (let x=0; x<7-amountOfTiles; x++) {
            const letterAndScore = letterScores();

            const letterTile = document.createElement('p');
            letterTile.className = 'letterTile';
            letterTile.id = `tile${Math.floor(Math.random() * 200)}`;
            letterTile.draggable = true;

            const point = document.createElement('span');
            point.className = "point";
            point.textContent = letterAndScore[1];

            letterTile.textContent = letterAndScore[0];
            letterTile.appendChild(point);

            tileRack.append(letterTile);
            animateLetterTile();
        }  
    } 
}

export function drawBoards() {
    drawSquares();
    tileRack();
}
