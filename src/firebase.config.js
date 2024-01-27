// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAdfLo8-NWO7UbIhhc84NQEXdfu-Q66AIk",
//   authDomain: "quiztimwnow.firebaseapp.com",
//   projectId: "quiztimwnow",
//   storageBucket: "quiztimwnow.appspot.com",
//   messagingSenderId: "1006202728998",
//   appId: "1:1006202728998:web:bf87d314dd5a6e98a06ce7",
//   measurementId: "G-V8GJHK19XK"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBHG7nzmsygOe7W3bCU2Glr-NyEUjmtmo8",
  authDomain: "quiztimenow-32911.firebaseapp.com",
  projectId: "quiztimenow-32911",
  storageBucket: "quiztimenow-32911.appspot.com",
  messagingSenderId: "276880391041",
  appId: "1:276880391041:web:59b18c61df73275e368680",
  measurementId: "G-4GMH6GQVNG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}