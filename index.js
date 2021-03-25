"use strict";

function drawBoard() {
    let boardList = [
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

    let section = document.querySelector('.board');

    for (let x=0; x<boardList.length; x++) {
        let tile = document.createElement('div');
        
        if (boardList[x] === '3ws') {
            tile.className = 'specialTileRed';
            section.append(tile);
        } else if (boardList[x] === '2ls') {
            tile.className = 'specialTileCyan';
            section.append(tile);
        } else if (boardList[x] === '3ls') {
            tile.className = 'specialTileBlue';
            section.append(tile);
        } else if (boardList[x] === '2ws') {
            tile.className = 'specialTilePink';
            section.append(tile);
        } else if (boardList[x] === '') {
            tile.className = 'boardTiles';
            section.append(tile);
        } else {
            tile.className = 'specialTilePink';
            section.append(tile);
        }
    }

    // for (let x=0; x<225; x++) {
    //     let tile = document.createElement('div');
    //     tile.className = 'boardTiles';
    //     section.append(tile);
    // }
}

function tileRack() {
    let section = document.querySelector('.tileRack');
    
    for (let x=0; x<7; x++) {
        let tile = document.createElement('div');
        tile.className = 'rackTiles';
        tile.id = `tile${Math.floor(Math.random() * 200)}`;
        tile.draggable = true;
        section.append(tile)
    }  
}

function randomLetters() {
    const alphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    let randomNumber = Math.floor(Math.random() * alphabet.length);
    let randomLetter = alphabet[randomNumber];
    return randomLetter;
}

function tileRackLetters() {
    let letterTiles = document.querySelectorAll('.rackTiles');

    for (let i=0; i<letterTiles.length; i++) {
        letterTiles[i].textContent = randomLetters();
    }
}

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

function boardTileHandler() {
    const tiles = document.querySelectorAll('div.specialTileRed, div.specialTileCyan, div.boardTiles');
    for (const tile of tiles) {
        tile.addEventListener('dragover', dragOverHandler);
        tile.addEventListener('drop', dropHandler);
    }
}

function tileRackHandler() {
    const tiles = document.querySelectorAll('.tileRack');
    for (const tile of tiles) {
        tile.addEventListener('dragover', dragOverHandler);
        tile.addEventListener('drop', dropHandler);
    }
} 

function dragStart() {
    const tiles = document.querySelectorAll('.rackTiles');
    for (const tile of tiles) {
        tile.addEventListener('dragstart', dragStartHandler);
    }
}

function calls() {
    drawBoard();
    tileRack();
    tileRackLetters();

    boardTileHandler();
    tileRackHandler();
    dragStart();
}

window.addEventListener('load', calls);


