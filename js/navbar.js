document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".btn-login");
  const signupBtn = document.querySelector(".btn-signup");
  const navbarBtns = document.querySelector(".navbar-btns");

  const nomeUsuario = localStorage.getItem("usuario_nome");
  const loginUsuario = localStorage.getItem("usuario_login");

  if (nomeUsuario && loginUsuario) {
    // Cria o elemento com o nome do usuário
    const userElement = document.createElement("span");
    userElement.className = "navbar-text text-white fw-bold";
    userElement.textContent = `Bem-vindo, ${nomeUsuario.split(" ")[0]}`;

    // Cria botão de logout
    const logoutBtn = document.createElement("button");
    logoutBtn.className = "btn btn-sm btn-outline-light ms-3";
    logoutBtn.textContent = "Sair";
    logoutBtn.onclick = () => {
      localStorage.removeItem("usuario_nome");
      localStorage.removeItem("usuario_login");
      localStorage.removeItem("usuario_senha");
      window.location.reload(); // Recarrega para atualizar navbar
    };

    // Limpa botões antigos e adiciona o nome + botão de logout
    navbarBtns.innerHTML = "";
    navbarBtns.appendChild(userElement);
    navbarBtns.appendChild(logoutBtn);
  }
});
