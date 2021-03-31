import { wordsRecognition } from './singlePlayer.mjs';
// import { wordsRecognition2 } from './singlePlayer.mjs';

function dragStartHandler(e) {
    const data = e.target.id;
    e.dataTransfer.setData('text/plain', data);
}

function dragOverHandler(e) {e.preventDefault();}

let letterTileTracker = [];
console.log("letterTileTracker", letterTileTracker);

export let lastID = 0;
export let xCoord = 0;
export let yCoord = 0;
export let boolTileRack = false;

function dropHandler(e) {
    const data = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(data);

    const squareClassName = ["boardSquareGrey", "specialSquareRed", "specialSquareCyan", "specialSquareBlue", "specialSquarePink", "starSquarePink"];
    const bool = squareClassName.includes(e.currentTarget.className);

    const letterTileID = dragged.id;
    if (bool === true ) {
        letterTileTracker.push(letterTileID);
    }

    if (e.currentTarget.className === "tileRack") {
        dragged.style.margin = "2px 0.1em";
        e.currentTarget.append(dragged);
        boolTileRack = true;
        console.log(boolTileRack);
    } else {
        dragged.style.margin = 0;
        e.currentTarget.append(dragged);
        boolTileRack = false;
        console.log(boolTileRack);
    }

    if (bool === true) {
        lastID = letterTileTracker[letterTileTracker.length-1];

        const id = document.getElementById(lastID).parentNode;
        xCoord = id.dataset.x;
        yCoord = id.dataset.y;
    } 
    console.log("letterTileTracker", letterTileTracker);
}

export function boardTileHandler() {
    const boardSquares = document.querySelectorAll('div.boardSquareGrey, div.specialSquareRed, div.specialSquareCyan, div.specialSquareBlue, div.specialSquarePink, div.starSquarePink');
    for (const boardSquare of boardSquares) {
        boardSquare.addEventListener('dragover', dragOverHandler);
        boardSquare.addEventListener('drop', dropHandler);
    }
}

export function tileRackHandler() {
    const letterTiles = document.querySelectorAll('.tileRack');
    for (const letterTile of letterTiles) {
        letterTile.addEventListener('dragover', dragOverHandler);
        letterTile.addEventListener('drop', dropHandler);
    }
} 

export function dragStart() {
    const letterTiles = document.querySelectorAll('.letterTile');
    for (const letterTile of letterTiles) {
        letterTile.addEventListener('dragstart', dragStartHandler);
    }
}

export function handleSubmitClick(xCoord, yCoord) {
    const submit = document.querySelector('.submit');
    submit.addEventListener('click', wordsRecognition);
}

export function dragHandler() {
    boardTileHandler();
    tileRackHandler();
    dragStart();
    handleSubmitClick();
}