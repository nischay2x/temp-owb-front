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
import { useLocation, useNavigate } from "react-router-dom";

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

export default function UpdateJobFormDialog({
  open,
  handleClose,
  onChange,
  jobsData,
  jobEmail,
  onSubmit,
}) {
  console.log("jobsdatatta------", jobsData);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();
  // const data = location.state.data;
  const classes = useStyles();
  const [token, setToken] = useState("");
  // const [jobSite, setJobsite] = useState(jobsData.job_site);
  // const [startDate, setJobStartDate] = useState(jobsData.start_date);
  // const [endDate, setJobEndDate] = useState(jobsData.end_date);
  const [email, setEmail] = useState(jobEmail);
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
  }, [token, jobsData]);

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
          Update Job
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
                        name="job_site"
                        placeholder="Enter jobsite"
                        label="jobsite"
                        value={jobsData.job_site}
                        // onChange={(e) => setJobsite(e.target.value)}
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
                          name="start_date"
                          label="Job Start Date"
                          value={jobsData.start_date}
                          onChange={(newValue) =>
                            onChange({
                              target: { name: "start_date", value: newValue },
                            })
                          }
                          //   onChange={(newValue) => {
                          //     setJobStartDate(newValue);
                          //   }}
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
                          name="end_date"
                          label="Job End Date"
                          value={jobsData.end_date}
                          onChange={(newValue) =>
                            onChange({
                              target: { name: "end_date", value: newValue },
                            })
                          }
                          //   onChange={(newValue) => {
                          //     setJobEndDate(newValue);
                          //   }}
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
                        name="email"
                        placeholder="Enter Email"
                        label="Email"
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
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
              onSubmit(jobsData);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
