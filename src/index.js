import './styles.css';
import {
    hideLoginError,
    showLoginState,
    showLoginForm,
    showApp,
    showLoginError,
    btnLogin,
    btnSignup,
    btnLogout
} from './ui'

import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    connectAuthEmulator
} from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyA_AvsI7vEbUdwd0128Z1UtvqoBolwzWv4",
    authDomain: "fir-app-85f3a.firebaseapp.com",
    projectId: "fir-app-85f3a",
    storageBucket: "fir-app-85f3a.appspot.com",
    messagingSenderId: "464153245001",
    appId: "1:464153245001:web:b4c3ea5fcb7ab9037e5698",
    measurementId: "G-0JDSL3TB1G"
});

// Login using email/password
const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value

    // step 1: try doing this w/o error handling, and then add try/catch
    // await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

    // step 2: add error handling
    try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    }
    catch (error) {
        console.log(`There was an error: ${error}`)
        showLoginError(error)
    }
}

// Create new account using email/password
const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value

    try {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        console.log(`There was an error: ${error}`)
        showLoginError(error)
    }
}

// Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user)
            showApp()
            showLoginState(user)

            hideLoginError()
            hideLinkError()
        }
        else {
            showLoginForm()
            lblAuthState.innerHTML = `You're not logged in.`
        }
    })
}

// Log out
const logout = async () => {
    await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword)
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();
