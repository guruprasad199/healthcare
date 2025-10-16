// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7lc0kCSLNO9ugntDuHP_RjHw52Suiyl0",
  authDomain: "healthcare-65490.firebaseapp.com",
  projectId: "healthcare-65490",
  storageBucket: "healthcare-65490.firebasestorage.app",
  messagingSenderId: "222796587599",
  appId: "1:222796587599:web:b1be5bcd3056784a1e803a",
  measurementId: "G-M59N086E8F",
};

// ✅ Initialize app safely (prevents “no app” error)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Use single instance of auth
export const auth = getAuth(app);

// 🔹 Signup function
export const signup = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name,
    };
  } catch (error) {
    return { error: error.message, code: error.code };
  }
};

// 🔹 Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message, code: error.code };
  }
};
