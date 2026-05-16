// Juegos iniciales de prueba para hacer funcionar el buscador y favoritos
let listaJuegos = [
    { id: 1, nombre: "Minecraft", categoria: "Survival / Construcción", precio: 29.99, icono: "🧱", favorito: false },
    { id: 2, nombre: "GTA V", categoria: "Acción / Mundo Abierto", precio: 39.99, icono: "🚗", favorito: false },
    { id: 3, nombre: "Elden Ring", categoria: "RPG / Fantasía", precio: 59.99, icono: "⚔️", favorito: false }
];

let totalCarrito = 0.00;
let esOwner = false;
let filtroBusqueda = "";

function renderizarTienda() {
    const contenedor = document.getElementById('contenedor-juegos');
    contenedor.innerHTML = ""; 

    // Filtrar los juegos según lo que el usuario escriba en el buscador
    const juegosFiltrados = listaJuegos.filter(juego => 
        juego.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );

    if (juegosFiltrados.length === 0) {
        contenedor.innerHTML = `<p style="color: #888; text-align:center; width:100%;">No se encontraron juegos con ese nombre.</p>`;
        return;
    }

    juegosFiltrados.forEach(juego => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-juego';

        // Cambiar el corazón si es favorito o no
        const corazon = juego.favorito ? "❤️" : "🤍";

        let contenidoTarjeta = `
            <button class="btn-favorito" onclick="alternarFavorito(${juego.id})">${corazon}</button>
            <div class="imagen-placeholder">${juego.icono}</div>
            <h3>${juego.nombre}</h3>
            <p class="categoria">${juego.categoria}</p>
            <p class="precio">$${juego.precio.toFixed(2)}</p>
            <button class="btn-comprar" onclick="agregarAlCarrito(${juego.precio})">Agregar al Carrito</button>
        `;

        if (esOwner) {
            contenidoTarjeta += `
                <button class="btn-eliminar" onclick="eliminarJuego(${juego.id})">❌ Eliminar Juego</button>
            `;
        }

        tarjeta.innerHTML = contenidoTarjeta;
        contenedor.appendChild(tarjeta);
    });
}

// Función del Buscador
function filtrarJuegos() {
    filtroBusqueda = document.getElementById('barra-busqueda').value;
    renderizarTienda();
}

// Función de Favoritos
function alternarFavorito(idJuego) {
    listaJuegos = listaJuegos.map(juego => {
        if (juego.id === idJuego) {
            juego.favorito = !juego.favorito;
        }
        return juego;
    });
    renderizarTienda();
}

// Pedir permiso para notificaciones
function pedirNotificaciones() {
    if (!("Notification" in window)) {
        alert("Este navegador no soporta notificaciones de escritorio.");
        return;
    }
    
    Notification.requestPermission().then(permiso => {
        if (permiso === "granted") {
            alert("¡Gracias! Ahora recibirás las alertas de ofertas en WFGAMES.");
            new Notification("WFGAMES", { body: "¡Notificaciones activadas con éxito!" });
        } else {
            alert("Has bloqueado las notificaciones.");
        }
    });
}

function agregarAlCarrito(precio) {
    totalCarrito += precio;
    document.getElementById('total-carrito').innerText = totalCarrito.toFixed(2);
}

function autenticarOwner() {
    const passwordIngresada = prompt("Por favor, ingresa la contraseña de Administrador:");
    
    if (passwordIngresada === "Elias24/6/2013") {
        esOwner = true;
        alert("¡Acceso concedido, Bienvenido Owner de WFGAMES!");
        document.getElementById('panel-agregar-juego').style.display = 'block';
        document.getElementById('btn-admin').innerText = "⭐ Owner";
        renderizarTienda();
    } else {
        alert("Contraseña incorrecta.");
    }
}

function eliminarJuego(idJuego) {
    listaJuegos = listaJuegos.filter(juego => juego.id !== idJuego);
    renderizarTienda(); 
}

function crearNuevoJuego() {
    const nombre = document.getElementById('nuevo-nombre').value;
    const categoria = document.getElementById('nueva-categoria').value;
    const precio = parseFloat(document.getElementById('nuevo-precio').value);
    const icono = document.getElementById('nuevo-emoji').value || "🎮";

    if (!nombre || !categoria || isNaN(precio)) {
        alert("Por favor, completa los campos.");
        return;
    }

    const nuevoJuego = {
        id: Date.now(), 
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        icono: icono,
        favorito: false
    };

    listaJuegos.push(nuevoJuego);
    renderizarTienda();

    document.getElementById('nuevo-nombre').value = "";
    document.getElementById('nueva-categoria').value = "";
    document.getElementById('nuevo-precio').value = "";
    document.getElementById('nuevo-emoji').value = "";
}

renderizarTienda();