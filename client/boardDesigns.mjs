"use strict";
import { dragHandler } from './eventHandler.mjs';
import { drawSquares, tileRack } from './drawBoards.mjs';
import { reset } from './game.mjs';

// Various scrabble board designs
export const boardDesigns = [
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
    "3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws"],

    ["", "", "", "3ws", "", "", "3ls", "", "3ls", "", "", "3ws", "", "", "",
    "", "", "2ls", "", "", "2ws", "", "", "", "2ws", "", "", "2ls", "", "",
    "", "2ls", "", "", "2ls", "", "", "", "", "", "2ls", "", "", "2ls", "",
    "3ws", "", "", "3ls", "", "", "", "2ws", "", "", "", "3ls", "", "", "3ws",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "", "2ws", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "2ws", "",
    "3ls", "", "", "", "2ls", "", "", "", "", "", "2ls", "", "", "", "3ls",
    "", "", "", "2ws", "", "", "", "star", "", "", "", "2ws", "", "", "",
    "3ls", "", "", "", "2ls", "", "", "", "", "", "2ls", "", "", "", "3ls",
    "", "2ws", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "2ws", "",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "3ws", "", "", "3ls", "", "", "", "2ws", "", "", "", "3ls", "", "", "3ws",
    "", "2ls", "", "", "2ls", "", "", "", "", "", "2ls", "", "", "2ls", "",
    "", "", "2ls", "", "", "2ws", "", "", "", "2ws", "", "", "2ls", "", "",
    "", "", "", "3ws", "", "", "3ls", "", "3ls", "", "", "3ws", "", "", ""],

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
    "", "", "", "2ls", "", "", "", "", "", "", "", "2ls", "", "", ""],

    ["3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws",
    "", "", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "", "",
    "", "", "", "", "", "", "2ls", "", "2ls", "", "", "", "", "", "",
    "2ls", "", "", "", "", "", "", "2ls", "", "", "", "", "", "", "2ls",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "3ws", "", "", "2ls", "", "", "", "star", "", "", "", "2ls", "", "", "3ws",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "3ls", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "2ls", "", "", "", "", "", "", "2ls", "", "", "", "", "", "", "2ls",
    "", "", "", "", "", "", "2ls", "", "2ls", "", "", "", "", "", "",
    "", "", "", "", "", "3ls", "", "", "", "3ls", "", "", "", "", "",
    "3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws"],

    ["3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws",
    "", "2ws", "", "", "", "", "", "", "", "", "", "", "", "2ws", "",
    "", "", "2ws", "", "", "", "2ls", "", "2ls", "", "", "", "2ws", "", "",
    "2ls", "", "", "2ws", "", "", "", "2ls", "", "", "", "2ws", "", "", "2ls",
    "", "", "", "", "2ws", "", "", "", "", "", "2ws", "", "", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "3ws", "", "", "2ls", "", "", "", "star", "", "", "", "2ls", "", "", "3ws",
    "", "", "2ls", "", "", "", "2ls", "", "2ls", "", "", "", "2ls", "", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
    "", "", "", "", "2ws", "", "", "", "", "", "2ws", "", "", "", "",
    "2ls", "", "", "2ws", "", "", "", "2ls", "", "", "", "2ws", "", "", "2ls",
    "", "", "2ws", "", "", "", "2ls", "", "2ls", "", "", "", "2ws", "", "",
    "", "2ws", "", "", "", "", "", "", "", "", "", "", "", "2ws", "",
    "3ws", "", "", "2ls", "", "", "", "3ws", "", "", "", "2ls", "", "", "3ws"]
];

// Function to change the board design, when the user decides to change it
export function pickDesign(dropDownID) {
    reset();
    tileRack('.tileRack');
    drawSquares(boardDesigns[dropDownID]);
    dragHandler();
}

