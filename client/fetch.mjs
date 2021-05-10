"use strict";
import { warningMessages, givePoints, wordPlayed } from './game.mjs';
export async function checkWordExists(word) {
    let validWords = [];
    let invalidWords = [];

    const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + word;
    const response = await fetch(url);
    
    switch (response.status) {
        // If the word is valid points will be given, the letter tiles user placed will be not moveable anymore
        // the letter tiles user played will be reduced from the letter tile bag, new letter tiles will be 
        // added to the tile rack
        case 200:
            console.log(word, " is a valid word.");
            givePoints(word);
            wordPlayed(word);
            break;
        case 400:
            console.log(word, " is too short.");
            break;
        case 404:
            console.log(word, " is not a valid word.");
            warningMessages(word, "404");
            break;
        default:
            console.log("Word checking service is unavailable at this time.");
    }
}
