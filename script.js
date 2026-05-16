// La tienda inicia vacía por orden del Owner
let listaJuegos = [];

let totalCarrito = 0.00;
let esOwner = false;

function renderizarTienda() {
    const contenedor = document.getElementById('contenedor-juegos');
    contenedor.innerHTML = ""; // Limpiar pantalla

    // Si no hay juegos, la tienda se queda limpia y despejada, sin letreros molestos
    if (listaJuegos.length === 0) {
        return;
    }

    // Dibujar los juegos si es que existen en la lista
    listaJuegos.forEach(juego => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-juego';

        let contenidoTarjeta = `
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
        document.getElementById('btn-admin').innerText = "⭐ Modo Owner Activo";
        renderizarTienda();
    } else {
        alert("Contraseña incorrecta. Acceso denegado.");
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
        alert("Por favor, completa los campos obligatorios (Nombre, Categoría y Precio).");
        return;
    }

    const nuevoJuego = {
        id: Date.now(), 
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        icono: icono
    };

    listaJuegos.push(nuevoJuego);
    renderizarTienda();

    document.getElementById('nuevo-nombre').value = "";
    document.getElementById('nueva-categoria').value = "";
    document.getElementById('nuevo-precio').value = "";
    document.getElementById('nuevo-emoji').value = "";
}

// Ejecución inicial
renderizarTienda();