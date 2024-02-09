let Book = require('../models/book');

let book = null;


function welcome (req, res) {
    res.send('Bienvenido a nuestro servidor');
}

function getBook(req, res) {
    let response;
    if (book) {
        response = book;
    } else {
        response = { error: true, code: 200, message: "No existe el libro creado"}
    }
    res.send(response);
}

function newBook(req, res) {
    if (!book) {
        book = req.body;
        response = { error: false, code: 200, message: "El libro se ha creado correctamente", book };
    } else {
        response = { error: true, code: 200, message: "El libro ya existe" };
    }
    res.send(response);
}

function editBook(req, res){
    let response;

    if (book) {
        book = {
            ...book,
            ...req.body ?? {}
        }
        response = { error: false, code: 200, message: "El libro se ha modificado correctamente", book}
    } else {
        response = { error: true, code: 200, message: "El libro ya existe" }
    }
    res.send(response)
}

function deleteBook(req, res) {
    if (book) {
        book = null; // Elimina el libro
        let response = { error: false, code: 200, message: 'Libro eliminado exitosamente' };
        res.status(200).send(response);
    } else {
        let response = { error: true, code: 200, message: "No existe el libro para eliminar" };
        res.send(response);
    }
}

module.exports = {welcome, getBook, newBook, editBook, deleteBook};