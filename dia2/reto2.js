const readline = require("readline");
const fs = require("fs/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createPerson() {
  try {
    const name = await questionAsync("Introduce tu nombre: ");
    const surname = await questionAsync("Introduce tu apellido: ");
    const age = await questionAsync("Introduce tu edad: ");

    const obj = {
      name: name,
      surname: surname,
      age: age
    };

    await fs.writeFile("person.json", JSON.stringify(obj));
    console.log("El archivo ha sido creado exitosamente.");

    const data = await fs.readFile("person.json");
    const objFromFile = JSON.parse(data);
    console.log(objFromFile);

    await fs.unlink("person.json");
    console.log("El archivo ha sido borrado exitosamente.");
  } catch (err) {
    console.error(err);
  }
}

function questionAsync(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

createPerson();