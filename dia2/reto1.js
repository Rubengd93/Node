const fs = require("fs/promises");

async function createPerson() {
  const obj = {
    name: "John",
    surname: "Doe",
    age: 30
  };

  try {
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

createPerson();