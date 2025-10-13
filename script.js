const zonaTarj = document.querySelector("#zona_tarj");

const bd = "artistasBD.json";

function crearTarjs(artistas){
    zonaTarj.innerHTML = "";
    artistas.forEach(art => {
        const nombreArtista = art.nombre;
        const link_img = art.imagen;

        const tarj = `<a href="index-artista.html" class="link_artista">
                <div class="tarj_art">
                    <p>${nombreArtista}</p>
                    <img src="${link_img}" alt="${nombreArtista}">
                </div></a>`;
    });
}

