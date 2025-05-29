// script.js

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Aquí podrías hacer una petición al backend o a Firebase, por ejemplo
  console.log("Usuario:", username);
  console.log("Contraseña:", password);
  alert("Inicio de sesión exitoso (simulado)");
});

function register() {
  alert("Función de registro aún no implementada.");
  // Redirigir a otra vista si es necesario:
  // window.location.href = "register.html";
}
function forgotPassword() {
  alert("Función de recuperación de contraseña aún no implementada.");
  // Redirigir a otra vista si es necesario:
  // window.location.href = "forgot-password.html";
}