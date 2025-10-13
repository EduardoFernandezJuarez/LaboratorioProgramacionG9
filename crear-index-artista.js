const main = document.querySelector("main");
const zonaGen = document.createElement("section");
zonaGen.id = "zona_gen";
main.innerHTML="";
main.appendChild(zonaGen);
const artistaSeleccionado = localStorage.getItem("artistaSeleccionado");

fetch("artistasBD.json")
.then(res => res.json())
.then(data => {
    const artistas = data.artistas;
    const artista = artistas.find(a => a.nombre === artistaSeleccionado);
    
    artista.generos.forEach(genero => {
        //busca los 3 artistas q compartan generos y no sean el propio artista
        const artistasDelGenero = artistas.filter(a => a.nombre != artista.nombre && a.generos.includes(genero)).slice(0,3);

        if(artistasDelGenero.length > 0){
            const tarjGenero = document.createElement("div");
            tarjGenero.classList.add("tarj_gen"); //creo tarjeta de genero
            const titulo = document.createElement("h2");
            titulo.textContent = genero.toUpperCase();
            tarjGenero.appendChild(titulo);
            const zonaTarj = document.createElement("div");
            zonaTarj.classList.add("zona_tarj");
                    
            artistasDelGenero.forEach(a => {
                const nombreArtista = a.nombre;
                const link_img = a.imagen;
                const tarj = document.createElement("div");
                tarj.classList.add("tarj_art");
                tarj.innerHTML=`<p>${nombreArtista}</p>
                                <img src="${link_img}" alt="Imagen de ${nombreArtista}"`;
                zonaTarj.appendChild(tarj);
            });
            tarjGenero.appendChild(zonaTarj);
            zonaGen.appendChild(tarjGenero);

            const separar = document.createElement("div");
            separar.classList.add("separar");
            zonaGen.appendChild(separar);
        }
    });
})
.catch(err => console.error("Error: ",err));
