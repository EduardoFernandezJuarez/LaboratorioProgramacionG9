const path = require("path");
const fs = require("fs");
const principal = path.join(__dirname, '../public');


// Funcion para obtener el artista por el nombre dado
exports.getArtista = (req, res) => {

    // obtener el nombre del artista solicitado
    const artistId = req.params.nombre.toLocaleLowerCase();
    
    // leer el archivo JSON
    const rutaArchivo = path.join(__dirname, "../../public/jsons/artistasBD.json");
    const data = fs.readFileSync(rutaArchivo, "utf8");
    const { artistas } = JSON.parse(data);

    // buscamos el artista 
    const artista = artistas.find((item) => {
    return item.nombre.toLowerCase() === artistId;
    });

    // esto es por si no encuentra el artista
    if (artista === undefined) {
        console.log("Artista no encontrado FROM GETARTISTA");
        return res.status(404).send({ error: "Artista no encontrado FROM GETARTISTA" });
    }

  res.json(artista);
};

// FUncion para obtener todos los artistas
exports.getArtistas = (req, res) => {
    // leer el archivo JSON para usarlo en crear-index-artista.js
    const rutaArchivo = path.join(__dirname, "../../public/jsons/artistasBD.json");
    let data = fs.readFileSync(rutaArchivo, "utf8");
    data = JSON.parse(data);
    res.json(data);
};

// Funcion para obtener los artistas relacionados dependiendo el genero
exports.getArtistasRelacionados = (req, res) => {
    // obtener el nombre del artista solicitado
    const artistId = req.params.nombre.toLocaleLowerCase();
    const genero = req.params.genero;

    // leer el archivo JSON
    const rutaArchivo = path.join(__dirname, "../../public/jsons/artistasBD.json");
    const data = fs.readFileSync(rutaArchivo, "utf8");
    const { artistas } = JSON.parse(data);

    // buscamos el artista 
    const artista = artistas.find((item) => {
    return item.nombre.toLowerCase() === artistId;
    });

    // esto es por si no encuentra el artista
    if (artista === undefined) {
        console.log("Artista no encontrado FROM GETARTISTASRELACIONADOS");
        return res.status(404).send({ error: "Artista no encontrado FROM GETARTISTASRELACIONADOS" });
    }

    // busca los 3 artistas q compartan generos y no sean el propio artista
    const artistasDelGenero = artistas.filter(a => a.nombre != artista.nombre && a.generos.includes(genero)).slice(0,3);

    res.json(artistasDelGenero);
};

// Funcion para renderizar la pagina del artista
exports.getIndexArtista = (req, res) => {
    res.sendFile(path.join(__dirname,'../../public/html/index-artista.html'));
};

exports.postArtista = (req, res) => {

    //Obtnemos los datos ingresados en el formulario
    const nombre = req.body.nombre;
    const genero = req.body.genero;
    const imagen = req.body.imagen;

    // leemos el archivo JSOn de los artistas
    const rutaArchivo = path.join(__dirname, "../../public/jsons/artistasBD.json");
    const data = fs.readFileSync(rutaArchivo, "utf8");
    const { artistas } = JSON.parse(data);

    const repetido = artistas.find((artista) => {
        return artista.nombre.toLocaleLowerCase() === nombre.toLowerCase();
    });

    // verificamos si el artista ya existe
    if (repetido != undefined){
        console.log("Artista con nombre ya registrado, ingrese otro nombre");
        /* Modificar en algun funturo o averiguar como mejorar mensaje de error */
        return res.status(404).send({ error: `Artista con nombre ${nombre} ya registado, ingrese otro nombre`});
    }else{
        // Modificamos el array de artistas y agregamos el nuevo artista
        artistas.push({
            nombre: nombre,
            generos: [genero],
            imagen: "/imagenes/" + imagen
        });
        
        // Escribimos el nuevo array en el archivo JSON
        fs.writeFileSync(rutaArchivo, JSON.stringify({ artistas }, null, 2));
        
        //guardamos la imagen en la carpeta de imagenes con multer, para mas adelante implementar esta fucnionalidad
        
        console.log(`Artista ${nombre}, genero ${genero} con imagen ${imagen} reistrado!`);
    }

    res.redirect("http://localhost:4000/");
};