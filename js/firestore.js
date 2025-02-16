// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs, initializeFirestore } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore-lite.js';
// import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7oUQV33qaofMIpuU5jjpH6TeAmrNHgk0",
  authDomain: "su-council-pd.firebaseapp.com",
  projectId: "su-council-pd",
  storageBucket: "su-council-pd.firebasestorage.app",
  messagingSenderId: "864067905786",
  appId: "1:864067905786:web:5baa2c46f4f2e61ce60143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db  = initializeFirestore(app, );
const db = getFirestore(app);
async function getBioData(db) {
    const bioCollection = collection(db, 'biodata');
    const bioDocs = await getDocs(bioCollection);
    const docs = bioDocs.docs.map(doc => doc.data());
    return docs;
}

const bioData = await getBioData(db);

export { bioData }