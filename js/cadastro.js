const form = document.getElementById("cadastroForm");
const toastEl = new bootstrap.Toast(document.getElementById("feedbackToast"));
const toastMessage = document.getElementById("toastMessage");

const onlyLetters = /^[A-Za-zÀ-ÿ\s]+$/;
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phonePattern = /^\d{2} \d{4,5}-\d{4}$/;

// Máscara para CPF
function formatCPF(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Máscara para telefone (novo formato)
function formatPhone(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '$1 $2')
    .replace(/(\d{4,5})(\d)/, '$1-$2');
}

["cpf", "telefoneCelular", "telefoneFixo"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    const isCPF = id === "cpf";
    const formatted = isCPF ? formatCPF(el.value) : formatPhone(el.value);
    el.value = formatted;
  });
});

["login", "senha", "confirmarSenha"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    const maxLength = id === "login" ? 6 : 8;
    el.value = el.value.slice(0, maxLength);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const showError = (id, message) => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");
    input.classList.add("is-invalid");
    error.innerText = message;
    error.style.display = "block";
    valid = false;
  };

  const clearError = (id) => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");
    input.classList.remove("is-invalid");
    error.style.display = "none";
  };

  const nome = form.nome.value.trim();
  const dataNascimento = form.dataNascimento.value;
  const sexo = form.sexo.value;
  const nomeMaterno = form.nomeMaterno.value.trim();
  const cpf = form.cpf.value.trim();
  const telefoneCelular = form.telefoneCelular.value.trim();
  const telefoneFixo = form.telefoneFixo.value.trim();
  const endereco = form.endereco.value.trim();
  const login = form.login.value.trim();
  const senha = form.senha.value.trim();
  const confirmarSenha = form.confirmarSenha.value.trim();

  if (!nome || nome.length < 15 || nome.length > 60 || !onlyLetters.test(nome)) {
    showError("nome", "O nome deve ter entre 15 e 60 letras");
  } else clearError("nome");

  if (!dataNascimento) {
    showError("dataNascimento", "Insira uma data válida");
  } else clearError("dataNascimento");

  if (!sexo) {
    document.getElementById("sexoError").style.display = "block";
    valid = false;
  } else document.getElementById("sexoError").style.display = "none";

  if (!nomeMaterno || !onlyLetters.test(nomeMaterno)) {
    showError("nomeMaterno", "Insira um nome válido (somente letras)");
  } else clearError("nomeMaterno");

  if (!cpf || !cpfPattern.test(cpf)) {
    showError("cpf", "Formato inválido: 000.000.000-00");
  } else clearError("cpf");

  if (!telefoneCelular || !phonePattern.test(telefoneCelular)) {
    showError("telefoneCelular", "Formato: XX XXXXX-XXXX");
  } else clearError("telefoneCelular");

  if (telefoneFixo && !phonePattern.test(telefoneFixo)) {
    showError("telefoneFixo", "Formato: XX XXXX-XXXX");
  } else clearError("telefoneFixo");

  if (!endereco) {
    showError("endereco", "Preencha o endereço completo");
  } else clearError("endereco");

  if (login.length !== 6) {
    showError("login", "Login deve ter exatamente 6 caracteres");
  } else clearError("login");

  if (senha.length !== 8) {
    showError("senha", "Senha deve ter exatamente 8 caracteres");
  } else clearError("senha");

  if (confirmarSenha !== senha) {
    showError("confirmarSenha", "As senhas não coincidem");
  } else clearError("confirmarSenha");

  if (valid) {
    localStorage.setItem("usuario_login", login);
    localStorage.setItem("usuario_senha", senha);

    toastMessage.innerText = "Cadastro realizado com sucesso! Redirecionando...";
    toastEl.show();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2500);
  }
});