const listaAmigos = [];
const input = document.getElementById("amigo");
const botaoAdicionar = document.getElementById("adicionar");
const lista = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");
const botaoSortear = document.getElementById("sortear");
const botaoReiniciar = document.getElementById("reiniciar");
const alertContainer = document.getElementById("alert-container");
const warningAlertContainer = document.getElementById("warning-alert-container");

// Desativa o botão adicionar quando o input estiver vazio
input.addEventListener("input", () => {
    botaoAdicionar.disabled = input.value.trim() === "";
});

// Permite adicionar nomes apertando ENTER
input.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter" && !botaoAdicionar.disabled) {
        evento.preventDefault(); // Impede o Enter de criar uma nova linha no input
        botaoAdicionar.click(); // Simula o clique no botão Adicionar
    }
});

// Adiciona um nome à lista
botaoAdicionar.addEventListener("click", () => {
    if (!input.value.trim()) return; // Não adiciona nomes vazios

    listaAmigos.push(input.value.trim()); // Adiciona à lista
    input.value = ""; // Limpa o input
    botaoAdicionar.disabled = true; // Desativa o botão novamente
    atualizarLista(); // Atualiza a interface
});

// Atualiza a lista de amigos na tela
function atualizarLista() {
    lista.innerHTML = listaAmigos.map((nome, index) => `
        <li>
            ${nome} 
            <button class="remove" onclick="removerAmigo(${index})">❌</button>
        </li>
    `).join("");
}

// Remove um amigo da lista pelo índice
function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
}

// Realiza o sorteio
botaoSortear.addEventListener("click", () => {
    if (listaAmigos.length < 2) {
        showWarning("⚠️ Adicione pelo menos 2 amigos!");
        return;
    }

    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    resultado.textContent = `O amigo sorteado foi: 🎉 ${amigoSorteado}.`;
    botaoReiniciar.classList.add("show");
});

// Reinicia o sorteio, limpando tudo
botaoReiniciar.addEventListener("click", () => {
    listaAmigos.length = 0;
    lista.innerHTML = "";
    resultado.textContent = "";
    botaoReiniciar.classList.remove("show");
});

/* 
    Função para exibir alertas informativos 
    (Tipo: sucesso, erro, etc.). Sobrescreve o alerta anterior
*/
function showAlert(msg, type) {
    alertContainer.innerHTML = ""; // Remove qualquer alerta anterior
    const alert = document.createElement("div");
    alert.textContent = msg;
    alert.classList.add("alert", type);
    alertContainer.appendChild(alert);
    setTimeout(() => {
        if (alertContainer.contains(alert)) {
            alert.remove();
        }
    }, 6000);
}

/* 
    Exibe um alerta no centro superior da tela (warnings)
    Se já existir um alerta, ele será substituído para evitar spam
*/
function showWarning(msg) {
    warningAlertContainer.innerHTML = ""; // Remove qualquer alerta anterior

    const alert = document.createElement("div");
    alert.textContent = msg;
    alert.classList.add("alert");

    warningAlertContainer.appendChild(alert);
    warningAlertContainer.style.top = "20px"; // Animação para aparecer

    setTimeout(() => {
        alert.remove();
        warningAlertContainer.style.top = "-50px"; // Some depois de 4 segundos
    }, 6000);
}