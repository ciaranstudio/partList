import {
  signInWithEmailAndPassword,
  signOut,
  // sendSignInLinkToEmail,
  // isSignInWithEmailLink,
  // signInWithEmailLink,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const authProvider = {
  isAuthenticated: false,
  user: null,
  // actionCodeSettings: null,
  async signout() {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        authProvider.isAuthenticated = false;
        authProvider.email = "";
        authProvider.password = "";
        authProvider.user = null;
        redirect("/");
      })
      .catch((error) => {
        // An error happened.
        // console.log(error);
      });
  },
  async signin(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.user = userCredential.user;
        // console.log(
        //   "log inside of signIn function (userCredential.user): ",
        //   userCredential.user
        // );
        // console.log("log inside of signIn function (this.user): ", this.user);
        this.isAuthenticated = true;
      })
      .catch((error) => {
        // console.log("Error from catch of firebase sign in method: ", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        this.signout();
      });
    // this.actionCodeSettings = {
    //   url: "https://partlist-e9fc0.web.app",
    //   handleCodeInApp: true,
    // };

    // sendSignInLinkToEmail(this.auth, this.email, this.actionCodeSettings)
    //   .then(() => {
    //     // The link was successfully sent. Inform the user.
    //     // Save the email locally so you don't need to ask the user for it again
    //     // if they open the link on the same device.
    //     window.localStorage.setItem("emailForSignIn", this.email);

    //     let uid = null;
    //     onAuthStateChanged(authProvider.auth, (user) => {
    //       if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/auth.user
    //         uid = user.uid;
    //         authProvider.isAuthenticated = true;
    //         // ...
    //       } else {
    //         authProvider.isAuthenticated = false;
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);
    //     // ...
    //   });
  },
};
