class Usuario {
  constructor(nombre, apellido, id, telefono, pais, ciudad, password, tipo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = id;
    this.telefono = telefono;
    this.pais = pais;
    this.ciudad = ciudad;
    this.password = password;
    this.tipo = tipo;
    this.historial = [];
  }
}

function registrarUsuario() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const id = document.getElementById("id").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const pais = document.getElementById("pais").value;
  const ciudad = document.getElementById("ciudad").value.trim();
  const password = document.getElementById("password").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (!nombre || !apellido || !id || !telefono || !pais || !ciudad || !password || !tipo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.some(u => u.username === id)) {
    alert("El usuario ya existe.");
    return;
  }

  const nuevoUsuario = new Usuario(nombre, apellido, id, telefono, pais, ciudad, password, tipo);
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  window.location.href = "./index.html";
}

document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault();
  registrarUsuario();
});

// Inicializar el input de teléfono con prefijos internacionales
const inputTelefono = document.querySelector("#telefono");

const iti = window.intlTelInput(inputTelefono, {
  initialCountry: "co", // Colombia por defecto
  preferredCountries: ["co", "us", "br", "ar", "mx", "es"],
  separateDialCode: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});



// Lista básica de países 
const paises = [
  "Colombia", "Argentina", "México", "Estados Unidos", "Brasil",
  "Chile", "Perú", "Venezuela", "Ecuador", "España", "Canadá", "Alemania"
];

// Llenar el select de países
const selectPais = document.getElementById("pais");
paises.forEach(pais => {
  const option = document.createElement("option");
  option.value = pais;
  option.textContent = pais;
  selectPais.appendChild(option);
});

// Aplicacion de select2
$(selectPais).select2({
  placeholder: "Selecciona tu país",
  allowClear: true,
  width: "100%"
});


// Función para normalizar tildes y comparar
function esSanAndres(ciudad) {
  const sinTildes = ciudad.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sinTildes.trim().toLowerCase() === "san andres islas";
}
function iniciarComo(tipo) {
  const ciudad = document.getElementById("ciudad").value;

  if (esSanAndres(ciudad)) {
    // Si es San Andrés, redirige a la vista residente
    window.location.href = "../HTML/residete.html";
  } else {
    // Si no, redirige como turista
    window.location.href = "../HTML/visitante.html";
  }
}

