import { letterTileTracker, clearLetterTileTracker } from './dragHandler.mjs';
import { givePoints } from './singlePlayer.mjs';

export async function checkWordExists(word) {
    const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
    const response = await fetch(url);
    
    switch (response.status) {
        case 200:
            console.log(word, " is a valid word.");
            dragFalse();
            givePoints(word);
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
    // console.log(letterTileTracker);
    // console.log(letterTileTracker.length);
    for (const letterTile of letterTileTracker) {
        const p = document.getElementById(letterTile);
        p.draggable = false;
    }
    clearLetterTileTracker();
}