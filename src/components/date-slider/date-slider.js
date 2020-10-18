import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  slider: {
    position: "absolute",
    bottom: 40,
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 5,
    width: 600,
    maxWidth: "90%",
  },
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    height: "150px",
    zIndex: 4,
    justifyContent: "center",
    backgroundColor: "black",
    opacity: 0.7,
  },
  desc: {
    color: "white",
  },
});

function valuetext(value) {
  return `${value} Hours`;
}

const DateSlider = (props) => {
  const classes = useStyles();
  const hours = useSelector((state) => state.data.hours);

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  return (
    <>
      <div className={classes.root} />
      <div className={classes.slider}>
        <Typography id="discrete-slider" className={classes.desc}>
          Currently showing all resources that are found at least {hours} hours
          ago.
        </Typography>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          value={hours}
          step={1}
          marks
          min={0}
          max={48}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default DateSlider;
