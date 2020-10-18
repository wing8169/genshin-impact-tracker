import { auth } from "./firebase";
import { clearAuthDetails, clearMarkers } from "../redux/dispatchers";
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
      clearMarkers();
      history.push("/signin");
    })
    .catch(function (error) {
      // An error happened.
    });
}
