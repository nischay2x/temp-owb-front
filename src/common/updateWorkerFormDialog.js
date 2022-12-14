import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AlertBox from "./alert";
import { Box, Grid, Button } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  headercolor: {
    backgroundColor: "#4c79a1",
    color: "white",
  },
  submit: {
    marginRight: "10px",
    backgroundColor: "#4c79a1",
    color: "white",
  },
}));

export default function UpdateWorkerFormDialog({
  open,
  handleClose,
  onChange,
  jobData,
  workersData,
  onSubmit,
}) {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
  }, [token, workersData]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: true,
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            // borderBottomLeftRadius: "10px",
            // borderBottomRightRadius: "10px",
          }}
        >
          Update Worker
        </Box>
        <DialogContent>
          <Box>
            <AlertBox />
            <Grid container>
              <form onSubmit={onSubmit}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        name="email"
                        placeholder="Enter Email"
                        label="Email"
                        value={workersData.email}
                        onChange={(e) => onChange(e)}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        disabled
                        // InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Job Start Date"
                          value={workersData.user_start_date}
                          onChange={(newValue) =>
                            onChange({
                              target: {
                                name: "user_start_date",
                                value: newValue,
                              },
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              margin="dense"
                              fullWidth
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Job End Date"
                          value={workersData.user_end_date}
                          onChange={(newValue) =>
                            onChange({
                              target: {
                                name: "user_end_date",
                                value: newValue,
                              },
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              margin="dense"
                              fullWidth
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        name="jobsite"
                        placeholder="Enter Job Site"
                        label="Job Site"
                        value={jobData.job_site}
                        onChange={(e) => onChange(e)}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        disabled
                        // InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name="firstname"
                        placeholder="Enter name"
                        label="Name"
                        value={workersData.firstname}
                        onChange={(e) => onChange(e)}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        disabled
                        // InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onClick={() => {
              onSubmit(workersData);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
