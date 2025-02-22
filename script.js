let mensaje = [
    "Hola, soy el Profesor Abedul.",
    "Hoy es un día especial para ti.",
    "Debes elegir tu primer Pokémon.",
    "¿Estás listo para esta gran aventura?"
];

let mensajeElement = document.getElementById("mensaje-profesor");
let botonContinuar = document.getElementById("boton-continuar");
let index = 0;
let esperando = false;

function mostrarSiguienteParte(forzado = false) {
    if (esperando && !forzado) return; // Evitar que se muestre texto antes de tiempo

    if (index < mensaje.length) {
        mensajeElement.innerHTML = mensaje[index]; // Mostrar la línea actual
        esperando = true; // Bloquear hasta que termine la espera
        setTimeout(() => {
            esperando = false; // Permitir avanzar al siguiente mensaje
        }, 2000); // Espera automática de 2 segundos
        index++;
    } else {
        botonContinuar.innerText = "Elegir Pokémon"; // Cambia el botón
        botonContinuar.onclick = mostrarSeleccion; // Asigna la función para avanzar
    }
}

function mostrarSeleccion() {
    let profesorContainer = document.getElementById("profesor-container");
    let seleccionContainer = document.getElementById("seleccion-container");
    let audio = document.getElementById("background-audio");

    // Ocultar al profesor
    profesorContainer.style.display = "none";

    // Mostrar la selección de Pokémon
    seleccionContainer.style.display = "block";

    // Intentar reproducir el audio después de la interacción
    if (audio.paused) {
        audio.muted = false; // Desmutear por seguridad
        audio.load(); // Cargar el audio por si acaso
        audio.play().then(() => {
            console.log("Música de fondo iniciada.");
        }).catch(error => {
            console.log("Autoplay bloqueado. Esperando más interacción del usuario.");
        });
    }
}

function seleccionarPokemon(nombre) {
    alert(`¡Has elegido a ${nombre}! Aquí está tu invitación.`);
}

// Iniciar el diálogo
botonContinuar.onclick = () => mostrarSiguienteParte(true); // Permitir avance con clic
mostrarSiguienteParte();
