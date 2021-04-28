import { wordsRecognition } from './singlePlayer.mjs';

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

export let letterTileTracker = [];

export function clearLetterTileTracker() {
    letterTileTracker = [];
}

function dropHandler(e) {
    const data = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(data);

    const squareClassName = ["boardSquareGrey", "specialSquareRed", "specialSquareCyan", "specialSquareBlue", "specialSquarePink", "starSquarePink"];
    const bool = squareClassName.includes(e.currentTarget.className);

    const letterTileID = dragged.id;

    if (e.currentTarget.className === "tileRack") {
        dragged.style.margin = "2px 0.1em";
        e.currentTarget.append(dragged);
        // console.log(dragged.id);
        if (letterTileTracker.includes(dragged.id)) {
            const indexPos = letterTileTracker.indexOf(dragged.id);
            letterTileTracker.splice(indexPos, 1);
            // console.log(letterTileTracker);
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
    console.log("Tile tracker: ", letterTileTracker);

    const redSquares = document.querySelectorAll('.specialSquareRed');

    for (const redSquare of redSquares) {
        // console.log(redSquare);
        if (!redSquare.hasChildNodes()) {
            redSquare.textContent = "3WS";
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

function handleSubmitClick(xCoord, yCoord) {
    const submit = document.querySelector('.submit');
    submit.addEventListener('click', wordsRecognition);
}

export function dragHandler() {
    boardTileHandler();
    tileRackHandler();
    dragStart();
    handleSubmitClick();
}