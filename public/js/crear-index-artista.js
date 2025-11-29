const main = document.querySelector("main");
const head = document.querySelector("head");
const zonaGen = document.createElement("section");
zonaGen.id = "zona_gen";
main.innerHTML="";
main.appendChild(zonaGen);
// const artistaSeleccionado = localStorage.getItem("artistaSeleccionado");

const urlParams = new URLSearchParams(window.location.search);
const nombreArtistaParametro = urlParams.get("nombre");

const title = document.createElement("title");
title.innerHTML=`Dynomo: ${nombreArtistaParametro}`;
head.appendChild(title);



fetch(`/api/artista/${nombreArtistaParametro}`)//agregado antes estaba "jsons/artistasBD.json"
.then(res => res.json())
.then(data => {
    // const artistas = data.artistas;
    // const artista = artistas.find(a => a.nombre === artistaSeleccionado);

    const artista = data;
    
    artista.generos.forEach(genero => {
        // //busca los 3 artistas q compartan generos y no sean el propio artista
        // const artistasDelGenero = artistas.filter(a => a.nombre != artista.nombre && a.generos.includes(genero)).slice(0,3);

        fetch(`/api/artista/artistasRelacionados/${genero}/${artista.nombre}`)
        .then(res => res.json())
        .then(artistasDelGenero => {
            if(artistasDelGenero.length > 0){
                //lo creo de a poco para ir agregandole las cosas (se podria hacer en un string en una variable como las tarj_art)
                const tarjGenero = document.createElement("div");
                tarjGenero.classList.add("tarj_gen"); //creo tarjeta de genero
                const titulo = document.createElement("h2");
                titulo.textContent = genero.toUpperCase();
                tarjGenero.appendChild(titulo);
                const zonaTarj = document.createElement("div");
                zonaTarj.classList.add("zona_tarj");
                
                //creo tarjetas de artistas que van dentro de la tarjeta de genero
                artistasDelGenero.forEach(a => {
                    const nombreArtista = a.nombre;
                    const link_img = a.imagen;
                    const tarj = document.createElement("div");
                    tarj.classList.add("tarj_art");
                    tarj.innerHTML=`<p>${nombreArtista}</p>
                                    <img src="${link_img}" alt="Imagen de ${nombreArtista}">`;
                    const linkArtista = document.createElement("a");
                    linkArtista.href = `/api/artista/crear-index-artista?nombre=${nombreArtista}`;
                    linkArtista.classList.add("link_artista");
                    linkArtista.appendChild(tarj);
                    zonaTarj.appendChild(linkArtista);
                });
                tarjGenero.appendChild(zonaTarj);
                zonaGen.appendChild(tarjGenero);

                const separar = document.createElement("div");
                separar.classList.add("separar");
                zonaGen.appendChild(separar);
            }
        });
    });
})
.catch(err => console.error("Error: ",err));

/* Viendo que no tenemos acceso al artistas similares de spotify se podriamos implementar
algun metodo para setear similitud entre artistas de manera arbitraria
1.Que compartan generos y cuanto mas generos compartan mejor
2.Agregar atributos dentro de cada genero entonces poder calcular que tanto se parecen dentro de el genero especifico
3.Que cada artista tenga una similitud calculada con cada otro artista de ese genero (grafo con pesos, que sea dentro de cada genero porq sino es un monton)

atributos pueden ser tipo mood, que tan movido es(?*/