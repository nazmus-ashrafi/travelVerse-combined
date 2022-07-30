// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArCr0uQa-UgjmPTDADMxubaklidr08ryM",
  authDomain: "travelverse-e51f6.firebaseapp.com",
  databaseURL: "gs://travelverse-e51f6.appspot.com",
  projectId: "travelverse-e51f6",
  storageBucket: "travelverse-e51f6.appspot.com",
  messagingSenderId: "803876815511",
  appId: "1:803876815511:web:18b170f8d5b6ebc1ba5fd2",
  measurementId: "G-LYMP77048E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app


