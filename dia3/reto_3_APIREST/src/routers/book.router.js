const { Router } = require('express');
const router = Router();
const bookController = require('../controller/book.controller');

router.get('/book', bookController.welcome); //Obtiene un libro por ID
router.get('/books', bookController.getBooksOrID); //Obtiene un libro por ID u Obtiene toda la lista
router.post('/books', bookController.addBook); // Añade un nuevo libro
router.put('/books', bookController.updateBook); // Modifica un libro existente
router.delete('/books', bookController.deleteBook); // Elimina un libro

module.exports = router;