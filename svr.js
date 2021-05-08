"use strict";
import express from 'express';

const app = express();
app.use(express.static('AP-CW'));
app.listen(8080);