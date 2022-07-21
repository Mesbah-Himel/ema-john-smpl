import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import * as firebase from "firebase/app"; 
import {
  getAuth,
  signInWithPopup,
  updateProfile,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export const initializeLoginFramework = () => {
    if(app.length === 0) {
        initializeApp(firebaseConfig);
    }
}
// export const initializeLoginFramework = () => {
//   const app = initializeApp(firebaseConfig);
// };
const app = initializeApp(firebaseConfig); //extra
const auth = getAuth(app);

export const handleGoogleSignIn = () => {
//   const app = initializeApp(firebaseConfig); 
//   const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const { displayName, email } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true,
      };
      return signedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const handleSignOut = () => {
  const app = initializeApp(firebaseConfig); //extra
  const auth = getAuth(app); //extra
  return signOut(auth)
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((error) => {
      // An error happened.
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = " ";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = " ";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  updateProfile(auth.currentUser, {
    displayName: name,
  })
    .then(() => {
      // Profile updated!
      console.log("User name updated successfully");
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
    });
};
