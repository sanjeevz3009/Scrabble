"use strict";
import { wordsRecognition } from './game.mjs';
import { pickDesign } from './boardDesigns.mjs';

function dragStart() {
    const letterTiles = document.querySelectorAll('.letterTile');
    for (const letterTile of letterTiles) {
        letterTile.addEventListener('dragstart', dragStartHandler);
    }
}

function dragStartHandler(e) {
    const data = e.target.id;
    e.dataTransfer.setData('text/plain', data);
}

function dragOverHandler(e) {
    e.preventDefault();
}

function dragEnter() {
    this.style.backgroundColor = "greenyellow";
}

function dragLeave() {
    this.style.backgroundColor = "";

}

// To keep track of the letter tiles being played
export let letterTileTracker = [];
export let specialTileTracker = [];

// To clear the letter tiles tracker once a word have been successfully played
export function clearLetterTileTracker() {
    letterTileTracker = [];
    specialTileTracker = [];
}

function dropHandler(e) {
    specialTileTracker = [];
    const data = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(data);
    const letterTileID = dragged.id;

    if (e.currentTarget.className === "tileRack") {
        dragged.style.margin = "2px 0.1em";
        e.currentTarget.append(dragged);
        if (letterTileTracker.includes(dragged.id)) {
            const indexPos = letterTileTracker.indexOf(dragged.id);
            letterTileTracker.splice(indexPos, 1);
            specialTileTracker.splice(indexPos, 1);
        }
    } else {
        if (!e.currentTarget.children.length > 0) {
            dragged.style.margin = 0;
            e.currentTarget.textContent = "";
            e.currentTarget.append(dragged);
            letterTileTracker.push(letterTileID);
            const uniqueSet = new Set(letterTileTracker);
            letterTileTracker = [...uniqueSet];
        }   
    }

    for (const letterTile of letterTileTracker) {
        specialTileTracker.push(document.getElementById(letterTile).parentElement.className);
    }

    console.log("Tile tracker: ", letterTileTracker);
    console.log("Tile tracker: ", specialTileTracker);

    const specialSquares = document.querySelectorAll('.specialSquareRed, .specialSquarePink, .specialSquareCyan, .specialSquareBlue');

    // For loop to put back the special tile text on the squares on the board if the 
    // user decides to move the letter tile
    for (const specialSquare of specialSquares) {
        if (!specialSquare.hasChildNodes()) {
            if (specialSquare.className === "specialSquareRed") {
                specialSquare.textContent = "3WS";
            } else if (specialSquare.className === "specialSquarePink") {
                specialSquare.textContent = "2WS";
            } else if (specialSquare.className === "specialSquareCyan") {
                specialSquare.textContent = "2LS";
            } else {
                specialSquare.textContent = "3LS";
            }
        }
    }
}

export function tileRackHandler() {
    const letterTiles = document.querySelectorAll('.tileRack');
    for (const letterTile of letterTiles) {
        letterTile.addEventListener('dragover', dragOverHandler);
        letterTile.addEventListener('drop', dropHandler);
    }
} 

function boardTileHandler() {
    const boardSquares = document.querySelectorAll('div.boardSquareGrey, div.specialSquareRed, div.specialSquareCyan, div.specialSquareBlue, div.specialSquarePink, div.starSquarePink');
    for (const boardSquare of boardSquares) {
        boardSquare.addEventListener('dragover', dragOverHandler);
        boardSquare.addEventListener('dragenter', dragEnter);
        boardSquare.addEventListener('dragleave', dragLeave);
        boardSquare.addEventListener('drop', dropHandler);
    }
}

function handleSubmitClick() {
    const submit = document.querySelector('.submit');
    submit.addEventListener('click', wordsRecognition);
}

function getDropDownID(e) {
    pickDesign(e.target.id);
}


function boardDesignsHandler() {
    const dropDown = document.querySelectorAll('.dropdown');
    for (const design of dropDown) {
        design.addEventListener("click", getDropDownID);
    }
}

export function dragHandler() {
    boardTileHandler();
    tileRackHandler();
    dragStart();
    handleSubmitClick();
    boardDesignsHandler();  
}