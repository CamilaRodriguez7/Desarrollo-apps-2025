// --- 1. SELECCIÓN DE ELEMENTOS DEL HTML ---
// Aquí guardamos en variables los elementos con los que vamos a interactuar.
const lengthInput = document.getElementById('length');
const includeUppercaseCheckbox = document.getElementById('include-uppercase');
const includeLowercaseCheckbox = document.getElementById('include-lowercase');
const includeNumbersCheckbox = document.getElementById('include-numbers');
const includeSymbolsCheckbox = document.getElementById('include-symbols');
const generateButton = document.getElementById('generate-button');
const passwordModal = document.getElementById('password-modal');
const closeModalButton = document.getElementById('close-modal');
const generatedPasswordSpan = document.getElementById('generated-password');

// --- 2. DEFINICIÓN DE LOS CARACTERES DISPONIBLES ---
// Creamos cadenas de texto con todos los caracteres posibles para cada categoría.
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// --- 3. LA FUNCIÓN PRINCIPAL PARA GENERAR LA CONTRASEÑA ---
function generarContrasena() {
    // Obtenemos la longitud deseada del input.
    const longitud = parseInt(lengthInput.value);
    
    // Creamos una variable para guardar todos los caracteres permitidos.
    let caracteresPermitidos = '';
    
    // Verificamos qué checkboxes están marcados y añadimos los caracteres correspondientes.
    if (includeUppercaseCheckbox.checked) {
        caracteresPermitidos += uppercaseChars;
    }
    if (includeLowercaseCheckbox.checked) {
        caracteresPermitidos += lowercaseChars;
    }
    if (includeNumbersCheckbox.checked) {
        caracteresPermitidos += numberChars;
    }
    if (includeSymbolsCheckbox.checked) {
        caracteresPermitidos += symbolChars;
    }

    // Si no se selecciona ningún tipo de caracter, mostramos un aviso y no hacemos nada.
    if (caracteresPermitidos.length === 0) {
        alert('Por favor, selecciona al menos un tipo de caracter.');
        return; // Detiene la ejecución de la función.
    }

    // Aquí guardaremos la contraseña final.
    let contrasenaFinal = '';

    // Bucle para crear la contraseña. Se repite tantas veces como la longitud deseada.
    for (let i = 0; i < longitud; i++) {
        // Elegimos un índice al azar de la cadena de caracteres permitidos.
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        // Añadimos el caracter de ese índice a nuestra contraseña final.
        contrasenaFinal += caracteresPermitidos[indiceAleatorio];
    }
    
    // Mostramos la contraseña en el pop-up.
    generatedPasswordSpan.textContent = contrasenaFinal;
    // Hacemos visible el pop-up.
    passwordModal.style.display = 'flex';
    // Iniciamos la animación de confeti.
    startConfetti();
}

// --- 4. EVENT LISTENERS (ESCUCHADORES DE EVENTOS) ---
// Le decimos al botón que, cuando se haga clic, ejecute nuestra función `generarContrasena`.
generateButton.addEventListener('click', generarContrasena);

// Le decimos al botón de cerrar del pop-up que lo oculte al hacer clic.
closeModalButton.addEventListener('click', () => {
    passwordModal.style.display = 'none';
});

// También cerramos el pop-up si se hace clic fuera del contenido.
window.addEventListener('click', (event) => {
    if (event.target === passwordModal) {
        passwordModal.style.display = 'none';
    }
});

// --- 5. LÓGICA DEL CONFETI (¡La parte divertida!) ---
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];

function startConfetti() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confettiParticles = []; // Limpiamos el confeti anterior
    
    // Creamos 150 partículas de confeti
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height, // Empiezan desde arriba, fuera de la pantalla
            color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Colores aleatorios y brillantes
            size: Math.random() * 5 + 5,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2
        });
    }
    animateConfetti(); // Inicia la animación
}

let animationFrameId;
function animateConfetti() {
    // Limpiamos el canvas en cada fotograma
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let allParticlesOffScreen = true;

    confettiParticles.forEach(p => {
        // Movemos cada partícula
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.1) * 2; // Le da un movimiento ondulado

        // Dibujamos la partícula
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size * 1.5);

        // Si la partícula aún está en pantalla, la animación debe continuar
        if (p.y < canvas.height) {
            allParticlesOffScreen = false;
        }
    });

    // Si todas las partículas ya cayeron, detenemos la animación.
    if (allParticlesOffScreen) {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpieza final
    } else {
        // Si no, pedimos el siguiente fotograma para continuar la animación.
        animationFrameId = requestAnimationFrame(animateConfetti);
    }
}
