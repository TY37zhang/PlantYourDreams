import { auth,db} from "./firebase.js"
import { doc,setDoc} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js"

loginbtn.addEventListener("click",(e) => {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPsw').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`User with uid ${user.uid} signs in successfully!`);
        // ...

        var lgDate = new Date();
        const userRef = doc(db, 'users', user.uid);
        const newData = {
            email: user.email,
            lastLogin: lgDate
        }
        setDoc(userRef, newData, { merge: true })
        .then(userRef => {
            console.log("Last login timestamp updated!")
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
})