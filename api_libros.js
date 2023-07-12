const express = require('express');
const librosRouter = require('./routes.js');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/libros', librosRouter);

app.listen(port, () => {
    console.log(`Enlace al servidor web: http://localhost:${port}/`);
});