// recuperar.js actualizado para validar con username + teléfono

// Proteger la página: solo usuarios logueados pueden acceder
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
  window.location.href = "../HTML/index.html"; // Redirige al login si no hay usuario activo
}

let usuarioEncontrado = null;

function continuar() {
  const username = document.getElementById("usernameInput").value.trim();
  const telefono = document.getElementById("telefonoInput").value.trim();
  const mensaje = document.getElementById("mensaje");
  const passwordFields = document.getElementById("passwordFields");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.username === username && u.telefono === telefono);

  if (!usuario) {
    mensaje.textContent = "Usuario o teléfono incorrecto.";
    mensaje.style.color = "red";
    passwordFields.style.display = "none";
    return;
  }

  // Si ya se mostró el campo de contraseña, proceder a actualizar
  if (passwordFields.style.display === "block") {
    const nuevaPass = document.getElementById("nuevaPass").value;
    const confirmPass = document.getElementById("confirmPass").value;

    if (!nuevaPass || !confirmPass) {
      mensaje.textContent = "Por favor, completa ambos campos de contraseña.";
      mensaje.style.color = "red";
      return;
    }
    if (nuevaPass !== confirmPass) {
      mensaje.textContent = "Las contraseñas no coinciden.";
      mensaje.style.color = "red";
      return;
    }
    // Actualiza la contraseña
    usuario.password = nuevaPass;
    // Actualiza el array de usuarios
    usuarios = usuarios.map(u => u.username === username ? usuario : u);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mensaje.textContent = "¡Contraseña actualizada! Ahora puedes iniciar sesión.";
    mensaje.style.color = "green";
    passwordFields.style.display = "none";
    return;
  }

  // Si usuario y teléfono son correctos, muestra los campos para nueva contraseña
  mensaje.textContent = "Usuario verificado. Ingresa tu nueva contraseña.";
  mensaje.style.color = "#333";
  passwordFields.style.display = "block";
}

document.getElementById("volverBtn").addEventListener("click", function() {
  window.location.href = "./index.html";
});
