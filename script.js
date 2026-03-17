// CONFIGURAÇÃO FIREBASE (cole aqui a sua config)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById('registroForm');
const verRegistrosBtn = document.getElementById('verRegistros');
const registrosContainer = document.getElementById('registrosContainer');
const registrosList = document.getElementById('registrosList');
const filtroCor = document.getElementById('filtroCor');
const ordenarNome = document.getElementById('ordenarNome');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const cor = document.getElementById('cor').value;
    const motivo = document.getElementById('motivo').value;

    await db.collection('registros').add({ nome, cor, motivo });
    form.reset();
    alert('Nome registrado!');
    atualizarLista();
});

verRegistrosBtn.addEventListener('click', () => {
    registrosContainer.classList.toggle('hidden');
    atualizarLista();
});

filtroCor.addEventListener('change', atualizarLista);
ordenarNome.addEventListener('change', atualizarLista);

async function atualizarLista() {
    const snapshot = await db.collection('registros').get();
    let registros = snapshot.docs.map(doc => doc.data());

    if (filtroCor.value) registros = registros.filter(r => r.cor === filtroCor.value);
    registros.sort((a, b) => ordenarNome.value === 'asc' ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome));

    registrosList.innerHTML = '';
    registros.forEach(r => {
        const li = document.createElement('li');
        li.className = r.cor;
        li.textContent = `${r.nome} - ${r.motivo}`;
        registrosList.appendChild(li);
    });
}

// Atualiza automaticamente ao abrir
atualizarLista();
