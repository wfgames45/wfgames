// --- FUNCIÓN MAESTRA DEL MODO DUEÑO ---
function verificarAccesoMaster(passwordIntroducido) {
    if (passwordIntroducido === "wftime") {
        document.getElementById("login-modal").style.display = "none"; 
        document.getElementById("admin-panel").style.display = "flex"; // Muestra el panel admin
    } else {
        alert("Contraseña de administrador incorrecta.");
    }
}

// --- CONFIGURACIÓN DE LOS EVENTOS DIRECTOS DE BOTONES ---

// 1. Abrir modal de Login (Desde la barra superior)
const botonAbrirLogin = document.getElementById("open-login-btn");
if (botonAbrirLogin) {
    botonAbrirLogin.onclick = function(e) {
        e.preventDefault();
        document.getElementById("login-modal").style.display = "flex";
    };
}

// 2. Cerrar modal de Login (Con el botón 'X')
const botonCerrarLogin = document.getElementById("close-login-btn");
if (botonCerrarLogin) {
    botonCerrarLogin.onclick = function() {
        document.getElementById("login-modal").style.display = "none";
    };
}

// 3. Formulario tradicional (Entrar normal o Modo Owner)
const formularioLogin = document.getElementById("form-login");
if (formularioLogin) {
    formularioLogin.onsubmit = function(e) {
        e.preventDefault();
        const usuarioInput = document.getElementById("login-email").value;
        const claveInput = document.getElementById("login-password").value;

        // Comprobación de seguridad
        if (claveInput === "wftime" || usuarioInput === "admin") {
            verificarAccesoMaster(claveInput);
        } else {
            alert("Sesión normal iniciada para el usuario: " + usuarioInput);
            document.getElementById("login-modal").style.display = "none";
        }
    };
}

// 4. Clic directo en el Control Secreto 🎮 (Acceso directo Owner)
const disparadorSecreto = document.getElementById("secret-admin-trigger");
if (disparadorSecreto) {
    disparadorSecreto.onclick = function() {
        const claveAdmin = prompt("WFGAMES SECURITY\nIntroduce la clave del Dueño:");
        if (claveAdmin) {
            verificarAccesoMaster(claveAdmin);
        }
    };
}

// 5. Cerrar Panel de Administrador
const botonCerrarAdmin = document.getElementById("close-admin-btn");
if (botonCerrarAdmin) {
    botonCerrarAdmin.onclick = function() {
        document.getElementById("admin-panel").style.display = "none";
    };
}

// 6. Botón de autenticación con Google
const botonGoogleAuth = document.getElementById("btn-google-auth");
if (botonGoogleAuth) {
    botonGoogleAuth.onclick = function() {
        alert("Sincronizando con los servidores de Google mediante Firebase Auth...\n(Flujo de cuenta simulado)");
        alert("¡Vínculo correcto! Bienvenido de vuelta.");
        document.getElementById("login-modal").style.display = "none";
    };
}

// 7. Enlace para recuperación de contraseñas o cuentas
const linkRecuperarCuenta = document.getElementById("link-forgot-pass");
if (linkRecuperarCuenta) {
    linkRecuperarCuenta.onclick = function(e) {
        e.preventDefault();
        const correoIngresado = prompt("SOPORTE WFGAMES\n\nIngresa tu correo de Google registrado para enviarte las instrucciones de recuperación:");
        if (correoIngresado) {
            if (correoIngresado.includes("@")) {
                alert("Proceso completado. Se ha enviado un enlace seguro a: " + correoIngresado);
            } else {
                alert("La dirección ingresada no parece un formato de correo válido.");
            }
        }
    };
}