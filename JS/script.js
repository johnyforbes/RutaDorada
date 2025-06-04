// logIn.js

  class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  validar() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.find(u => u.username === this.username && u.password === this.password);
  }
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Usuario fijo
  if (username === "Johny Forbes" && password === "johny2006") {
    window.location.href = "../HTML/residete.html";
    return;
  }

  const login = new Login(username, password);
  const usuario = login.validar();

  if (usuario) {
    if (usuario.tipo === "residente") {
      window.location.href = "./residente.html";
    } else if (usuario.tipo === "turista") {
      window.location.href = "./visitantes.html";
    }
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

function register() {
  window.location.href = "./registro.html";
}
