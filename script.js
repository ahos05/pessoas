// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS0X3fSoDtWtMcprRmNub59saP2t0r0YA",
  authDomain: "classificador-6e1c5.firebaseapp.com",
  databaseURL: "https://classificador-6e1c5-default-rtdb.firebaseio.com",
  projectId: "classificador-6e1c5",
  storageBucket: "classificador-6e1c5.firebasestorage.app",
  messagingSenderId: "663935211622",
  appId: "1:663935211622:web:b09923cce92b5cab4435a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
