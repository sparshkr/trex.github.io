import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc, updateDoc, increment
} from 'firebase/firestore'

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
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

// Get the current user's data
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.uid);


const userDocRef = doc(db, 'game', user.uid);
let userData;
let highscore;



getDoc(userDocRef).then((doc) => {
    if (doc.exists()) {
        userData = doc.data();
        let bs = document.getElementById("hi");
        bs.innerHTML = ("Best Score: " + doc.data().best);
        let username = document.getElementById("name");
        username.innerHTML = ("Player: " + doc.data().First);

        // console.log(doc.data().First);
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});











let ni = 3;
let j = 0;
let k = 0;
let ran = 0;

let i = 0;
window.onload = () => {

    const logot = document.getElementById('lgout')
    logot.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out ');
                window.location.href = 'login.html';
            })
            .catch((err) => {
                console.log(err.message);
            })
    })


    let fired = false;
    let fired1 = false;
    let fired2 = false;
    let fired3 = false;
    let fired4 = false;
    let fired5 = false;
    let fired6 = false;
    document.getElementById("trex").src = "img/dino-stationary.png";
    var audio = new Audio('Sound/jump.wav');
    var audio1 = new Audio('Sound/die.wav');
    let cactus = document.getElementById("cactus");
    let gr = document.getElementById('ground');
    window.addEventListener("keydown", function (e) {

        // var dirun = ["img/dino-run-0.png", "img/dino-run-1.png"];
        // if (!fired4) {
        //     fired4 = true;

        //     if (!fired6) {
        //         function anitrex() {

        //             document.getElementById("trex").src = dirun[k];
        //             k++;
        //             if (k > 1) {
        //                 k = 0;
        //                 console.log(document.getElementById("trex").src);
        //             }

        //         }
        //         setInterval(anitrex, 100);
        //     }

        // }


        if (e.key == ' ') {
            var dirun = ["img/dino-run-0.png", "img/dino-run-1.png"];
            if (!fired4) {
                fired4 = true;
    
                if (!fired6) {
                    function anitrex() {
    
                        document.getElementById("trex").src = dirun[k];
                        k++;
                        if (k > 1) {
                            k = 0;
                            console.log(document.getElementById("trex").src);
                        }
    
                    }
                    setInterval(anitrex, 100);
                }
    
            }
            gr.classList.add('anigr');
            audio.play();


            let star = document.getElementById("star");
            cactus.classList.add('anicacti');
            if (!fired3) {
                fired3 = true;
                var color = ["black", "white"];
                function change() {
                    document.body.style.backgroundColor = color[j];
                    j++;

                    if (j > 1) {
                        j = 0;
                    }
                }
                this.setInterval(change, 30000);
            }

            var scr = document.getElementById('scr');

            if (!fired) {
                fired = true;
                // let mysound = new Audio('Sound/jump.wav');
                // mysound.play();
                setInterval(() => {
                    i++;
                    scr.innerHTML = ("score " + i);

                }, 1000);
            }



            if (typeof (star) != 'undefined' && star != null) {
                star.remove();
            }

            var dino = document.getElementById("trex");
            function jump() {
                dino.classList.add('jump');

                setTimeout(() => {
                    dino.classList.remove('jump');
                }, 700);
            }
            jump();


            let alive = this.setInterval(function () {
                let dinotop = parseInt(window.getComputedStyle(trex).getPropertyValue("bottom"));
                // console.log(dinotop);s
                let cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
                // console.log(cactusleft);
                if (cactusleft < 200 && cactusleft > 150 && dinotop < 35) {
                    // localStorage.setItem('score', i);
                    cactus.classList.remove("anicacti");
                    gr.classList.remove("anigr");

                    // cactus.style.animationPlayState = "paused";
                    // gr.style.animationPlayState = "paused";
                    fired6 = true;

                    audio1.play();


                    getDoc(userDocRef).then((doc) => {
                        if (doc.exists()) {
                            userData = doc.data();
                            // console.log(userData);
                            highscore = doc.data().best;
                            console.log(highscore);
                            if (i > highscore) {
                                console.log("New High score");
                                console.log(i);
                                updateDoc(userDocRef, {
                                    best: Number(i)

                                }).then(() => {
                                    // cactus.classList.remove("anicacti");
                                    // gr.classList.remove("anigr")
                                    console.log("High score updated successfully!");
                                    alert("New High Score");
                                    // bs.innerHTML = ("Best Score: " + i);

                                    window.location.reload();



                                }).catch((error) => {
                                    console.log("Error updating high score:", error);
                                })



                            }
                            else {
                                alert("Game Over!");
                                window.location.reload();
                                // cactus.classList.remove("anicacti");
                                // gr.classList.remove("anigr")
                            }

                            // console.log(doc.data().First);
                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    })

                    //  window.location.reload();
                }

            }, 0.01);
        }


    })

    var diff = ["img/SmallCactus2.png", "img/Smallcactus3.png", "img/LargeCactus2.png"];

    var images = [];
    for (var p = 0; p < diff.length; p++) {
        var img = new Image();
        img.src = diff[i];
        images.push(img);
    }


    setInterval(() => {
        // console.log(left);
        var left = parseFloat(window.getComputedStyle(cactus).getPropertyValue('left'));

        if (left < 100) {

            const randomNumber = Math.floor(Math.random() * 3);
            cactus.src = diff[randomNumber];
            var newtime = ni - 0.01;
            cactus.style.animationDuration = newtime + 's';
            ni = newtime;
            // console.log(newtime);
        }
    }, 10);








}

