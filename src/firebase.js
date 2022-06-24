// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDh8CjWbQOCETBhbw5Tb2nH-UWMc0FfB7Q",
//   authDomain: "firechat-bdea1.firebaseapp.com",
//   databaseURL: "https://firechat-bdea1-default-rtdb.firebaseio.com",
//   projectId: "firechat-bdea1",
//   storageBucket: "firechat-bdea1.appspot.com",
//   messagingSenderId: "192165734607",
//   appId: "1:192165734607:web:c9e0f65fa7957dfa196fba",
//   measurementId: "G-S4PTGTE795",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBrAO4cdgZbYywiOncYN5sNwe1sAmT93Zg",
  authDomain: "chatbase-927bc.firebaseapp.com",
  databaseURL: "https://firechat-927bc-default-rtdb.firebaseio.com",
  projectId: "chatbase-927bc",
  storageBucket: "chatbase-927bc.appspot.com",
  messagingSenderId: "405841228561",
  appId: "1:405841228561:web:89596d754a4d172b2952b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };
