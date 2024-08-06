let page = 1;
const perPage = 3;
let loading = false;

async function fetchProyectos(page, perPage) {
    const response = await fetch('data/proyectos.json');
    const proyectos = await response.json();
    return proyectos.slice((page - 1) * perPage, page * perPage);
}

function cargarMasProyectos() {
    if (loading) return;
    loading = true;
    fetchProyectos(page, perPage).then(proyectos => {
        proyectos.forEach(proyecto => {
            const proyectoDiv = document.createElement('div');
            proyectoDiv.classList.add('proyecto');
            proyectoDiv.innerHTML = `
                <div class="img-proyecto">
                    <img src="${proyecto.img}" alt="img del proyecto">
                </div>
                <div class="descripcion-proyecto">
                    <h3>${proyecto.nombre}</h3>
                    <p class="link"><a href="${proyecto.link}">link al proyecto</a></p>
                    <p>${proyecto.descripcion}</p> 
                </div>
            `;
            document.getElementById('portafolio').appendChild(proyectoDiv);
        });
        page++;
        loading = false;
    });
}

// Evento para detectar cuando se llega al final del contenedor
document.getElementById('portafolio').addEventListener('scroll', function() {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        cargarMasProyectos();
    }
});

// Cargar los primeros proyectos inicialmente
cargarMasProyectos();
