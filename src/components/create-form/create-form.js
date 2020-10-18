import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import RoomIcon from "@material-ui/icons/Room";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    marginBottom: 5,
  },
  form: {
    padding: 20,
  },
}));

function PaperComponent(props) {
  const classes = useStyles();

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} className={classes.form} />
    </Draggable>
  );
}

const CreateForm = (props) => {
  const classes = useStyles();

  const submitForm = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Create Marker
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new marker at position [
            {!!props.latlng ? props.latlng.lat : 0},{" "}
            {props.latlng ? props.latlng.lng : 0}]
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.buttons}>
          <Button
            onClick={() => props.setOpen(false)}
            variant="contained"
            color="primary"
            startIcon={<RoomIcon />}
            className={classes.button}
          >
            Artifacts
          </Button>
          <Button
            onClick={submitForm}
            variant="contained"
            color="primary"
            enabled={!!props.latlng}
            startIcon={<RoomIcon />}
            className={classes.button}
          >
            Plants
          </Button>
          <Button
            onClick={submitForm}
            variant="contained"
            color="primary"
            enabled={!!props.latlng}
            startIcon={<RoomIcon />}
            className={classes.button}
          >
            Chests
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateForm;
