import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBrAO4cdgZbYywiOncYN5sNwe1sAmT93Zg",
  authDomain: "chatbase-927bc.firebaseapp.com",
  databaseURL: "https://firechat-927bc-default-rtdb.firebaseio.com",
  projectId: "chatbase-927bc",
  storageBucket: "chatbase-927bc.appspot.com",
  messagingSenderId: "405841228561",
  appId: "1:405841228561:web:89596d754a4d172b2952b0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };
