const listaAmigos = [];
const input = document.getElementById("amigo");
const botaoAdicionar = document.getElementById("adicionar");
const lista = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");
const botaoSortear = document.getElementById("sortear");
const botaoReiniciar = document.getElementById("reiniciar");
const alertContainer = document.getElementById("alert-container");
const warningAlertContainer = document.getElementById("warning-alert-container");

input.addEventListener("input", () => {
    botaoAdicionar.disabled = input.value.trim() === "";
});

botaoAdicionar.addEventListener("click", () => {
    if (!input.value.trim()) return;
    
    listaAmigos.push(input.value.trim());
    input.value = "";
    botaoAdicionar.disabled = true;
    atualizarLista();
});

function atualizarLista() {
    lista.innerHTML = listaAmigos.map(nome => `<li>${nome}</li>`).join("");
}

botaoSortear.addEventListener("click", () => {
    if (listaAmigos.length < 2) {
        showWarning("Adicione pelo menos 2 amigos!");
        return;
    }

    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    resultado.textContent = `O amigo sorteado foi: 🎉 ${amigoSorteado}`;
    botaoReiniciar.classList.add("show");
});

botaoReiniciar.addEventListener("click", () => {
    listaAmigos.length = 0;
    lista.innerHTML = "";
    resultado.textContent = "";
    botaoReiniciar.classList.remove("show");
});

/* Função de alertas */
function showAlert(msg, type) {
    const alert = document.createElement("div");
    alert.textContent = msg;
    alert.classList.add("alert", type);
    alertContainer.appendChild(alert);
    setTimeout(() => alert.remove(), 6000);
}

/* Função específica para warning */
function showWarning(msg) {
    const alert = document.createElement("div");
    alert.textContent = msg;
    alert.classList.add("alert", "warning");
    warningAlertContainer.appendChild(alert);
    setTimeout(() => alert.remove(), 6000);
}