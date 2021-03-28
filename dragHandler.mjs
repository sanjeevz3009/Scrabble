import { wordsRecognition } from './singlePlayer.mjs';

function dragStartHandler(e) {
    const data = e.target.id;
    e.dataTransfer.setData('text/plain', data);
}

function dragOverHandler(e) {e.preventDefault();}

function dropHandler(e) {
    const data = e.dataTransfer.getData('text/plain');
    const dragged = document.getElementById(data);

    if (e.currentTarget.className === "tileRack") {
        dragged.style.margin = "2px 0.1em";
    } else {
        dragged.style.margin = 0;
    }
    e.currentTarget.append(dragged);
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

export function handleSubmitClick() {
    const submit = document.querySelector('.submit');
    submit.addEventListener('click', wordsRecognition);
}

export function dragHandler() {
    boardTileHandler();
    tileRackHandler();
    dragStart();
    handleSubmitClick();
}