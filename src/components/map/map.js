import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import teyvat from "../../images/teyvat.webp";
import { Map, ImageOverlay, Marker, Popup } from "react-leaflet";
import { CRS, LatLngBounds, LatLng, icon } from "leaflet";
import PrivateComponent from "../private-component";
import CreateForm from "../create-form/create-form";
import SideMenu from "../side-menu/side-menu";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: 1,
  },
  menu: {
    position: "fixed",
    top: 30,
    left: 30,
    zIndex: 10,
    opacity: 1,
    backgroundColor: "#4aa4e0",
  },
  button: {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 10,
    opacity: 1,
  },
  marker: {
    backgroundColor: "red",
  },
}));

const MyMap = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [latlng, setLatlng] = useState(null);
  const markers = useSelector((state) => state.markers.markers);

  const onClick = (e) => {
    // Open create marker form
    setLatlng(e.latlng);
    setOpen(true);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <IconButton aria-label="menu" className={classes.menu} onClick={openMenu}>
        <MenuIcon />
      </IconButton>
      <CreateForm open={open} setOpen={setOpen} latlng={latlng} />
      <SideMenu open={menuOpen} setOpen={setMenuOpen} />
      <Map
        center={[3000, 3000]}
        zoom={0}
        maxZoom={0.5}
        minZoom={-2}
        zoomControl={false}
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
        {markers.map((marker, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={[marker.lat, marker.lng]}
            className={classes.marker}
            icon={icon({
              iconUrl:
                marker.type === "Chest"
                  ? require("../../images/marker-red.png")
                  : marker.type === "Plant"
                  ? require("../../images/marker-green.png")
                  : require("../../images/marker-blue.png"),
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
              <span>
                {marker.type} <br /> Created At:{" "}
                {!!marker.createdAt ? moment(marker.createdAt).toString() : 0}{" "}
                <br /> Estimated Respawn: {marker.estimatedRespawn}
              </span>
            </Popup>
          </Marker>
        ))}
      </Map>
    </>
  );
};

export default PrivateComponent(MyMap);
