// script.js

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("Por favor completa todos los campos.");
    return;
  }

  // Usuario fijo
  if (username === "Johny Forbes" && password === "johny2006") {
    window.location.href = "../HTML/residete.html";
    return;
  }

  // Usuarios registrados
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userFound = users.find(u => u.username === username && u.password === password);

  if (userFound) {
    window.location.href = "../HTML/residete.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

function register() {
  const username = prompt("Ingresa un nombre de usuario:");
  const password = prompt("Ingresa una contraseña:");
  if (!username || !password) {
    alert("Debes ingresar usuario y contraseña.");
    return;
  }

  // Obtiene usuarios existentes o crea un array vacío
  let users = JSON.parse(localStorage.getItem("users")) || [];
  // Verifica si el usuario ya existe
  if (users.find(u => u.username === username)) {
    alert("El usuario ya existe.");
    return;
  }
  // Agrega el nuevo usuario
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario registrado exitosamente.");
}

function forgotPassword() {
  alert("Función de recuperación de contraseña aún no implementada.");
  // Redirigir a otra vista si es necesario:
  // window.location.href = "forgot-password.html";
}