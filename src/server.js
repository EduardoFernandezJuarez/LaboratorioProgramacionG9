const express = require("express");

const app = express();
const path = require('path');
const fs = require('fs');
const port = 4000;

const principal = path.join(__dirname, '../public');

app.use(express.static(principal));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.get("/artista/:nombre", (req, res) => {

  // obtener el nombre del artista solicitado
  const artistId = req.params.nombre.toLocaleLowerCase();
  
  // leer el archivo JSON
  const rutaArchivo = path.join(__dirname, "../public/jsons/artistasBD.json");
  const data = fs.readFileSync(rutaArchivo, "utf8");
  const { artistas } = JSON.parse(data);

  // buscamos el artista 
  const artista = artistas.find((item) => {
  return item.nombre.toLowerCase() === artistId;
  });

  // esto es por si no encuentra el artista
  if (artista === undefined) {
    console.log("Artista no encontrado");
    return res.status(404).send({ error: "Artista no encontrado" });
  }

  res.json(artista);
});

app.get("/artistas", (req, res) => {
  // leer el archivo JSON para usarlo en crear-index-artista.js
  const rutaArchivo = path.join(__dirname, "../public/jsons/artistasBD.json");
  let data = fs.readFileSync(rutaArchivo, "utf8");
  data = JSON.parse(data);
  res.json(data);
});


// Busca los artistas relacionados por genero
app.get("/artistasRelacionados/:genero/:nombre", (req, res) => {
  // obtener el nombre del artista solicitado
  const artistId = req.params.nombre.toLocaleLowerCase();
  const genero = req.params.genero;

  // leer el archivo JSON
  const rutaArchivo = path.join(__dirname, "../public/jsons/artistasBD.json");
  const data = fs.readFileSync(rutaArchivo, "utf8");
  const { artistas } = JSON.parse(data);

  // buscamos el artista 
  const artista = artistas.find((item) => {
  return item.nombre.toLowerCase() === artistId;
  });

  // esto es por si no encuentra el artista
  if (artista === undefined) {
    console.log("Artista no encontrado");
    return res.status(404).send({ error: "Artista no encontrado" });
  }

  // busca los 3 artistas q compartan generos y no sean el propio artista
  const artistasDelGenero = artistas.filter(a => a.nombre != artista.nombre && a.generos.includes(genero)).slice(0,3);

  res.json(artistasDelGenero);
});

app.get("/crear-index-artista", (req, res) => {

  res.sendFile(path.join(__dirname, '../public/html/index-artista.html'));
});


app.listen(port, () => {
  console.log(`Pruebe el servidor en un navegador accediendo a http://localhost:4000`);
});