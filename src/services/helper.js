import { auth } from "./firebase";
import { db } from "./firebase";
import { store } from "../redux/store";
import { setMarkers } from "../redux/dispatchers";
import { signInWithGoogle } from "./auth";

export const backupMarkers = () => {
  // if user is logged out due to any reason, try to help them log in back
  if (!auth().currentUser) {
    signInWithGoogle().then(() => {
      const markers = store.getState().data.markers;
      const id = store.getState().authDetails.id;
      db.ref("users/" + id)
        .set({
          markers,
        })
        .then(() => {
          alert("Data back up successfully!");
        });
    });
  } else {
    const markers = store.getState().data.markers;
    const id = store.getState().authDetails.id;
    db.ref("users/" + id)
      .set({
        markers,
      })
      .then(() => {
        alert("Data back up successfully!");
      });
  }
};

export const retrieveMarkers = () => {
  // if user is logged out due to any reason, try to help them log in back
  if (!auth().currentUser) {
    signInWithGoogle().then(() => {
      const id = store.getState().authDetails.id;
      db.ref("users/" + id)
        .once("value")
        .then((snapshot) => {
          if (!!snapshot.val() && !!snapshot.val().markers) {
            setMarkers(snapshot.val().markers);
            alert("Markers have been downloaded from cloud");
          }
        });
    });
  } else {
    const id = store.getState().authDetails.id;
    db.ref("users/" + id)
      .once("value")
      .then((snapshot) => {
        if (!!snapshot.val() && !!snapshot.val().markers) {
          setMarkers(snapshot.val().markers);
          alert("Markers have been downloaded from cloud");
        }
      });
  }
};

export const getHoursDiff = (t) => {
  return Math.round(
    Math.abs(new Date().getTime() - new Date(t).getTime()) / 3600000
  );
};

export const addHours = (t, h) => {
  return t + h * 60 * 60 * 1000;
};
