import { auth } from "./firebase";
import { db } from "./firebase"

export const syncMarkers = async (markers) => {
  await db.ref("users/" + auth().currentUser.uid).set({
      markers
  })
}

export const retrieveMarkers = async () => {
    auth().onAuthStateChanged((user) => {
        if(user) {
            db.ref('users/' + user.uid).on('value', (snapshot) => {
              if(snapshot.val()==null){
                console.log(null)
              }else{
                console.log(snapshot.val().markers)
              }
            })
        }
    })
}

export const getHoursDiff = (t) => {
  return Math.round(
    Math.abs(new Date().getTime() - new Date(t).getTime()) / 3600000
  );
};

export const addHours = (t, h) => {
  return t.getTime() + h * 60 * 60 * 1000;
};
