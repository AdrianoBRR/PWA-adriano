// REGISTRO DO SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("SW registrado"))
    .catch(err => console.log("Erro SW:", err));
}

// STATUS ONLINE/OFFLINE
const statusDiv = document.getElementById("status");

function atualizarStatus() {
  if (navigator.onLine) {
    statusDiv.textContent = "Online";
    statusDiv.className = "online";
  } else {
    statusDiv.textContent = "Offline";
    statusDiv.className = "offline";
  }
}

window.addEventListener("online", atualizarStatus);
window.addEventListener("offline", atualizarStatus);

atualizarStatus();

// API + CACHE
const lista = document.getElementById("lista");

async function carregarDados() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const dados = await resposta.json();

    lista.innerHTML = "";
    dados.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.title;
      lista.appendChild(li);
    });

    localStorage.setItem("dados", JSON.stringify(dados));

  } catch {
    // OFFLINE → usa cache
    const dados = JSON.parse(localStorage.getItem("dados")) || [];
    lista.innerHTML = "";
    dados.forEach(item => {
      const li = document.createElement("li");
      li.textContent = "(Offline) " + item.title;
      lista.appendChild(li);
    });
  }
}

document.getElementById("btnAtualizar").addEventListener("click", carregarDados);

// TEMA CLARO/ESCURO
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// inicial
carregarDados();
function updateStatus() {
  const status = document.getElementById('status');
  if (navigator.onLine) {
    status.textContent = 'Online';
    status.style.background = 'green';
  } else {
    status.textContent = 'Offline';
    status.style.background = 'red';
  }
}

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

updateStatus();