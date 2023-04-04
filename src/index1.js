import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, getDoc
} from 'firebase/firestore'

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeAZHFtUblEPf_9bt9PUPMnnXU1c_qX3w",
  authDomain: "database-b214f.firebaseapp.com",
  projectId: "database-b214f",
  storageBucket: "database-b214f.appspot.com",
  messagingSenderId: "770826227334",
  appId: "1:770826227334:web:eea7f755d69a9569408b07",
  measurementId: "G-N3HB325DBH"
};

//init firebase app
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);
const auth = getAuth(app);

// collection Reference
const colRef = collection(db, 'game')



const loginForm = document.querySelector('.login1')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
      const userName = cred.user;
      // console.log(userName);
      localStorage.setItem('user', JSON.stringify(userName));
			window.location.href = `game.html?userName=`+userName.email;
      
    })
    .catch(error => {
      // console.log(err.message);
      const errorCode = error.code;
      const errorMessage = error.message;
  
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password entered. Please try again.');
      } else {
        alert(errorMessage);
      }

    })
})


