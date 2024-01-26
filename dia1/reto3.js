const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Escribe tu nombre: ", (name) => {
  rl.question("Escribe tu apellido: ", (surname) => {
    rl.question("Escribe tu edad: ", (age) => {
      const object = {
        name: name,
        surname: surname,
        age: age
      };

      fs.writeFile("person.json", JSON.stringify(object), (err) => {
        if (err) throw err;
        console.log("El archivo ha sido creado exitosamente.");

        fs.readFile("person.json", (err, data) => {
          if (err) throw err;
          const object = JSON.parse(data);
          console.log(object);

          fs.unlink("person.json", (err) => {
            if (err) throw err;
            console.log("El archivo ha sido borrado exitosamente.");
            rl.close();
          });
        });
      });
    });
  });
});
