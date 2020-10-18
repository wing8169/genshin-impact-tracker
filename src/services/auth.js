import { auth } from "./firebase";
import { clearAuthDetails, clearData } from "../redux/dispatchers";
import { history } from "../components/routers/routers";

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
      history.push("/signin");
    })
    .catch(function (error) {
      // An error happened.
    });
}
