const firebaseConfig = {
  apiKey: "AIzaSyCQjlpyU8AUc_amPRhXO141pGKP6jw1Zt4",
  authDomain: "classificador-e7bae.firebaseapp.com",
  projectId: "classificador-e7bae",
  storageBucket: "classificador-e7bae.firebasestorage.app",
  messagingSenderId: "123664777765",
  appId: "1:123664777765:web:288801e19be06b08f3f5cc"
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
