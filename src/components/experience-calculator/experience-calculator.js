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
import { characterExpList } from "../../constants/character";
import { ceilNumber, getLeyline } from "../../services/helper";
import TableContainer from "@material-ui/core/TableContainer";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

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
  tableHeader: {
    backgroundColor: "#424242",
    color: "white",
  },
  greenTableHeader: {
    backgroundColor: "#4ae645",
  },
  blueTableHeader: {
    backgroundColor: "#45c6e6",
  },
  purpleTableHeader: {
    backgroundColor: "#a845e6",
  },
  goldTableHeader: {
    backgroundColor: "#e6e045",
  },
}));

const ExperienceCalculator = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [ar, setAr] = useState(8);
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
  const [smallNeeded, setSmallNeeded] = useState(0);
  const [mediumNeeded, setMediumNeeded] = useState(0);
  const [largeNeeded, setLargeNeeded] = useState(0);
  const [minSmallLeyline, setMinSmallLeyline] = useState(0);
  const [minMediumLeyline, setMinMediumLeyline] = useState(0);
  const [minLargeLeyline, setMinLargeLeyline] = useState(0);
  const [minLeylineExp, setMinLeylineExp] = useState(0);
  const [leylineNeeded, setLeylineNeeded] = useState(0);
  const [resinNeeded, setResinNeeded] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculate = (e) => {
    e.preventDefault();
    // reset everything
    setCalculated(false);
    setError("");
    setExpAvailable(0);
    setExpRemaining(0);
    setExpNeeded(0);
    setSmallNeeded(0);
    setMediumNeeded(0);
    setLargeNeeded(0);
    setLeylineNeeded(0);
    setResinNeeded(0);
    setMinSmallLeyline(0);
    setMinMediumLeyline(0);
    setMinLargeLeyline(0);
    setMinLeylineExp(0);
    // calculate total experience based on the materials
    const totalExpAvailable =
      currentSmall * 1000 + currentMedium * 5000 + currentLarge * 20000;
    setExpAvailable(totalExpAvailable);
    // validation
    if (
      currentLevel < 1 ||
      currentLevel > 80 ||
      targetLevel < 1 ||
      targetLevel > 80
    ) {
      setError(
        "Invalid level. Current maximum level capped at 80 due to lack of information, sorry for the inconvenience."
      );
      return;
    }
    if (currentLevel >= targetLevel) {
      setError("Already achieved the target level.");
      return;
    }
    if (characterExpList[currentLevel] < currentExperience) {
      setError(
        "Current experience exceeds the maximum experience in the current level."
      );
      return;
    }
    // calculate total experience needed
    let totalExpNeeded = 0;
    for (let i = currentLevel; i < targetLevel; i++) {
      // deduct by current experience for the current level
      if (i === currentLevel)
        totalExpNeeded += characterExpList[i] - currentExperience;
      else totalExpNeeded += characterExpList[i];
    }
    setExpNeeded(totalExpNeeded);
    setMoraNeeded(totalExpNeeded / 5);
    // calculate remaining experience materials after levelling
    let totalExpRemaining = totalExpAvailable - totalExpNeeded;
    setExpRemaining(totalExpRemaining);
    // calculate experience materials needed
    let currentExpNeeded = ceilNumber(totalExpNeeded, 3);
    const totalLargeNeeded = Math.floor(currentExpNeeded / 20000);
    setLargeNeeded(totalLargeNeeded);
    currentExpNeeded -= totalLargeNeeded * 20000;
    const totalMediumNeeded = Math.floor(currentExpNeeded / 5000);
    setMediumNeeded(totalMediumNeeded);
    currentExpNeeded -= totalMediumNeeded * 5000;
    const totalSmallNeeded = Math.floor(currentExpNeeded / 1000);
    setSmallNeeded(totalSmallNeeded);
    // calculate leyline needed
    const leyline = getLeyline(ar);
    if (!!leyline) {
      setMinSmallLeyline(leyline.small);
      setMinMediumLeyline(leyline.medium);
      setMinLargeLeyline(leyline.large);
      const totalMinLeylineExp =
        leyline.small * 1000 + leyline.medium * 5000 + leyline.large * 20000;
      setMinLeylineExp(totalMinLeylineExp);
      if (totalExpNeeded > 0) {
        currentExpNeeded = ceilNumber(totalExpNeeded, 3);
        const totalLeylineNeeded = Math.ceil(
          currentExpNeeded / totalMinLeylineExp
        );
        setLeylineNeeded(totalLeylineNeeded);
        setResinNeeded(totalLeylineNeeded * 20);
      } else {
        setLeylineNeeded(0);
        setResinNeeded(0);
      }
    } else {
      setLeylineNeeded(-1);
      setResinNeeded(-1);
      setMinSmallLeyline(-1);
      setMinMediumLeyline(-1);
      setMinLargeLeyline(-1);
    }
    setCalculated(true);
  };

  return (
    <>
      <Helmet>
        <title>
          Genshin Impact Experience Calculator | Track Your Character Experience
          Points Time
        </title>
        <meta
          name="description"
          content="Genshin Impact Experience Calculator is a simple calculator to calculate the amount of experience needed to upgrade your
          character to a target level. It also counts the number of experience materials required as well as the maximum resin required."
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
            label="Adventure Rank"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 1, max: 49 } }}
            value={ar}
            onChange={(e) => {
              setAr(parseInt(e.target.value));
            }}
          />
          <TextField
            id="currentLevel"
            label="Current Character Level"
            type="number"
            fullWidth
            className={classes.formItem}
            InputProps={{ inputProps: { min: 1, max: 80 } }}
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
            label="Experience Materials - Wanderer's Advice (+ 1,000)"
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
            label="Experience Materials - Adventurer's Experience (+ 5,000)"
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
            label="Experience Materials - Hero's Wit (+ 20,000)"
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
            InputProps={{ inputProps: { min: 2, max: 80 } }}
            value={targetLevel}
            onChange={(e) => {
              setTargetLevel(parseInt(e.target.value));
            }}
          />
          {error ? <p>{error}</p> : null}
          {calculated ? (
            <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeader}>Item</TableCell>
                    <TableCell align="right" className={classes.tableHeader}>
                      Number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Total Experience from the Materials
                    </TableCell>
                    <TableCell align="right">{expAvailable}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Total Experience Needed
                    </TableCell>
                    <TableCell align="right">{expNeeded}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Total Experience Remaining
                    </TableCell>
                    <TableCell align="right">{expRemaining}</TableCell>
                  </TableRow>
                  <TableRow className={classes.goldTableHeader}>
                    <TableCell component="th" scope="row">
                      Total Mora Needed
                    </TableCell>
                    <TableCell align="right">{moraNeeded}</TableCell>
                  </TableRow>
                  <TableRow className={classes.greenTableHeader}>
                    <TableCell component="th" scope="row">
                      Total Wanderer's Advice Needed
                    </TableCell>
                    <TableCell align="right">{smallNeeded}</TableCell>
                  </TableRow>
                  <TableRow className={classes.blueTableHeader}>
                    <TableCell component="th" scope="row">
                      Total Adventurer's Experience Needed
                    </TableCell>
                    <TableCell align="right">{mediumNeeded}</TableCell>
                  </TableRow>
                  <TableRow className={classes.purpleTableHeader}>
                    <TableCell component="th" scope="row">
                      Total Hero's Wit Needed
                    </TableCell>
                    <TableCell align="right">{largeNeeded}</TableCell>
                  </TableRow>
                  <TableRow className={classes.greenTableHeader}>
                    <TableCell component="th" scope="row">
                      Minimum Wanderer's Advice Acquired Per Leyline Crop
                    </TableCell>
                    <TableCell align="right">{minSmallLeyline}</TableCell>
                  </TableRow>
                  <TableRow className={classes.blueTableHeader}>
                    <TableCell component="th" scope="row">
                      Minimum Adventurer's Experience Acquired Per Leyline Crop
                    </TableCell>
                    <TableCell align="right">{minMediumLeyline}</TableCell>
                  </TableRow>
                  <TableRow className={classes.purpleTableHeader}>
                    <TableCell component="th" scope="row">
                      Minimum Hero's Wit Acquired Per Leyline Crop
                    </TableCell>
                    <TableCell align="right">{minLargeLeyline}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Minimum Total Experience Per Leyline Crop
                    </TableCell>
                    <TableCell align="right">{minLeylineExp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Maximum Leyline Crop Trip(s) Needed
                    </TableCell>
                    <TableCell align="right">{leylineNeeded}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Maximum Resins Needed
                    </TableCell>
                    <TableCell align="right">{resinNeeded}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
