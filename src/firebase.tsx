import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { message: user.email + " registered.", type: "success", user };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return { message: user.email + " logged in.", type: "success", user };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

export const logout = async () => {
  try {
    const userCredential = await signOut(auth);

    return { message: "Logged out.", type: "success" };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

export const saveInformations = async (data: any) => {
  try {
    await updateProfile(auth.currentUser as any, data);
    return {
      message: "Saved successfuly.",
      type: "success",
      user: auth.currentUser,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

export const saveEmail = async (email: string) => {
  try {
    await updateEmail(auth.currentUser as any, email);
    return {
      message: "Saved successfuly.",
      type: "success",
      user: auth.currentUser,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

export const savePhoneNumber = async (phoneNumber: string) => {
  try {
    await updatePhoneNumber(auth.currentUser as any, phoneNumber as any);
    return {
      message: "Saved successfuly.",
      type: "success",
      user: auth.currentUser,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

export const savePassword = async (password: string) => {
  try {
    await updatePassword(auth.currentUser as any, password);
    return {
      message: "Saved successfuly.",
      type: "success",
      user: auth.currentUser,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { message: errorMessage, type: "error" };
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    localStorage.setItem("user", JSON.stringify(user));

    // ...
  } else {
    // User is signed out
    // ...
    localStorage.removeItem("user");
  }
});

export default app;
