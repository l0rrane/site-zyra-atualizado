
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Substitua com as credenciais do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCFHhikAzbHoW_dxbCmMgrzEYFWdDGods4",
  authDomain: "bancozyra-6b68d.firebaseapp.com",
  databaseURL: "https://bancozyra-6b68d-default-rtdb.firebaseio.com",
  projectId: "bancozyra-6b68d",
  storageBucket: "bancozyra-6b68d.firebasestorage.app",
  messagingSenderId: "67042426305",
  appId: "1:67042426305:web:bb66b3e8415f950b5cc340",
  measurementId: "G-8YR1EXSW2Z"
};
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Cloud Firestore e exporta para usar em outras partes do projeto
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 