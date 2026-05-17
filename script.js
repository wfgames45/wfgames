document.addEventListener("DOMContentLoaded", () => {
    // CAPTURA DE BOTONES Y MODALES
    const openLoginBtn = document.getElementById("open-login-btn");
    const closeLoginBtn = document.getElementById("close-login-btn");
    const loginModal = document.getElementById("login-modal");
    
    const formLogin = document.getElementById("form-login");
    const btnGoogle = document.getElementById("btn-google-auth");
    const linkForgot = document.getElementById("link-forgot-pass");
    
    const secretTrigger = document.getElementById("secret-admin-trigger");
    const adminPanel = document.getElementById("admin-panel");
    const closeAdminBtn = document.getElementById("close-admin-btn");

    // --- ENTRAR A INICIAR SESIÓN (CORREGIDO) ---
    if (openLoginBtn) {
        openLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loginModal.style.display = "flex"; // Abre ventana de login
        });
    }

    if (closeLoginBtn) {
        closeLoginBtn.addEventListener("click", () => {
            loginModal.style.display = "none"; // Cierra ventana de login
        });
    }

    // --- FUNCIÓN VERIFICADORA MODO DUEÑO ---
    const verificarAccesoMaster = (passwordIntroducido) => {
        if (passwordIntroducido === "wftime") {
            loginModal.style.display = "none"; 
            adminPanel.style.display = "flex"; // Abre el panel de administrador
        } else {
            alert("Contraseña de administrador incorrecta.");
        }
    };

    // Validación mediante formulario normal
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailOrUser = document.getElementById("login-email").value;
        const pass = document.getElementById("login-password").value;

        if (pass === "wftime" || emailOrUser === "admin") {
            verificarAccesoMaster(pass);
        } else {
            alert(`Iniciando sesión de usuario para: ${emailOrUser}`);
            loginModal.style.display = "none";
        }
    });

    // Validación usando el emoji de control secreto 🎮
    if (secretTrigger) {
        secretTrigger.addEventListener("click", () => {
            const claveAdmin = prompt("WFGAMES SECURITY\nIntroduce la clave del Dueño:");
            if (claveAdmin) {
                verificarAccesoMaster(claveAdmin);
            }
        });
    }

    // Cerrar panel de administrador
    if (closeAdminBtn) {
        closeAdminBtn.addEventListener("click", () => {
            adminPanel.style.display = "none";
        });
    }

    // --- ENTRADA CON GOOGLE ---
    btnGoogle.addEventListener("click", () => {
        alert("Abriendo ventana emergente de Google Account...\n(Simulado)");
        
        const sesionUsuario = {
            nombre: "Jugador WFGames",
            email: "jugador@gmail.com"
        };
        
        localStorage.setItem("session_wfgames", JSON.stringify(sesionUsuario));
        alert(`¡Sesión vinculada con éxito! Bienvenido ${sesionUsuario.nombre}`);
        loginModal.style.display = "none";
    });

    // --- RECUPERACIÓN DE CUENTA ---
    linkForgot.addEventListener("click", (e) => {
        e.preventDefault();
        const correo = prompt("SOPORTE WFGAMES\n\nIngresa tu correo electrónico para enviarte las instrucciones de recuperación:");
        
        if (correo) {
            if (correo.includes("@")) {
                alert(`Te hemos enviado un correo de recuperación a: ${correo}\nRevisa tu bandeja de entrada.`);
            } else {
                alert("Por favor ingresa un correo electrónico válido.");
            }
        }
    });
});