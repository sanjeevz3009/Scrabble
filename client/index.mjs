import { drawBoards } from './drawBoards.mjs';
import { dragHandler } from './eventHandler.mjs';
import { pickDesign } from './boardDesigns.mjs';

pickDesign(0);
drawBoards();
dragHandler();
