"use strict";
import { warningMessages } from './game.mjs';
import { validateWords, removeOldWords } from './wordRecognition.mjs';
// import { validateWords, removeOldWords } from './game.mjs';
// Check if the word user made is a valid word
export async function checkWordExists(words) {
    console.log(words);
    let validWords = [];
    let invalidWords = [];

    for (let i=0; i<words.length; i++) {
        const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + words[i];
        const response = await fetch(url);
        
        switch (response.status) {
            // If the word is valid points will be given, the letter tiles user placed will be not moveable anymore
            // the letter tiles user played will be reduced from the letter tile bag, new letter tiles will be 
            // added to the tile rack
            case 200:
                console.log(words[i], " is a valid word.");
                validWords.push(words[i]);
                break;
            case 400:
                console.log(words[i], " is too short.");
                break;
            case 404:
                console.log(words[i], " is not a valid word.");
                warningMessages(words[i], "404");
                invalidWords.push(words[i]);
                break;
            default:
                console.log("Word checking service is unavailable at this time.");
        }
    }
    validateWords(validWords);
    removeOldWords(invalidWords);
}
