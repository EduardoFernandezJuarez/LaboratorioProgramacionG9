
const zonaTarj = document.querySelector("#zona_tarj");
const selectPag = document.createElement("div");
selectPag.id = "selectPag";
zonaTarj.after(selectPag);


let pagActual=1;




function crearTarjs(pagina){

    fetch('artistasBD.json')
    .then(res => res.json())
    .then(data => {
        const tarjsPorPag = 9;
        const inicio = (pagina - 1) * tarjsPorPag;
        const fin = inicio + tarjsPorPag;
        const artistasPagina = data.artistas.slice(inicio, fin);

        zonaTarj.innerHTML = "";
        artistasPagina.forEach(art => {
            const nombreArtista = art.nombre;
            const link_img = art.imagen;

            const tarj = `<a href="index-artista.html" class="link_artista">
                    <div class="tarj_art">
                        <p>${nombreArtista}</p>
                        <img src="${link_img}" alt="Imagen de ${nombreArtista}">
                    </div></a>`;
            
            zonaTarj.innerHTML += tarj;
        });

        const totalPags = Math.ceil(data.artistas.length / tarjsPorPag);
        mostrarSelectPags(pagina, totalPags);
    })
    .catch(err => console.error("Error: ",err));
}

function mostrarSelectPags(actual, total){
    selectPag.innerHTML="";
    for(let i = 1; i<= total; i++){
        const boton = document.createElement("button");
        boton.textContent = i;
        boton.className = (i === actual) ? "active" : "";
        boton.addEventListener("click", () => {
            pagActual = i;
            crearTarjs(i);
        });
        selectPag.appendChild(boton);
    }
}

crearTarjs(pagActual); //Arranca en la primer pgina

