import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import teyvat from "../../images/teyvat.png";
import { Map, ImageOverlay } from "react-leaflet";
import { CRS, LatLngBounds, LatLng } from "leaflet";
import Button from "@material-ui/core/Button";
import { signOut } from "../../services/auth";
import PrivateComponent from "../private-component";
import CreateForm from "../create-form/create-form";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: 1,
  },
  button: {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 200,
    opacity: 1,
  },
}));

const MyMap = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [latlng, setLatlng] = useState(null);

  const onClick = (e) => {
    // Open create marker form
    setLatlng(e.latlng);
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" className={classes.button} onClick={signOut}>
        Log Out
      </Button>
      <CreateForm open={open} setOpen={setOpen} latlng={latlng} />
      <Map
        center={[3000, 3000]}
        zoom={0}
        maxZoom={0.5}
        minZoom={-2}
        className={classes.background}
        crs={CRS.Simple}
        bounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
        maxBounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
        onClick={onClick}
      >
        <ImageOverlay
          url={teyvat}
          bounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
          maxBounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
        />
      </Map>
    </>
  );
};

export default PrivateComponent(MyMap);
