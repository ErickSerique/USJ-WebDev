const form = document.getElementById("loginForm");
const toastEl = new bootstrap.Toast(document.getElementById("feedbackToast"));
const toastMessage = document.getElementById("toastMessage");

// Limitar caracteres dos campos
const maxLength = {
    login: 6,
    senha: 8
};

["login", "senha"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", () => {
        el.value = el.value.slice(0, maxLength[id]);
    });
});

// Exibe erro em campo
function showError(id, message) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");
    input.classList.add("is-invalid");
    error.innerText = message;
    error.style.display = "block";
}

// Limpa erro do campo
function clearError(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");
    input.classList.remove("is-invalid");
    error.style.display = "none";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginInput = form.login.value.trim();
    const senhaInput = form.senha.value.trim();
    let valid = true;

    // Validação
    if (loginInput.length !== 6) {
        showError("login", "O Login deve ter exatamente 6 caracteres");
        valid = false;
    } else {
        clearError("login");
    }

    if (senhaInput.length !== 8) {
        showError("senha", "A senha deve ter exatamente 8 caracteres");
        valid = false;
    } else {
        clearError("senha");
    }

    if (!valid) return;

    // Obter do localStorage
    const storedLogin = localStorage.getItem("usuario_login");
    const storedSenha = localStorage.getItem("usuario_senha");

    if (loginInput === storedLogin && senhaInput === storedSenha) {
        toastMessage.innerText = "Login realizado com sucesso! Redirecionando...";
        document.getElementById("feedbackToast").classList.remove("bg-danger");
        document.getElementById("feedbackToast").classList.add("bg-success");
        toastEl.show();
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2500);
    } else {
        toastMessage.innerText = "Login ou senha incorretos.";
        document.getElementById("feedbackToast").classList.remove("bg-success");
        document.getElementById("feedbackToast").classList.add("bg-danger");
        toastEl.show();
    }
});
