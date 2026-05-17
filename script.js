document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTOS DEL DOM
    const openLoginBtn = document.getElementById("open-login-btn");
    const closeLoginBtn = document.getElementById("close-login-btn");
    const loginModal = document.getElementById("login-modal");
    const formLogin = document.getElementById("form-login");
    const btnGoogle = document.getElementById("btn-google-auth");
    const linkForgot = document.getElementById("link-forgot-pass");
    
    const secretTrigger = document.getElementById("secret-admin-trigger");
    const adminPanel = document.getElementById("admin-panel");
    const closeAdminBtn = document.getElementById("close-admin-btn");
    
    const cartCountEl = document.getElementById("cart-count");
    const searchInput = document.getElementById("search-input");
    
    let cartItemsCount = 0;

    // --- MANEJO DEL INTERFAZ DEL MODAL LOGIN ---
    openLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "flex";
    });

    closeLoginBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // --- SECCIÓN MODO DUEÑO (SISTEMA ADMINISTRATIVO) ---
    const verificarAccesoMaster = (passwordIntroducido) => {
        if (passwordIntroducido === "wftime") {
            loginModal.style.display = "none"; // Cierra el login si estaba abierto
            adminPanel.style.display = "flex";  // Abre el panel Pro
        } else {
            alert("Acceso inválido del sistema.");
        }
    };

    // Al enviar el formulario de login tradicional
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailOrUser = document.getElementById("login-email").value;
        const pass = document.getElementById("login-password").value;

        // Comprobación si es el administrador logueándose por el input clásico
        if (pass === "wftime" || emailOrUser === "admin") {
            verificarAccesoMaster(pass);
        } else {
            alert(`Sesión normal iniciada para el usuario: ${emailOrUser}`);
            loginModal.style.display = "none";
        }
    });

    // Evento al presionar el emoji oculto del control de juegos 🎮
    if (secretTrigger) {
        secretTrigger.addEventListener("click", () => {
            const claveAdmin = prompt("SISTEMA DE SEGURIDAD WFGAMES\nIngresa la clave de verificación maestra:");
            if (claveAdmin) {
                verificarAccesoMaster(claveAdmin);
            }
        });
    }

    // Cerrar panel administrativo
    closeAdminBtn.addEventListener("click", () => {
        adminPanel.style.display = "none";
    });

    // --- FLUJO DE AUTENTICACIÓN GOOGLE ---
    btnGoogle.addEventListener("click", () => {
        alert("Sincronizando con los servidores de Google...\n(Flujo simulado OAuth2)");
        
        const usuarioGoogleSimulado = {
            nombre: "Usuario Google WFGames",
            email: "cuenta.usuario@gmail.com"
        };
        
        localStorage.setItem("session_wfgames", JSON.stringify(usuarioGoogleSimulado));
        alert(`¡Vínculo correcto! Autenticado como: ${usuarioGoogleSimulado.nombre}`);
        loginModal.style.display = "none";
    });

    // --- RECUPERACIÓN DE CUENTAS ---
    linkForgot.addEventListener("click", (e) => {
        e.preventDefault();
        const correoRecuperacion = prompt("ASISTENCIA DE CUENTAS WFGAMES\n\nPor favor, ingresa tu correo electrónico registrado para restaurar el acceso:");
        
        if (correoRecuperacion) {
            if (correoRecuperacion.includes("@") && correoRecuperacion.includes(".")) {
                alert(`Solicitud procesada.\nSe ha enviado un correo con las directrices de restablecimiento de cuenta a: ${correoRecuperacion}`);
            } else {
                alert("La cadena de texto introducida no coincide con una dirección de correo válida.");
            }
        }
    });

    // --- INTERACCIONES COMPLEMENTARIAS (CARRITO Y BUSCADOR) ---
    document.querySelectorAll(".btn-add-cart").forEach(button => {
        button.addEventListener("click", () => {
            cartItemsCount++;
            cartCountEl.textContent = cartItemsCount;
        });
    });

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll(".game-card").forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const tags = card.querySelector(".tags").textContent.toLowerCase();
            if (title.includes(query) || tags.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});