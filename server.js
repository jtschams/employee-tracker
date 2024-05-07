const express = require('express');
const { handler } = require('./lib');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(async function(req, res, next) {
    try {
        handler() 
    } catch (error) { next(error) }

});

app.listen(PORT);
  