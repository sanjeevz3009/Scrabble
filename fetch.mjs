import { letterTileTracker, clearLetterTileTracker, dragHandler } from './dragHandler.mjs';
import { givePoints } from './singlePlayer.mjs';
import { tileRack } from './drawBoards.mjs';

export async function checkWordExists(word) {
    const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
    const response = await fetch(url);
    
    switch (response.status) {
        case 200:
            console.log(word, " is a valid word.");
            dragFalse();
            givePoints(word);
            tileRack();
            dragHandler();
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