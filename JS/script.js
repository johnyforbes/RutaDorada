// Proteger la página: solo usuarios logueados pueden acceder
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioActivo) {
  window.location.href = "../HTML/index.html"; // Redirige al login si no hay usuario activo
}




// logIn.js

class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  validar() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Busca por id (username) y password
    return usuarios.find(u => u.username === this.username && u.password === this.password);
  }
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Usuario fijo (opcional)
  if (username === "Johny Forbes" && password === "johny2006") {
    window.location.href = "../HTML/residete.html";
    return;
  }

  const login = new Login(username, password);
  const usuario = login.validar();

  if (usuario) {
    // Guarda el usuario logueado
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    // Redirige según el tipo de usuario
    if (usuario.tipo === "residente") {
      window.location.href = "../HTML/residete.html";
    } else if (usuario.tipo === "turista") {
      window.location.href = "../HTML/visitante.html";
    } else {
      // Si tienes otros tipos, puedes agregarlos aquí
      window.location.href = "../HTML/residete.html";
    }
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

function register() {
  window.location.href = "./registro.html";
}

