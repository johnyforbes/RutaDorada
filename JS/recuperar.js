// recuperar.js actualizado para validar con username + teléfono

// Proteger la página: solo usuarios logueados pueden acceder
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
  window.location.href = "../HTML/index.html"; // Redirige al login si no hay usuario activo
}





let usuarioEncontrado = null;

function continuar() {
  if (!usuarioEncontrado) {
    const telefono = document.getElementById("telefonoInput").value.trim();
    const username = document.getElementById("usernameInput").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarioEncontrado = usuarios.find(u => u.username === username && u.telefono === telefono);

    if (!usuarioEncontrado) {
      alert("Usuario y/o teléfono incorrecto");
      return;
    }

    document.getElementById("mensaje").textContent = "Crea tu nueva contraseña";
    document.getElementById("usernameInput").style.display = "none";
    document.getElementById("telefonoInput").style.display = "none";
    document.getElementById("passwordFields").style.display = "block";
    return;
  }

  const nueva = document.getElementById("nuevaPass").value;
  const confirmar = document.getElementById("confirmPass").value;

  if (!nueva || !confirmar) {
    alert("Completa ambos campos de contraseña");
    return;
  }

  if (nueva !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Actualizar contraseña
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios = usuarios.map(u => {
    if (u.username === usuarioEncontrado.username && u.telefono === usuarioEncontrado.telefono) {
      u.password = nueva;
    }
    return u;
  });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Contraseña actualizada. Redirigiendo al login...");
  window.location.href = "index.html";
}
