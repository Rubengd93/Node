const express = require('express');
const cors = require('cors');
const booksRouter = require('./routers/book.router');
const handleError = require('./error/errorHandling');
const app = express();

app.set('port', 3000);

app.use(cors());
app.use(express.json()); // para parsear el cuerpo de las solicitudes POST y PUT
app.use(booksRouter);
app.use(handleError);

module.exports = app;

