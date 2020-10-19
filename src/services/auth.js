import { auth } from "./firebase";
import { clearAuthDetails, clearData } from "../redux/dispatchers";

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signOut() {
  auth()
    .signOut()
    .then(function () {
      clearAuthDetails();
      clearData();
    })
    .catch(function (error) {
      // An error happened.
    });
}
