const express = require("express");
// Utilizado para definir las rtuas del artista especifico
const router = express.Router();
// Importa los controladores del artista
const artistaController = require("../controllers/artista.controller");

// Ruta para obtener el json de todos los artistas
router.get("/artistas", artistaController.getArtistas);

// Ruta para crear un nuevo artista
router.post("/crearArtista", artistaController.postArtista);

// Ruta para renderizar la pagina del artista
router.get("/crear-index-artista", artistaController.getIndexArtista);

//Ruta para obtener los artistas relacionados segun su genero
router.get("/artistasRelacionados/:genero/:nombre", artistaController.getArtistasRelacionados);

// Ruta para obtener el artista segun el nombre 
router.get("/:nombre", artistaController.getArtista);

module.exports = router;
