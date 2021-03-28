"use strict";

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
            yCoord += 1;
        }

        if (tracker===15) {
            xCoord += 1;
            tracker = 0;
            yCoord = 0;
        }

        if (boardList[x] === '3ws') {
            square.className = 'specialSquareRed';
            square.setAttribute("x", xCoord);
            square.setAttribute("y", yCoord);

            scrabbleBoard.append(square);
        } else if (boardList[x] === '2ls') {
            square.className = 'specialSquareCyan';
            square.setAttribute("x", xCoord);
            square.setAttribute("y", yCoord);

            scrabbleBoard.append(square);
        } else if (boardList[x] === '3ls') {
            square.className = 'specialSquareBlue';
            square.setAttribute("x", xCoord);
            square.setAttribute("y", yCoord);

            scrabbleBoard.append(square);
        } else if (boardList[x] === '2ws') {
            square.className = 'specialSquarePink';
            square.setAttribute("x", xCoord);
            square.setAttribute("y", yCoord);

            scrabbleBoard.append(square);
        } else if (boardList[x] === '') {
            square.className = 'boardSquareGrey';
            square.setAttribute("x", xCoord);
            square.setAttribute("y", yCoord);

            scrabbleBoard.append(square);
        } else {
            square.className = 'starSquarePink';
            square.setAttribute("x", xCoord);
            square.setAttribute("y", yCoord);

            scrabbleBoard.append(square);
        }
    } 
}

export function tileRack() {
    const tileRack = document.querySelector('.tileRack');
    
    for (let x=0; x<7; x++) {
        const letterTile = document.createElement('p');
        letterTile.className = 'letterTile';
        letterTile.id = `tile${Math.floor(Math.random() * 200)}`;
        letterTile.draggable = true;
        tileRack.append(letterTile)
    }  
}

export function drawBoards() {
    drawSquares();
    tileRack();
}
