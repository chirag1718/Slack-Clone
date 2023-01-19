import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Refer to Firebse V9 docs for errors
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYDrD81OiFft9sHogz1y0uHBYVyH3QJfw",
  authDomain: "slack-clone-c663e.firebaseapp.com",
  projectId: "slack-clone-c663e",
  storageBucket: "slack-clone-c663e.appspot.com",
  messagingSenderId: "305433173840",
  appId: "1:305433173840:web:2185b701aae42a8bee9655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
