const lista = document.getElementById('lista');
const loader = document.getElementById('loader');
const toast = document.getElementById('toast');

function showLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}

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

async function carregarDados() {
  showLoader(true);
  lista.innerHTML = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.title;
      lista.appendChild(li);
    });

    showToast('Dados atualizados 🚀');

  } catch (error) {
    showToast('Sem internet 😢');
  }

  showLoader(false);
}