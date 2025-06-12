class ChatBot {
  constructor(chatBoxId) {
    this.chatBox = document.querySelector(chatBoxId);
    this.rutasDisponibles = [
      "Ruta 1: Centro Histórico → Playa Spratt Bight",
      "Ruta 2: Aeropuerto → San Luis",
      "Ruta 3: Johnny Cay → Acuario → Centro",
      "Ruta 4: Rocky Cay → La Loma → Centro"
    ];
    this.precioBase = "El precio promedio por viaje es de $3.500 COP.";
    this.faqs = [
      "¿Cómo puedo marcar una ruta como favorita?",
      "¿Necesito conexión a internet para usar la app?",
      "¿Puedo ver rutas en tiempo real?",
      "¿Cómo califico un viaje o ruta?"
    ];
  }

  agregarMensaje(mensaje, tipo = "soporte") {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("mensaje", tipo);
    mensajeDiv.innerHTML = mensaje;
    this.chatBox.appendChild(mensajeDiv);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }

  procesarEntradaUsuario(texto) {
    this.agregarMensaje(texto, "usuario");

    // Procesa respuesta del bot según el contenido
    const entrada = texto.toLowerCase();

    if (entrada.includes("ruta")) {
      this.mostrarRutas();
    } else if (entrada.includes("precio")) {
      this.mostrarPrecio();
    } else if (entrada.includes("faq") || entrada.includes("pregunta")) {
      this.mostrarFAQs();
    } else {
      this.agregarMensaje("Lo siento, no entendí tu pregunta. Prueba con: rutas, precio o FAQs.");
    }
  }

  mostrarRutas() {
    let rutasHtml = "<strong>Estas son las rutas disponibles:</strong><ul>";
    this.rutasDisponibles.forEach(ruta => {
      rutasHtml += `<li>${ruta}</li>`;
    });
    rutasHtml += "</ul>";
    this.agregarMensaje(rutasHtml);
  }

  mostrarPrecio() {
    this.agregarMensaje(`<strong>Información de precio:</strong><br>${this.precioBase}`);
  }

  mostrarFAQs() {
    let faqsHtml = "<strong>Preguntas frecuentes:</strong><ul>";
    this.faqs.forEach(pregunta => {
      faqsHtml += `<li>${pregunta}</li>`;
    });
    faqsHtml += "</ul>";
    this.agregarMensaje(faqsHtml);
  }
}

// === Inicialización ===

const bot = new ChatBot(".chat-box");

document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("user-input");
  const texto = input.value.trim();
  if (texto !== "") {
    bot.procesarEntradaUsuario(texto);
    input.value = "";
  }
});

document.getElementById("user-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("send-btn").click();
  }
});

// Función de botones rápidos
function responderBoton(tipo) {
  if (tipo === 'rutas') {
    bot.procesarEntradaUsuario("¿Cuáles son las rutas?");
  } else if (tipo === 'precio') {
    bot.procesarEntradaUsuario("¿Cuál es el precio?");
  } else if (tipo === 'faqs') {
    bot.procesarEntradaUsuario("Muéstrame las FAQs");
  }
}

// boton "Volver"
function _handleBackButtonClick() {
  history.back();
}
