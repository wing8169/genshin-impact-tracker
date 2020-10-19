import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import moment from "moment";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const MarkersMenu = (props) => {
  const classes = useStyles();
  const markers = useSelector((state) => state.data.markers);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.setOpen(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key={"intro"}>
          <ListItemText primary={"Markers"} />
        </ListItem>
        {markers.map((marker, ind) => (
          <ListItem
            button
            key={`activity ${ind}`}
            onClick={() => props.focusMarker(marker)}
            style={{
              backgroundColor:
                marker.shortestRespawn !== -1 &&
                marker.estimatedRespawn < new Date()
                  ? "#f50057"
                  : "white",
            }}
          >
            <ListItemText
              secondary={`${marker.type} marker estimated respawns at ${moment(
                marker.estimatedRespawn
              ).toString()}`}
            />
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={props.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default MarkersMenu;
