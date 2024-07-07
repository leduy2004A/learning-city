// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa4UJoaK-usA41jTcgnqB_HSbGYEAcGk4",
  authDomain: "learncity-8d892.firebaseapp.com",
  projectId: "learncity-8d892",
  storageBucket: "learncity-8d892.appspot.com",
  messagingSenderId: "925642083556",
  appId: "1:925642083556:web:4b44f26e61469ed08f30f1",
  measurementId: "G-Y286EDS0RH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app