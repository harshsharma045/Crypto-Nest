import { initializeApp } from "firebase/app"
import firebaseConfig from "./Config/firebaseConfig"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp(firebaseConfig)
import "firebase/compat/auth";
import "firebase/compat/firestore";

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export {auth, db}