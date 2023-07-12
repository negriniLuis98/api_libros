const express = require('express');
const librosRouter = express.Router();
let libros = require('./data');

librosRouter.get('/', (req, res) => {
    res.json(libros);
});

librosRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const libro = libros.find(el => el.id == id);
    if (libro) {
        console.log(libro);
        res.json({ ...libro });
    } else {
        res.json({ error: 'No existe libro con la ID ingresada.' });
    }
    
});

librosRouter.post('/', (req, res) => {
    const { id, titulo, autor } = req.body;

    for (libro of libros) {
        if (libro.id == id) {
            return res.json({ error: 'Ya existe un libro con la ID proporcionada.' });
        }
    }

    libros.push({ id: parseInt(id), titulo, autor });
    res.json({ mensaje: 'Se ha añadido el libro exitosamente a la lista.' });
    
});

librosRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { toUpdate } = req.body;
    const i = libros.findIndex(el => el.id == id);
    if (i > -1) {
        for (attr in toUpdate) {
            if (libros[i].hasOwnProperty(attr)) {
                libros[i][attr] = toUpdate[attr];
            } else {
                return res.json({ error: 'La propiedad que se ha intentado actualizar no existe.' });
            }
            
        }
    
        res.json({ mensaje: 'Se ha actualizado la información del libro exitosamente.' });
    } else {
        res.json({ error: 'No existe libro con la ID ingresada.' });
    }
    
});

librosRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const i = libros.findIndex(el => el.id == id);
    if (i > -1) {
        libros.splice(i, 1);
        console.log(libros);
        res.json({ mensaje: 'Se ha eliminado el libro de la lista exitosamente.' });
    } else {
        res.json({ error: 'No existe libro con la ID ingresada.' });
    }
    
});

module.exports = librosRouter;