const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const port = 4000;

const principal = path.join(__dirname, '../public');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(principal));
//Para usar Json
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

// Middleware para parsear el cuerpo de las solicitudes POST
// Permite que Express pueda entender los datos enviados por un formulario HTML tradicional.
app.use(express.urlencoded({ extended: true }));


// Testeo para metodo POST
app.post("/test", (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const result = num1 + num2;
    console.log(`EL RESULTADO DE SUMAR ${num1} Y ${num2} ES ${result}`);
    res.send(`EL resultado de ${num1} + ${num2} = ${result}`);
});



// Rutas utilizadas de artista
app.use("/api/artista", require("../src/routes/artista.routes"));

app.listen(port, () => {
  console.log(`Pruebe el servidor en un navegador accediendo a http://localhost:4000`);
});

