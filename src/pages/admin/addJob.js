import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { getJobsites, getUsers, postUserJob } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { RemoveCircle } from "@material-ui/icons";
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
  gridpadding: {
    padding: "0px",
  },
}));

export default function AddJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getJobData, setGetJobData] = useState({
    start_date: "",
    end_date: "",
    job_site: "",
    id: "",
  });
  const [jobsList, setJobsList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEmailData, setselectedEmailData] = useState([]);
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [formFields, setFormFields] = useState([]);
  const loginUser = useSelector((state) => state.userReducer);
  const location = useLocation();
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
      console.log("localtoken--------get jobsites", token);
    } else {
      setToken(loginUser.data.token);
      console.log("statetoken--------get jobsites", token);
    }

    if (token) {
      getJob();
    }
    return;
  }, [token]);

  const getJob = () => {
    console.log("token", token);
    getJobsites(token)
      .then((res) => {
        console.log("get jobs", res.data);
        setJobsList(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postableData = formFields.map((f) => ({
      startDate: f.userStartDate || f.start_date,
      endDate: f.userEndDate || f.end_date,
      jobId: f.id,
      userId: location.state.userId,
    }));
    console.log("postable data", postableData);

    postUserJob(token, postableData)
      .then((res) => {
        if (res.data.status === true) {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
          // setFormFields([]);
        } else {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
        }
      })
      .catch((err) => {
        dispatch({ type: "SHOW_ALERT", msg: err.response.data.error });
      });
  };

  const addFields = () => {
    let object = {
      StartDate: "",
      EndDate: "",
      id: "",
    };
    setFormFields((prev) => [...prev, object]);
  };
  const removeFields = (index) => {
    setFormFields((prev) => prev.filter((_, i) => i !== index));
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
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
          Add Details
        </Box>
        <Card style={{ padding: 10 }}>
          <Grid
            container
            rowspacing={5}
            columnspacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <TextField
                name="Email"
                placeholder="Enter Email"
                value={location.state.email}
                disabled
                onChange={() => {}}
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                // disabled={true}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  marginLeft: "auto",
                  marginTop: "10px",
                }}
                className={classes.submit}
                onClick={addFields}
              >
                Add job
              </Button>
            </Grid>
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
              {formFields?.map((f, index) => {
                return (
                  <Box key={index}>
                    <Grid
                      container
                      rowspacing={1}
                      columnspacing={{ xs: 1, sm: 2, md: 3 }}
                      item
                      xs={12}
                      className={classes.gridpadding}
                    >
                      <Grid item xs={4}>
                        <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
                          <InputLabel
                            id="demo-simple-select-label"
                            shrink={true}
                          >
                            Job site
                          </InputLabel>
                          <Select
                            notched={true}
                            labelId="demo-simple-select-label"
                            label="Jobsite"
                            displayEmpty
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={f.job_site >= 0 ? f.job_site : -1}
                            onChange={(e) => {
                              const idx = e.target.value;
                              console.log("idx---", idx);
                              const jobData = jobsList[idx];

                              console.log(
                                "joblist data---",
                                jobData,
                                formFields
                              );

                              setFormFields((prev) =>
                                prev.map((p, i) => {
                                  console.log("prev==", p, "index==", i);
                                  if (i === index)
                                    return {
                                      StartDate: "",
                                      EndDate: "",
                                      ...jobData,
                                      job_site: idx,
                                    };
                                  else return p;
                                })
                              );
                            }}
                          >
                            <MenuItem value={-1}>Choose Jobsite</MenuItem>
                            {jobsList.map((data, key) => (
                              <MenuItem key={key} value={key}>
                                {data.job_site}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            name="userStartDate"
                            label="Job Start Date"
                            onChange={(newValue) => {
                              setFormFields((prev) =>
                                prev.map((p, i) => {
                                  if (i === index)
                                    return {
                                      ...p,
                                      userStartDate: newValue,
                                    };
                                  else return p;
                                })
                              );
                            }}
                            value={f.userStartDate || f.start_date}
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
                      <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            name="userEndDate"
                            label="Job End Date"
                            onChange={(newValue) => {
                              setFormFields((prev) =>
                                prev.map((p, i) => {
                                  if (i === index)
                                    return {
                                      ...p,
                                      userEndDate: newValue,
                                    };
                                  else return p;
                                })
                              );
                            }}
                            value={f.userEndDate || f.end_date}
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
                      {/* <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Job Start Date"
                            value={f.start_date}
                            onChange={() => {}}
                            disabled={true}
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
                      </Grid> */}
                      {/* <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Job End Date"
                            value={f.end_date}
                            onChange={() => {}}
                            disabled={true}
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
                      </Grid> */}
                      <Grid item xs={1} container justify="flex-end">
                        <RemoveCircle
                          style={{
                            marginTop: "15px",
                            // color: bgColor,
                          }}
                          onClick={() => removeFields(index)}
                        >
                          Remove
                        </RemoveCircle>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </form>
          </Grid>
          <Box
            sx={{
              mt: 5,
              pl: 1.25,
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
              Create
            </Button>
          </Box>
        </Card>
      </Box>
    </Layout>
  );
}
