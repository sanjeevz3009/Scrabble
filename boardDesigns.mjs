"use strict";
import { drawSquares } from './drawBoards.mjs';

const boardDesigns = [
    ["3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws",
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
    "3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws",],

    ["", "", "", "2ls", "", "", "", "", "", "", "", "2ls", "", "", "",
    "", "2ws", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "2ws", "",
    "", "", "2ws", "", "", "", "2ls", "", "2ls", "", "", "", "2ws", "", "",
    "2ls", "", "", "2ws", "", "", "", "2ls", "", "", "", "2ws", "", "", "2ls",
    "", "", "", "", "2ws", "", "", "", "", "", "2ws", "", "", "", "",
    "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "", "", "", "2ls", "", "", "", "star", "", "", "", "2ls", "", "", "",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "",
    "", "", "", "", "2ws", "", "", "", "", "", "2ws", "", "", "", "",
    "2ls", "", "", "2ws", "", "", "", "2ls", "", "", "", "2ws", "", "", "2ls",
    "", "", "2ws", "", "", "", "2ls", "", "2ls", "", "", "", "2ws", "", "",
    "", "2ws", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "2ws", "",
    "", "", "", "2ls", "", "", "", "", "", "", "", "2ls", "", "", "",],
];

export function pickDesign(dropDownID) {
    const divs = document.querySelector('.scrabbleBoard');
    while (divs.firstChild) {
        divs.removeChild(divs.firstChild);
    }
    drawSquares(boardDesigns[dropDownID]);
    console.log("ID", dropDownID);
}

