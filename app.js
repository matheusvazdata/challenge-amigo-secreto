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
    lista.innerHTML = listaAmigos.map((nome, index) => `
        <li>
            ${nome} 
            <button class="remove" onclick="removerAmigo(${index})">❌</button>
        </li>
    `).join("");
}

function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
}

botaoSortear.addEventListener("click", () => {
    if (listaAmigos.length < 2) {
        showWarning("⚠️ Adicione pelo menos 2 amigos!");
        return;
    }

    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    resultado.textContent = `O amigo sorteado foi: 🎉 ${amigoSorteado}.`;
    botaoReiniciar.classList.add("show");
});

botaoReiniciar.addEventListener("click", () => {
    listaAmigos.length = 0;
    lista.innerHTML = "";
    resultado.textContent = "";
    botaoReiniciar.classList.remove("show");
});

/* Função de alertas - agora sobrescreve o alerta anterior */
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

/* Função específica para warning - AGORA FUNCIONANDO 100% */
function showWarning(msg) {
    // Remove qualquer alerta anterior para sobrescrever
    warningAlertContainer.innerHTML = "";

    // Criar novo alerta
    const alert = document.createElement("div");
    alert.textContent = msg;
    alert.classList.add("alert");

    // Adicionar ao container
    warningAlertContainer.appendChild(alert);

    // Mostrar alerta no centro superior
    warningAlertContainer.style.top = "20px";

    // Remover alerta após 4 segundos e esconder container
    setTimeout(() => {
        alert.remove();
        warningAlertContainer.style.top = "-50px";
    }, 6000);
}