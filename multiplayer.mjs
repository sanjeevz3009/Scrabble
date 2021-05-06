"use strict";
import { tileRack } from './drawBoards.mjs';
import { dragHandler } from './dragHandler.mjs';
import { pickDesign } from './boardDesigns.mjs';

function multiplayer() {
    pickDesign();
    tileRack('.tileRack');
    tileRack('.tileRack2');
    dragHandler();
}

multiplayer();



