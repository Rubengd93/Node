const { response } = require('../app');
const { booksArray } = require('../models/book');

let books = [
    {
      id_book: 1,
      id_user: 1,
      title: "Cien años de soledad",
      type: "Novela",
      author: "Gabriel García ",
      price: 18.50,
      photo: "https://m.media-amazon.com/images/I/91TvVQS7loL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id_book: 2,
      id_user: 2,
      title: "Fahrenheit 451",
      type: "Ciencia ficción",
      author: "Ray Bradbury",
      price: 15.00,
      photo: "https://m.media-amazon.com/images/I/61z7RDG3OIL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id_book: 3,
      id_user: 3,
      title: "1984",
      type: "En agosto nos vemos",
      author: "Gabriel García Márquez",
      price: 19.84,
      photo: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1702644850-81yVRB3auPL.jpg?crop=1xw:1xh;center,top&resize=980:*",
    }
  ];
  
  function welcome (req, res) {
    res.send("Bienvenido a mi servidor")
}

function getBooksOrID(req, res) {
    // Asegúrate de que 'booksArray' esté importado y accesible aquí
    const bookId = parseInt(req.query.id_book);

    if (bookId) {
        // Busca el libro por ID
        const book = books.find((b) => b.id_book === bookId);
        if (!book) {
            // Si no se encuentra el libro, envía un mensaje de error
            return res.status(404).send({ error: true, message: `No existe el libro con el id: ${bookId}` });
        }
        // Si se encuentra el libro, envía los datos del libro
        return res.status(200).send(book);
    }

    // Si no se proporciona un 'id_book', envía toda la lista de libros
    if (books.length > 0) {
        return res.status(200).send(books);
    } else {
        // Si no hay libros, envía un mensaje de error
        return res.status(404).send({ error: true, message: "No hay ningún libro disponible" });
    }
}



// Añade un nuevo libro en la lista de libros
function addBook(req, res) {

    let response;

    if (books) {
        const newBook = req.body;
        books.push(newBook);
        response = { error: false, code: 200, message: "Libro añadido correctamentea a tu lista", books }
    } else {
        response = { error: false, code: 200, message: "Libro añadido correctamentea a tu lista vacía", books }
    }
    res.send(response)
}


// Modifica los datos de un libro cuyo id coincida con el pasado por parámetro 
function updateBook(req, res) {

    let response;

    const bookId = parseInt(req.query.id_book);
    const updatedBook = req.body;
    const index = books.findIndex((b) => b.id_book === bookId);
    if (index === -1) {
        response = { error: true, code: 200, message: `No existe ningún libro con el id: ${req.query.id_book} para modificar` }
    } else { 
        if (updatedBook) {
            books[index] = {
                ...books[index],
                ...req.body ?? {}
            }
            response = { error: false, code: 200, message: `El libro con el id: ${req.query.id_book} se ha modificado correctamente`, books }
        } 
    }
    res.send(response)
}

// Elimina a el libro de la lista cuyo id coincida con el pasado por parámetro. 
function deleteBook(req, res) {
    const bookId = parseInt(req.query.id_book);
    const index = books.findIndex((book) => book.id_book === bookId);

    if (index === -1) {
        // Si no se encuentra el libro, envía un mensaje de error con el código de estado 404
        return res.status(404).send({ error: true, message: `No existe ningún libro con el id: ${bookId} para eliminar` });
    } else {
        // Elimina el libro y envía una confirmación de éxito
        books.splice(index, 1);
        return res.status(200).send({ error: false, message: `El libro con el id: ${bookId} se ha eliminado correctamente` });
    }
}

module.exports = { welcome, getBooksOrID, addBook, updateBook, deleteBook };
