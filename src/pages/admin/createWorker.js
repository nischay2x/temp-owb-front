import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createJob, createWorker, postUserJob } from "../../services/api";
import { useNavigate } from "react-router-dom";
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

export default function CreateWorker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState("");
  const classes = useStyles();
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
  }, [token]);
  const onSubmit = (e) => {
    e.preventDefault();
    const postableData = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      phone: phone,
      role: role,
    };
    console.log("postable data", postableData);

    createWorker(token, postableData)
      .then((res) => {
        if (res.data.status === true) {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
          setEmail("");
          setFirstname("");
          setLastname("");
          setPhone("");
          setRole("");
          setPassword("");
        } else {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
        }
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
          Add Details
        </Box>
        <Card style={{ padding: 10 }}>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <TextField
                name="Email"
                className="form-feild"
                placeholder="Enter Email"
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                name="Phone"
                className="form-feild"
                placeholder="Enter Phone"
                label="Phone"
                variant="outlined"
                margin="dense"
                fullWidth
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="FirstName"
                className="form-feild"
                placeholder="Enter FirstName"
                label="First Name"
                variant="outlined"
                margin="dense"
                fullWidth
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
              <FormControl fullWidth>
                <InputLabel margin="dense">Role</InputLabel>
                <Select
                  // labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  sx={{ mt: 1 }}
                  name="role"
                  placeholder="Enter role"
                  label="role"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="worker">Worker</MenuItem>
                </Select>
              </FormControl>
              {/**  <TextField
                name="role"
                className="form-feild"
                placeholder="Enter role"
                label="role"
                variant="outlined"
                margin="dense"
                fullWidth
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />*/}
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="Lastname"
                className="form-feild"
                placeholder="Enter Last Name"
                label="Last Name"
                variant="outlined"
                margin="dense"
                fullWidth
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
              {/*  <TextField
                name="Password"
                placeholder="Enter Password"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="dense"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
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
              Create
            </Button>
          </Box>
        </Card>
      </Box>
    </Layout>
  );
}
