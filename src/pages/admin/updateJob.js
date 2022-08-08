import { Box, Button, Card, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateJob } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AlertBox from "../../common/alert";

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

export default function UpdateJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [jobSite, setJobsite] = useState(data.job_site);
  const [startDate, setJobStartDate] = useState(data.start_date);
  const [endDate, setJobEndDate] = useState(data.end_date);
  const loginUser = useSelector((state) => state.userReducer);

  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
  }, [token]);
  useEffect(() => {
    if (!token) return;
  }, [token]);

  const onSubmit = (e) => {
    e.preventDefault();

    const postableData = {
      jobSite,
      startDate,
      endDate,
    };
    console.log("postablebgffggfg", postableData);

    updateJob(data.id, token, postableData)
      .then((res) => {
        console.log("res", res);
        dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
        // alert(res.data.msg);
      })
      .catch((err) => {
        dispatch({ type: "SHOW_ALERT", msg: err.response.data.error });
      });
  };

  return (
    <Layout>
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 5 }}>
        <AlertBox />
        <Box
          sx={{
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          Update Job
        </Box>
        <Card style={{ padding: 10 }}>
          <Grid container>
            <form onSubmit={onSubmit}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      name="jobsite"
                      placeholder="Enter jobsite"
                      label="jobsite"
                      value={jobSite}
                     // disabled
                      onChange={(e) => setJobsite(e.target.value)}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Job Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                          setJobStartDate(newValue);
                        }}
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
                        value={endDate}
                        onChange={(newValue) => {
                          setJobEndDate(newValue);
                        }}
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
                </Grid>
              </Box>
            </form>
          </Grid>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className={classes.submit}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={classes.submit}
              onClick={onSubmit}
            >
              Update
            </Button>
          </Box>
        </Card>
      </Box>
    </Layout>
  );
}
