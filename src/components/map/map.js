import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import teyvat from "../../images/teyvat.png";
import { Map, ImageOverlay } from "react-leaflet";
import { CRS, LatLngBounds, LatLng } from "leaflet";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
}));

const MyMap = () => {
  const classes = useStyles();

  return (
    <Map
      center={[3000, 3000]}
      zoom={0}
      maxZoom={0.5}
      minZoom={-2}
      className={classes.background}
      crs={CRS.Simple}
      bounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
      maxBounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
    >
      <ImageOverlay
        url={teyvat}
        bounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
        maxBounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
      />
    </Map>
  );
};

export default MyMap;
