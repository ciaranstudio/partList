import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const authProvider = {
  isAuthenticated: false,
  user: null,
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
  },
};
