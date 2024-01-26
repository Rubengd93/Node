const object = {
    name:"Ruben",
    surname:"Vera",
    age:30
};

const fs = require('fs');

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
    });
  });
});
  
  
