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

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    if (usuario.tipo === "residente") {
      window.location.href = "./residete.html";
    } else if (usuario.tipo === "turista") {
      window.location.href = "./visitante.html";
    }
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

function register() {
  window.location.href = "./registro.html";
}

