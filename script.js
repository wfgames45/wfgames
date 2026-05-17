let listaJuegos = [];
let totalCarrito = 0.00;
let esOwner = false;
let filtroBusqueda = "";

function renderizarTienda() {
    const contenedor = document.getElementById('contenedor-juegos');
    contenedor.innerHTML = ""; 

    const juegosFiltrados = listaJuegos.filter(juego => 
        juego.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );

    if (juegosFiltrados.length === 0) {
        contenedor.innerHTML = `<p style="color: #4f5d6c; text-align:center; width:100%; padding-top: 20px;">No hay títulos disponibles en este momento.</p>`;
        return;
    }

    juegosFiltrados.forEach(juego => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-juego';

        const estrella = juego.favorito ? "⭐" : "☆";

        let contenidoTarjeta = `
            <button class="btn-favorito" onclick="alternarFavorito(${juego.id})">${estrella}</button>
            <img src="${juego.imagen}" alt="Cover" class="imagen-portada">
            <h3>${juego.nombre}</h3>
            <p class="categoria">${juego.categoria}</p>
            <div class="compra-bloque">
                <p class="precio">$${juego.precio.toFixed(2)}</p>
                <button class="btn-comprar" onclick="agregarAlCarrito(${juego.precio})">Añadir</button>
            </div>
        `;

        if (esOwner) {
            contenidoTarjeta += `
                <button class="btn-eliminar" onclick="eliminarJuego(${juego.id})">Eliminar Registro</button>
            `;
        }

        tarjeta.innerHTML = contenidoTarjeta;
        contenedor.appendChild(tarjeta);
    });
}

function filtrarJuegos() {
    filtroBusqueda = document.getElementById('barra-busqueda').value;
    renderizarTienda();
}

function alternarFavorito(idJuego) {
    listaJuegos = listaJuegos.map(juego => {
        if (juego.id === idJuego) {
            juego.favorito = !juego.favorito;
        }
        return juego;
    });
    renderizarTienda();
}

function pedirNotificaciones() {
    if (!("Notification" in window)) {
        alert("Navegador no compatible.");
        return;
    }
    Notification.requestPermission().then(permiso => {
        if (permiso === "granted") {
            alert("Avisos activados.");
        }
    });
}

function agregarAlCarrito(precio) {
    totalCarrito += precio;
    document.getElementById('total-carrito').innerText = totalCarrito.toFixed(2);
}

function autenticarOwner() {
    const passwordIngresada = prompt("Contraseña de Administrador:");
    
    if (passwordIngresada === "Elias24/6/2013") {
        esOwner = true;
        alert("Acceso concedido. Panel Owner Activado.");
        document.getElementById('panel-agregar-juego').style.display = 'block';
        document.getElementById('btn-admin').innerText = "Owner Activo";
        renderizarTienda();
    } else {
        alert("Contraseña incorrecta.");
    }
}

function eliminarJuego(idJuego) {
    listaJuegos = listaJuegos.filter(juego => juego.id !== idJuego);
    renderizarTienda(); 
}

// Muestra el nombre del archivo seleccionado abajo del botón
function actualizarNombreArchivo() {
    const inputImagen = document.getElementById('nueva-imagen');
    const indicadorNombre = document.getElementById('nombre-archivo-seleccionado');
    if(inputImagen.files.length > 0) {
        indicadorNombre.innerText = "📁 Archivo listo: " + inputImagen.files[0].name;
    }
}

function crearNuevoJuego() {
    const nombre = document.getElementById('nuevo-nombre').value;
    const categoria = document.getElementById('nueva-categoria').value;
    const precio = parseFloat(document.getElementById('nuevo-precio').value);
    const inputImagen = document.getElementById('nueva-imagen');

    if (!nombre || !categoria || isNaN(precio)) {
        alert("Completa los campos obligatorios.");
        return;
    }

    // Si el usuario subió un archivo, lo procesamos con FileReader
    if (inputImagen.files.length > 0) {
        const lector = new FileReader();
        
        lector.onload = function(evento) {
            const imagenCodificada = evento.target.result; // Aquí está tu foto convertida a código web
            
            const nuevoJuego = {
                id: Date.now(), 
                nombre: nombre,
                categoria: categoria,
                precio: precio,
                imagen: imagenCodificada,
                favorito: false
            };

            listaJuegos.push(nuevoJuego);
            renderizarTienda();
            limpiarFormulario();
        };
        
        lector.readAsDataURL(inputImagen.files[0]); // Convierte el archivo real
    } else {
        // Si no subió foto, usa una por defecto gris
        const nuevoJuego = {
            id: Date.now(), 
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            imagen: "https://via.placeholder.com/210x260",
            favorito: false
        };
        listaJuegos.push(nuevoJuego);
        renderizarTienda();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById('nuevo-nombre').value = "";
    document.getElementById('nueva-categoria').value = "";
    document.getElementById('nuevo-precio').value = "";
    document.getElementById('nueva-imagen').value = "";
    document.getElementById('nombre-archivo-seleccionado').innerText = "";
}

renderizarTienda();