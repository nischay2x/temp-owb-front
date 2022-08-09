import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getViewWorkers,
  postUserJob,
  userJob,
} from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { RemoveCircle } from "@material-ui/icons";
import AlertBox from "./alert";

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

export default function AddWorkerDialog({ open, handleClose, id, refreshApi }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getJobData, setGetJobData] = useState({
    start_date: "",
    end_date: "",
    job_site: "",
    id: "",
  });
  const [userList, setUsersList] = useState([]);
  const [workerId, setWorkerId] = useState(-1);
  const [selectedEmailData, setselectedEmailData] = useState([]);
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState(-1);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setUserStartDate] = useState();
  const [endDate, setUserEndDate] = useState();
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
      getUsersData();
    }
    return;
  }, [token]);

  const getJob = () => {
    console.log("token", token);
    getViewWorkers(token, id)
      .then((res) => {
        setGetJobData(res.data.job);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getUsersData = () => {
    getUsers(token, id)
      .then((res) => {
        setUsersList(res.data.users);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const postableData = formFields.map((f) => ({
    //   startDate: f.userStartDate || getJobData.start_date,
    //   endDate: f.userEndDate || getJobData.end_date,
    //   jobId: getJobData.id,
    //   userId: f.id,
    // }));
    const postableData = [
      {
        startDate: startDate || getJobData.start_date,
        endDate: endDate || getJobData.end_date,
        jobId: getJobData.id,
        userId: workerId,
      },
    ];
    console.log(postableData);

    postUserJob(token, postableData)
      .then((res) => {
        if (res.data.status === true) {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
          handleClose();
          refreshApi();
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
      userStartDate: "",
      userEndDate: "",
      address: "",
      phone: "",
      firstname: "",
      lastname: "",
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
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "#4c79a1",
          color: "white",
          p: 2,
          //   borderTopLeftRadius: "10px",
          //   borderTopRightRadius: "10px",
        }}
      >
        Add Details
      </Box>
      <DialogContent>
        <AlertBox />
        <Box>
          <Grid
            container
            rowspacing={5}
            columnspacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* <Grid item xs={4}>
              <TextField
                name="JobSite"
                placeholder="Enter Jobsite"
                value={getJobData.job_site}
                disabled
                onChange={() => {}}
                label="Job Site"
                variant="outlined"
                margin="dense"
                fullWidth
                // disabled={true}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Job Start Date"
                  value={getJobData.start_date}
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
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Job End Date"
                  value={getJobData.end_date}
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
            {/* <Grid item xs={12}>
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
                Add Worker
              </Button>
            </Grid> */}
            <form onSubmit={onSubmit}>
              {/* {formFields?.map((f, index) => {
                return ( */}
              <Box /* key={index}*/>
                <Grid
                  container
                  rowspacing={1}
                  columnspacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={4}>
                    <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
                      <InputLabel id="demo-simple-select-label" shrink={true}>
                        Email
                      </InputLabel>
                      <Select
                        notched={true}
                        labelId="demo-simple-select-label"
                        label="Email"
                        displayEmpty
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        value={workerId}
                        // value={f.email >= 0 ? f.email : -1}
                        onChange={(e) => {
                          const idx = e.target.value;
                          //   const userData = userList[idx];
                          const userData = userList.find((data) => {
                            return e.target.value === data.id;
                          });

                          setWorkerId(userData.id);
                          setEmail(userData.email);
                          setFirstName(userData.firstname);
                          setLastname(userData.lastname);
                          setPhone(userData.phone);
                          setAddress(userData.address);
                          setUserStartDate();
                          setUserEndDate();

                          //   setFormFields((prev) =>
                          //     prev.map((p, i) => {
                          //       if (i === index)
                          //         return {
                          //           userStartDate: "",
                          //           userEndDate: "",
                          //           ...userData,
                          //           email: idx,
                          //         };
                          //       else return p;
                          //     })
                          //   );
                        }}
                      >
                        <MenuItem value={-1}>Choose Email</MenuItem>
                        {userList.map((data, key) => (
                          <MenuItem key={key} value={data.id}>
                            {data.email}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="FirstName"
                      placeholder="Enter FirstName"
                      //   value={f.firstname}
                      value={firstname}
                      label="First Name"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="LastName"
                      placeholder="Enter Last Name"
                      label="Last Name"
                      //   value={f.lastname}
                      value={lastname}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="Phone"
                      placeholder="Enter Phone"
                      //   value={f.phone}
                      value={phone}
                      label="Phone"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="Address"
                      placeholder="Enter Address"
                      //   value={f.address}
                      value={address}
                      label="Address"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        name="userStartDate"
                        label="User Start Date"
                        onChange={(newValue) => {
                          setUserStartDate(newValue);
                          //   setFormFields((prev) =>
                          //     prev.map((p, i) => {
                          //       if (i === index)
                          //         return {
                          //           ...p,
                          //           userStartDate: newValue,
                          //         };
                          //       else return p;
                          //     })
                          //   );
                        }}
                        value={startDate || getJobData.start_date}
                        // value={f.userStartDate || getJobData.start_date}
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
                        name="userEndDate"
                        label="User End Date"
                        onChange={(newValue) => {
                          setUserEndDate(newValue);
                          //   setFormFields((prev) =>
                          //     prev.map((p, i) => {
                          //       if (i === index)
                          //         return {
                          //           ...p,
                          //           userEndDate: newValue,
                          //         };
                          //       else return p;
                          //     })
                          //   );
                        }}
                        value={endDate || getJobData.end_date}
                        // value={f.userEndDate || getJobData.end_date}
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
                  {/* <Grid container justify="flex-end" item md={8} xs={8}>
                        <RemoveCircle
                          style={{
                            marginTop: "15px",
                            // color: bgColor,
                          }}
                          onClick={() => removeFields(index)}
                        >
                          Remove
                        </RemoveCircle>
                      </Grid> */}
                </Grid>
              </Box>
              {/* //     );
            //   })} */}
            </form>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          onClick={handleClose}
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
      </DialogActions>
    </Dialog>
  );
}
