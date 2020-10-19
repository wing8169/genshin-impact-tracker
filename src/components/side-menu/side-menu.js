import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOut } from "../../services/auth";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import moment from "moment";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const SideMenu = (props) => {
  const classes = useStyles();
  const name = useSelector((state) => state.authDetails.displayName);
  const activities = useSelector((state) => state.data.activities);

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
        <ListItem key={"welcome"}>
          <ListItemText primary={"Welcome Back,"} />
        </ListItem>
        <ListItem key={"name"}>
          <ListItemText primary={name} style={{ color: "#4aa4e0" }} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"activities"}>
          <ListItemText primary={"Activities"} />
        </ListItem>
      </List>
      <List
        style={{
          marginTop: 0,
          paddingTop: 0,
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        {activities.map((activity, ind) => (
          <ListItem
            button
            key={`activity ${ind}`}
            onClick={() => props.focusMarker(activity.marker)}
          >
            <ListItemText
              secondary={`${activity.action} ${
                activity.type
              } marker at ${moment(activity.time).toString()}`}
            />
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key={"logout"} onClick={signOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={props.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default SideMenu;
