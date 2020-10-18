import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PictureInPictureMagnifier } from "react-image-magnifiers";
import teyvat from "../../images/teyvat.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    padding: 0,
  },
  background: {
    width: 600,
    margin: "auto",
  },
}));

const Map = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PictureInPictureMagnifier
        imageSrc={teyvat}
        imageAlt="Teyvat"
        className={classes.background}
      />
    </div>
  );
};

export default Map;
