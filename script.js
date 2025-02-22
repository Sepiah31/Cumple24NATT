let mensaje = [
    "Hola Natalia , soy el Profesor Abedul ",
    " y el mi asistente Sebastian",
    "¿EH? No esta ...",
    "...",
    "* ejem *",
    "Nos acercamos al gran dia 23",
    "¡¡¡ Que emocion !!! ",
    "Como todo un SOL , a esta edad tienes una labor ... ",
    "¡Natalia! estas apunto de convertire en entrenadora",
    "Debes elegir tu primer Pokémon.",
    "¿Estás listo para esta gran aventura?"
];

let mensajeElement = document.getElementById("mensaje-profesor");
let botonContinuar = document.getElementById("boton-continuar");
let index = 0;
let esperando = false;
let pokemonSeleccionado = false; // Variable para rastrear si un Pokémon ya ha sido seleccionado

function mostrarSiguienteParte(forzado = false) {

    if (esperando && !forzado) return; // Evitar que se muestre texto antes de tiempo

    let profesorContainer = document.getElementById("profesor-container");
    let seleccionContainer = document.getElementById("seleccion-container");
    seleccionContainer.style.display = "none";
    profesorContainer.style.display = "lock";
    if (index < mensaje.length) {
        mensajeElement.innerHTML = mensaje[index]; // Mostrar la línea actual
        esperando = true; // Bloquear hasta que termine la espera
        setTimeout(() => {
            esperando = false; // Permitir avanzar al siguiente mensaje
        }, 2000); // Espera automática de 2 segundos
        index++;
        reproducirAudio();

    } else {
        botonContinuar.innerText = "Elegir Pokémon"; // Cambia el botón
        botonContinuar.onclick = mostrarSeleccion; // Asigna la función para avanzar
    }
}

function mostrarSeleccion() {
    let profesorContainer = document.getElementById("profesor-container");
    let seleccionContainer = document.getElementById("seleccion-container");

    // Ocultar al profesor
    profesorContainer.style.display = "none";

    // Mostrar la selección de Pokémon
    seleccionContainer.style.display = "block";

    reproducirAudio();
}

function seleccionarPokemon(nombre) {
    if (pokemonSeleccionado) return; // Verificar si ya se ha seleccionado un Pokémon

    pokemonSeleccionado = true; // Marcar que un Pokémon ha sido seleccionado

    // Aplicar filtro de escala de grises a los Pokémon no seleccionados
    let pokemonImages = document.querySelectorAll('.pokemon');
    pokemonImages.forEach(img => {
        if (!img.classList.contains(nombre.toLowerCase())) {
            img.classList.add('grayscale');
        }
    });

    mensaje_final();
}

function reproducirAudio() {
    // Intentar reproducir el audio después de la interacción
    let audio = document.getElementById("background-audio");
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

function mensaje_final(){
  // Crear un nuevo contenedor de color rosa
  let seleccionContainer = document.getElementById("seleccion-container");
  let contenedorFelicitacion = document.createElement("div");
  contenedorFelicitacion.style.backgroundColor = "pink";
  contenedorFelicitacion.style.padding = "20px";
  contenedorFelicitacion.style.marginTop = "20px";
  contenedorFelicitacion.style.borderRadius = "10px";

  // Crear y mostrar el mensaje de felicitación
  let mensajeFelicitacion = document.createElement("p");
  mensajeFelicitacion.innerHTML = `
    <span style="color: yellow; font-size: 24px;">¡FELICIDADES!</span><br><br>
    <span style="color: white; font-size: 16px;">Has elegido a tu compañero para esta aventura cumpleañera</span><br>
    <span style="color: white; font-size: 16px;">¡¡¡ Te deseo mucho exito Entrenadora Natt!!!</span><br><br>
    <span style="color: yellow; font-size: 16px;">Tu compañero de viaje pronto llegara ti:33</span><br><br>
    <span style="color: red; font-size: 10px;">Pd: mi ayudante te ama mucho mas que tu siempre :33</span>
  `;
  contenedorFelicitacion.appendChild(mensajeFelicitacion);

  // Añadir el contenedor de felicitación al contenedor de selección
  seleccionContainer.appendChild(contenedorFelicitacion);

  // Capturar la pantalla y enviar por correo
  html2canvas(document.body).then(canvas => {
    let dataURL = canvas.toDataURL("image/png");
    enviarCorreo(dataURL);
  });
}

function enviarCorreo(dataURL) {
  emailjs.send("service_fc1dp9a", "template_j464yo9", {
    to_name: "Recipient Name",
    from_name: "Your Name",
    message: "Aquí está tu captura de pantalla",
    screenshot: dataURL
  }).then(response => {
    console.log('Correo enviado exitosamente', response.status, response.text);
  }).catch(error => {
    console.log('Error al enviar el correo', error);
  });
}

// Iniciar el diálogo
botonContinuar.onclick = () => mostrarSiguienteParte(true); // Permitir avance con clic
mostrarSiguienteParte();
