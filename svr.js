"use strict";
import express from 'express';

// Serves the necessaray files
const app = express();
app.use(express.static('client'));
app.listen(8080);