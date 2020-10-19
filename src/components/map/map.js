import React, { useState, useRef, Fragment, useEffect } from "react";
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
import { DateSlider } from "../date-slider";
import {
  addHours,
  backupMarkers,
  getHoursDiff,
  retrieveMarkers,
} from "../../services/helper";
import {
  addActivity,
  removeMarker,
  setHours,
  updateMarker,
} from "../../redux/dispatchers";
import Button from "@material-ui/core/Button";
import { MarkersMenu } from "../markers-menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tooltip from "@material-ui/core/Tooltip";
import { Helmet } from "react-helmet";
import { Tutorial } from "../tutorial";
import SyncIcon from "@material-ui/icons/Sync";
import BackupIcon from "@material-ui/icons/Backup";

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
  markersMenu: {
    position: "fixed",
    top: 30,
    right: 30,
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
  syncButton: {
    position: "fixed",
    top: 100,
    right: 30,
    zIndex: 10,
    opacity: 1,
    backgroundColor: "#4aa4e0",
  },
  retrieveButton: {
    position: "fixed",
    top: 170,
    right: 30,
    zIndex: 10,
    opacity: 1,
    backgroundColor: "#4aa4e0",
  },
}));

const MyMap = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [markersMenuOpen, setMarkersMenuOpen] = useState(false);
  const [latlng, setLatlng] = useState(null);
  const markers = useSelector((state) => state.data.markers);
  const hours = useSelector((state) => state.data.hours);
  const mapRef = useRef();

  const onClick = (e) => {
    // Open create marker form
    setLatlng(e.latlng);
    setOpen(true);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const openMarkersMenu = () => {
    setMarkersMenuOpen(true);
  };

  const updateHours = (value) => {
    setHours(value);
  };

  const deleteMarker = (marker) => {
    let decision = window.confirm(
      "Are you sure you want to permanently delete the marker?"
    );
    if (!!decision) {
      removeMarker(marker.id);
      // add activity
      addActivity({
        action: "Deleted",
        type: marker.type,
        time: new Date().getTime(),
        marker: marker,
      });
    }
  };

  const saveMarkers = () => {
    const decision = window.confirm(
      "Are you sure you want to backup the markers?"
    );
    if (!!decision) {
      backupMarkers();
    }
  };

  const getMarkers = () => {
    const decision = window.confirm(
      "Are you sure you want to retrieve the markers on cloud and overwrite your local data?"
    );
    if (!!decision) {
      retrieveMarkers();
    }
  };

  const foundMarker = (marker) => {
    const decision = window.confirm("Found the marker again?");
    if (!!decision) {
      // get marker lastFound and count the hours diff
      let hoursDiff = getHoursDiff(marker.lastFound);
      // update the shortest respawn if needed
      if (marker.shortestRespawn === -1 || hoursDiff < marker.shortestRespawn)
        marker.shortestRespawn = hoursDiff;
      // update the recent respawn time
      marker.recentRespawn = hoursDiff;
      // update marker lastFound
      marker.lastFound = new Date().getTime();
      // update the estimated found time (Current logic is using the shortest respawn)
      marker.estimatedRespawn = addHours(marker.lastFound, hoursDiff);
      // update to redux
      updateMarker(marker);
      // add activity
      addActivity({
        action: "Found again",
        type: marker.type,
        time: new Date().getTime(),
        marker: marker,
      });
    }
  };

  const focusMarker = (marker) => {
    if (!marker) return;
    // focus on the selected coordinates
    if (!!mapRef && !!mapRef.current && !!mapRef.current.leafletElement)
      mapRef.current.leafletElement.flyTo([marker.lat, marker.lng], 0.5);
  };

  useEffect(() => {
    // sync db once
    retrieveMarkers();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>
          Genshin Impact Tracker | Track Your Resources and Study the Respawn
          Time
        </title>
        <meta
          name="description"
          content="Genshin Impact Tracker is a personal application to track and study the resources respawn time.
          This is a research-based project and requires data entry to study whether the respawn time of Genshin Impact is
          a complete RNG or there is a logic behind."
        />
      </Helmet>
      <Tooltip title="Menu" aria-label="menu">
        <IconButton
          aria-label="menu"
          className={classes.menu}
          onClick={openMenu}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Markers" aria-label="markers">
        <IconButton
          aria-label="markers"
          className={classes.markersMenu}
          onClick={openMarkersMenu}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Backup to Cloud" aria-label="backup">
        <IconButton
          aria-label="backup"
          className={classes.syncButton}
          onClick={saveMarkers}
        >
          <BackupIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download from Cloud" aria-label="sync">
        <IconButton
          aria-label="sync"
          className={classes.retrieveButton}
          onClick={getMarkers}
        >
          <SyncIcon />
        </IconButton>
      </Tooltip>
      <Tutorial />
      <CreateForm open={open} setOpen={setOpen} latlng={latlng} />
      <SideMenu
        open={menuOpen}
        setOpen={setMenuOpen}
        focusMarker={focusMarker}
      />
      <MarkersMenu
        open={markersMenuOpen}
        setOpen={setMarkersMenuOpen}
        focusMarker={focusMarker}
      />
      <DateSlider setValue={updateHours} />
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
        ref={mapRef}
      >
        <ImageOverlay
          url={teyvat}
          bounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
          maxBounds={new LatLngBounds(new LatLng(0, 6144), new LatLng(6144, 0))}
        />
        {markers.map((marker, idx) =>
          getHoursDiff(marker.lastFound) >= hours ? (
            <Marker
              key={`marker-${idx}`}
              position={[marker.lat, marker.lng]}
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
                <h3>{marker.type}</h3>
                <p>
                  Last Found Time:{" "}
                  {!!marker.lastFound ? moment(marker.lastFound).toString() : 0}
                  <br />
                  Recent Respawn Hours Interval: {
                    marker.recentRespawn
                  } <br /> Shortest Respawn Hours Interval:{" "}
                  {marker.shortestRespawn} <br />
                  Estimated Respawn Time:{" "}
                  {!!marker.estimatedRespawn
                    ? moment(marker.estimatedRespawn).toString()
                    : 0}{" "}
                </p>
                <Button
                  variant="contained"
                  color="secondary"
                  size={"small"}
                  onClick={() => deleteMarker(marker)}
                >
                  Remove Marker
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size={"small"}
                  onClick={() => foundMarker(marker)}
                  style={{ marginLeft: 5 }}
                >
                  Found Again
                </Button>
              </Popup>
            </Marker>
          ) : null
        )}
      </Map>
    </Fragment>
  );
};

export default PrivateComponent(MyMap);
