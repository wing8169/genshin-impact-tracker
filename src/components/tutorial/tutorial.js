import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Tutorial = () => {
  const [open, setOpen] = React.useState(true);
  const scroll = "paper";

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Genshin Impact Tracker
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Genshin Impact Tracker is a personal research project to study the
            behavior of resource respawn time. <br />
            <br />
            Via this platform, you can navigate through the world of Teyvat and
            click to mark new resources found. Once you have found the resources
            again, click on the existing markers and click "Found Again", the
            estimated next respawn time will be calculated based on the shortest
            time interval difference. <br />
            <br />
            You can keep track of your activities at the side menu, and click to
            see the markers involved. Besides, you can click on the upper right
            notification icon button to see what are the resources that are
            expected to be respawned (Will be highlighted red). Take note that
            the estimation will only be carried out if you have found a resource{" "}
            <b>at least twice.</b> <br />
            <br />
            <b>
              The current version does not support cloud syncing, your data will
              only be accessible to your device.{" "}
            </b>
            We are working on cloud syncing and will be up soon!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Try Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tutorial;
