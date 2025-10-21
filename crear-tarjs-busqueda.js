
const zonaTarj = document.querySelector("#zona_tarj");
const selectPag = document.createElement("div");
selectPag.id = "selectPag";
zonaTarj.after(selectPag);

let pagActual=1;
const inputBusqueda = document.querySelector("#busqueda");
let artistasCompleto = [];
let artistasFiltrado = [];
const tarjsPorPag = 9;

fetch("artistasBD.json")
.then(res => res.json())
.then(data => {
    artistasCompleto = data.artistas;
    artistasFiltrado = artistasCompleto;
    crearTarjs();
})
.catch(err => console.error("Error: ",err));

function crearTarjs(){
    //Pagina y muestra tarjetas de artistas
    const inicio = (pagActual -1) * tarjsPorPag;
    const fin = inicio + tarjsPorPag;
    const artistasPagina = artistasFiltrado.slice(inicio, fin);

    zonaTarj.innerHTML = "";

    artistasPagina.forEach(art => {
        const nombreArtista = art.nombre;
        const link_img = art.imagen;
        const tarj = `<a href="index-artista.html" class="link_artista" data-artista="${nombreArtista}">
                    <div class="tarj_art">
                        <p>${nombreArtista}</p>
                        <img src="${link_img}" alt="Imagen de ${nombreArtista}">
                    </div></a>`;
            
        zonaTarj.innerHTML += tarj;
    });
    const totalPags = Math.ceil(artistasFiltrado.length / tarjsPorPag);
    mostrarSelectPags(totalPags); //muestra los botones de las paginas

    //Evento guarda artista para el index-artista
    document.querySelectorAll(".link_artista").forEach(link => {
        link.addEventListener("click", (e) => {
            const nombre = e.currentTarget.dataset.artista;
            localStorage.setItem("artistaSeleccionado", nombre);
        });
    });

}

function mostrarSelectPags(total){
    selectPag.innerHTML = "";
    for(let i = 1; i<= total; i++){
        const boton = document.createElement("button");
        boton.textContent = i;
        boton.className = (i === pagActual) ? "active" : "";
        //cuando clickeas uno de los botones llama a crearTarjs para que haga la pagina en cuestion
        boton.addEventListener("click", () => {
            pagActual = i;
            crearTarjs();
        });
        selectPag.appendChild(boton);
    }
}

inputBusqueda.addEventListener("input", (e) => {
    //Evento de busqueda
    const texto = e.target.value.toLowerCase().trim();
    pagActual = 1;

    if(texto === ""){
        artistasFiltrado = artistasCompleto;
    }else{
        artistasFiltrado = artistasCompleto.filter(art => art.nombre.toLowerCase().trim().includes(texto));
    }
    crearTarjs();
});





















//Logica para traer del json solo lo que se va a mostrar en la pagina, obsoleto por la busqueda que hace q tengas q traer todo :(
/*function crearTarjs(pagina){
    //crea las paginas con las tarjetas
    fetch('artistasBD.json')
    .then(res => res.json())
    .then(data => {
        
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
        mostrarSelectPags(pagina, totalPags); //muestra los botones de las paginas
    })
    .catch(err => console.error("Error: ",err));
}

function mostrarSelectPags(actual, total){
    
    selectPag.innerHTML="";
    for(let i = 1; i<= total; i++){
        const boton = document.createElement("button");
        boton.textContent = i;
        boton.className = (i === actual) ? "active" : "";
        //cuando clickeas uno de los botones llama a crearTarjs para que haga la pagina en cuestion
        boton.addEventListener("click", () => {
            pagActual = i;
            crearTarjs(i);
        });
        selectPag.appendChild(boton);
    }
}

crearTarjs(pagActual); //Arranca en la primer pgina
*/
