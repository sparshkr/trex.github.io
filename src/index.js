import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, addDoc, doc, setDoc
} from 'firebase/firestore'

import {
  getAuth, createUserWithEmailAndPassword
} from 'firebase/auth'

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

  // get collection data 
  getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let info = []
    snapshot.docs.forEach(doc => {
      info.push({ ...doc.data(), id: doc.id })
    })
    console.log(info)
  })
  .catch(err => {
    console.log(err.message)
  })

  const signupForm = document.getElementById('a');
  signupForm.addEventListener('submit', (e) => {
    if(document.getElementById('first').value == ""){
      alert("Please Enter First Name");
      return false;
    }

    if(document.getElementById('last').value == ""){
      alert("Please Enter Last Name");
      return false;
    }

    if(document.getElementById('pass').value == ""){
      alert("Please Enter password");
      return false;
    }

    if(document.getElementById('ema').value == ""){
      alert("Please Enter your email");
      return false;
    }

    


    e.preventDefault()

    const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      // create a document for the user with their uid as the document ID
      const userRef = doc(db, "game", cred.user.uid);

      
      setDoc(userRef, {
        First: signupForm.First.value,
        Last: signupForm.Last.value,
        email: signupForm.email.value,
      password: signupForm.password.value,
      best: 0
      })
      .then(() => {
        console.log('user added to database')
        window.location = "login.html";
      })
      .catch((error) => {
        console.error(error.message)
      })
    })
    .catch((error) => {
      console.error(error.message)
    })
})


  //   const email = signupForm.email.value
  // const password = signupForm.password.value
  
  //   addDoc(colRef, {
  //     First: signupForm.First.value,
  //     Last: signupForm.Last.value,
  //     email: signupForm.email.value,
  //     password: signupForm.password.value
  //   })
  //   .then(() => {
      
  //   })


  // createUserWithEmailAndPassword(auth, email, password)
  //   .then(cred => {


  //     console.log('user created:', cred.user)
  //     window.location = "game.html";
  //   })
  //   .catch(err => {
  //     console.log(err.message)
  //   })
  // })



  