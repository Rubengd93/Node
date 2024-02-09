

//Instalar modulo express
const express = require('express');
const app = express();


// Debe mostrar por consola ‘Petición recibida del cliente’ 
// por cada conexión que se haga desde el cliente.
app.use((req, res, next) => {
  console.log('Petición del cliente recibida');
  next();
});

// Debe mostrar por consola la url, método y el user-agent por el que se está haciendo la petición.
app.use((req, res, next) => {
  console.log(`URL: ${req.url}`);
  console.log(`Método: ${req.method}`);
  console.log(`User-Agent: ${req.headers['user-agent']}`);
  next();
});

// Le retorne al usuario un mensaje del tipo application/json con el status code 200 
// y un mensaje con este contenido: { ok: true, message: ‘Recibido!’ }
app.get('/', (req, res) => {
  res.status(200).json({ ok: true, message: 'Recibido!' });
});

// Si alguien entra en /bye debe devolver un mensaje del tipo application/json, 
// statusCode: 200 y un mensaje con este contenido: { ok: true, message: ‘Adios!’ }

app.get('/bye', (req, res) => {
  res.status(200).json({ ok: true, message: 'Adios!' });
});

// Iniciar Servidor
app.listen(2000, () => {
  console.log('Servidor iniciado en el puerto 2000');
});