"use strict";
import { letterTileTracker, clearLetterTileTracker, dragHandler } from './dragHandler.mjs';
import { givePoints, removeLetters } from './game.mjs';
import { tileRack } from './drawBoards.mjs';

export async function checkWordExists(word) {
    const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
    const response = await fetch(url);
    
    switch (response.status) {
        case 200:
            console.log(word, " is a valid word.");
            givePoints(word);
            dragFalse();
            tileRack(".tileRack");
            dragHandler();
            removeLetters(word);
            break;
        case 400:
            console.log(word, " is too short.");
            break;
        case 404:
            console.log(word, " is not a valid word.");
            break;
        default:
            console.log("Word checking service is unavailable at this time.");
    }
}

function dragFalse() {
    for (const letterTile of letterTileTracker) {
        const p = document.getElementById(letterTile);
        p.draggable = false;
    }
    clearLetterTileTracker();
}