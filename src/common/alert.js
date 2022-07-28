import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const style = {
  //position: 'absolute',
  // top: '50%',
  //left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: "background.paper",
  // border: '4px solid #4c79a1',
  boxShadow: 24,
  p: 2,
};
export default function AlertBox() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(alert.show);
    /*if(alert.show) {
        setTimeout(() => {
            dispatch({ type: "HIDE_ALERT" })
        }, 3000)
    }*/
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "HIDE_ALERT", msg: "" });
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <Box sx={style}>
        {/* <DialogTitle></DialogTitle> */}
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={() => handleClose()}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {alert.msg}
          </Typography>
        </DialogContent>
        <DialogActions>
          {/*  <Button color="primary" variant="contained" onClick={close}>
          Cancel
        </Button>*/}
          <Button
            className="blue-button"
            variant="contained"
            onClick={() => handleClose()}
          >
            Ok
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
