const zonaTarj = document.querySelector("#zona_tarj");

fetch('artistasBD.json').then(res => res.json()).then(data => crearTarjs(data.artistas)).catch(error => console.error("Error: ", error));


function crearTarjs(artistas){
    zonaTarj.innerHTML = "";
    artistas.forEach(art => {
        const nombreArtista = art.nombre;
        const link_img = art.imagen;

        const tarj = `<a href="index-artista.html" class="link_artista">
                <div class="tarj_art">
                    <p>${nombreArtista}</p>
                    <img src="${link_img}" alt="Imagen de ${nombreArtista}">
                </div></a>`;
        
        zonaTarj.innerHTML += tarj;
    });
}


