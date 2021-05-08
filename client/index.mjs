import { drawBoards } from './drawBoards.mjs';
import { dragHandler } from './dragHandler.mjs';
import { pickDesign } from './boardDesigns.mjs';

pickDesign(0);
drawBoards();
dragHandler();
