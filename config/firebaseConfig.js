import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "nodejs-app-ed569.firebaseapp.com",
    projectId: "nodejs-app-ed569",
    storageBucket: "nodejs-app-ed569.appspot.com",
    messagingSenderId: "480246136314",
    appId: "process.env.API_ID"
  };
  
  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  export default firebaseConfig;