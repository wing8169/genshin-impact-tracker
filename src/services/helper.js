import { db } from "./firebase";
import { store } from "../redux/store";
import { setMarkers } from "../redux/dispatchers";
import { leylineExpList } from "../constants/leyline";

export const backupMarkers = () => {
  const markers = store.getState().data.markers;
  const id = store.getState().authDetails.id;
  db.ref("users/" + id)
    .set({
      markers,
    })
    .then(() => {
      alert("Data back up successfully!");
    })
    .catch((err) => {
      alert(err);
    });
};

export const retrieveMarkers = () => {
  const id = store.getState().authDetails.id;
  if (!id) return;
  db.ref("users/" + id)
    .once("value")
    .then((snapshot) => {
      if (!!snapshot.val() && !!snapshot.val().markers) {
        setMarkers(snapshot.val().markers);
        alert("Markers have been downloaded from cloud");
      }
    })
    .catch((err) => {
      alert(err);
    });
};

export const getHoursDiff = (t) => {
  return Math.round(
    Math.abs(new Date().getTime() - new Date(t).getTime()) / 3600000
  );
};

export const addHours = (t, h) => {
  return t + h * 60 * 60 * 1000;
};

export const getLeyline = (ar) => {
  const currentLeylineExp = leylineExpList.filter(
    (leyline) => ar >= leyline.minAr && ar <= leyline.maxAr
  );
  if (currentLeylineExp.length === 0) {
    return null;
  }
  return currentLeylineExp[0];
};

export const ceilNumber = (num, place) => {
  let div = 1;
  for (let i = 0; i < place; i++) {
    div *= 10;
  }
  return Math.ceil(num / div) * div;
};
