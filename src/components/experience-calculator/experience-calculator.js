import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Helmet } from "react-helmet";
import MapIcon from "@material-ui/icons/Map";
import { Link } from "react-router-dom";
import genshinImg from "../../images/genshin-impact.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  mapButton: {
    position: "fixed",
    top: 30,
    right: 30,
    zIndex: 10,
    opacity: 1,
    backgroundColor: "#f50057",
  },
  bg: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    objectFit: "cover",
    zIndex: -1,
    margin: 0,
  },
  submit: {
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    padding: 50,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    opacity: 0.8,
    margin: "auto",
    boxShadow: "10px 10px 5px grey",
  },
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  formItem: {
    marginBottom: 20,
  },
}));

// expList represents the amount of experience needed to level up in each level (level 1 is index 1, NOT 0)
const expList = [
  0,
  1000,
  1325,
  1700,
  2150,
  2625,
  3150,
  3725,
  4350,
  5000,
  5700,
  6450,
  7225,
  8050,
  8925,
  9825,
  10750,
  11725,
  12725,
  13775,
  14875,
  16800,
  18000,
  19250,
  20550,
  21875,
  23250,
  24650,
  26100,
  27575,
  29100,
  30650,
  32250,
  33875,
  35550,
  37250,
  38975,
  40750,
  42575,
  44425,
  46300,
  50625,
  52700,
  54775,
  56900,
  59075,
  61275,
  63525,
  65800,
  69125,
  70475,
  76500,
  79050,
  81650,
  84275,
  86950,
  89650,
  92400,
  95175,
  98000,
  100875,
  108950,
  112050,
  115175,
  118325,
  121525,
  124775,
  128075,
  131400,
  134775,
  138175,
  201325,
  206300,
  211300,
  216375,
  221500,
  226700,
  231925,
  237225,
  242575,
  248000,
  319375,
  342650,
  367525,
  394125,
  422550,
  452925,
  485375,
  520050,
  557075,
  596600,
];

const ExperienceCalculator = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [currentSmall, setCurrentSmall] = useState(0);
  const [currentMedium, setCurrentMedium] = useState(0);
  const [currentLarge, setCurrentLarge] = useState(0);
  const [targetLevel, setTargetLevel] = useState(2);
  const [expAvailable, setExpAvailable] = useState(0);
  const [expRemaining, setExpRemaining] = useState(0);
  const [expNeeded, setExpNeeded] = useState(0);
  const [moraNeeded, setMoraNeeded] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculate = (e) => {
    e.preventDefault();
    // reset everything
    setCalculated(false);
    setError("");
    setExpAvailable(0);
    setExpRemaining(0);
    setExpNeeded(0);
    // calculate total experience based on the materials
    const totalExpAvailable =
      currentSmall * 1000 + currentMedium * 5000 + currentLarge * 20000;
    setExpAvailable(totalExpAvailable);
    // validation
    if (currentLevel >= targetLevel) {
      setError("Already achieved the target level.");
      return;
    }
    if (expList[currentLevel] < currentExperience) {
      setError(
        "Current experience exceeds the maximum experience in the current level."
      );
      return;
    }
    // calculate total experience needed
    let totalExpNeeded = 0;
    for (let i = currentLevel; i < targetLevel; i++) {
      // deduct by current experience for the current level
      if (i === currentLevel) totalExpNeeded += expList[i] - currentExperience;
      else totalExpNeeded += expList[i];
    }
    setExpNeeded(totalExpNeeded);
    setMoraNeeded(totalExpNeeded / 5);
    // calculate remaining experience materials after levelling
    let totalExpRemaining = totalExpAvailable - totalExpNeeded;
    setExpRemaining(totalExpRemaining);
    setCalculated(true);
  };

  return (
    <>
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
      <img src={genshinImg} alt={"bg"} className={classes.bg} />
      <Tooltip title="Map Tracker" aria-label="map" component={Link} to="/">
        <IconButton aria-label="sync" className={classes.mapButton}>
          <MapIcon />
        </IconButton>
      </Tooltip>
      <div className={classes.root}>
        <form
          className={classes.paper}
          noValidate
          autoComplete="off"
          onSubmit={calculate}
        >
          <Typography
            component="h1"
            variant="h5"
            align="center"
            className={classes.formItem}
          >
            Experience Calculator
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            className={classes.formItem}
          >
            Calculate the amount of experience needed to level up a character to
            the selected level.
          </Typography>
          <TextField
            id="currentLevel"
            label="Current Character Level"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 1, max: 90 } }}
            value={currentLevel}
            onChange={(e) => {
              setCurrentLevel(parseInt(e.target.value));
            }}
          />
          <TextField
            id="currentExperience"
            label="Character Experience (At Current Level)"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 0 } }}
            value={currentExperience}
            onChange={(e) => {
              setCurrentExperience(parseInt(e.target.value));
            }}
          />
          <TextField
            id="currentSmall"
            label="Experience Materials (+ 1,000)"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 0 } }}
            value={currentSmall}
            onChange={(e) => {
              setCurrentSmall(parseInt(e.target.value));
            }}
          />
          <TextField
            id="currentMedium"
            label="Experience Materials (+ 5,000)"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 0 } }}
            value={currentMedium}
            onChange={(e) => {
              setCurrentMedium(parseInt(e.target.value));
            }}
          />
          <TextField
            id="currentLarge"
            label="Experience Materials (+ 20,000)"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 0 } }}
            value={currentLarge}
            onChange={(e) => {
              setCurrentLarge(parseInt(e.target.value));
            }}
          />
          <TextField
            id="targetLevel"
            label="Target Character Level"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 2, max: 90 } }}
            value={targetLevel}
            onChange={(e) => {
              setTargetLevel(parseInt(e.target.value));
            }}
          />
          {error ? <p>{error}</p> : null}
          {calculated ? (
            <>
              <Typography
                variant="subtitle2"
                align="center"
                className={classes.formItem}
              >
                Total Experience from the Materials: {expAvailable}
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                className={classes.formItem}
              >
                Total Experience Needed to Level Up: {expNeeded}
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                className={classes.formItem}
              >
                Total Mora Needed to Level Up: {moraNeeded}
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                className={classes.formItem}
              >
                Total Experience Remaining after Levelling: {expRemaining}
              </Typography>
            </>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Calculate
          </Button>
        </form>
      </div>
    </>
  );
};

export default ExperienceCalculator;
