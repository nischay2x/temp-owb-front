import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { localuser } from "../../config/constant";
import { getViewWorkers, postUserJob, updateWorker } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { role, roles } from "../../jsons/roleJson";
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

export default function UpdateWorker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [firstname, setFirstName] = useState(data.firstname);
  const [lastname, setLastName] = useState(data.lastname);
  const [address, setAddress] = useState(data.address);
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);
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
      firstname,
      lastname,
      phone,
      address,
      role,
    };
    console.log("postablebgffggfg", postableData);

    updateWorker(data.id, token, postableData)
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
          Update User
        </Box>
        <Card style={{ padding: 10 }}>
          <Grid container>
            <form onSubmit={onSubmit}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      className="form-feild"
                      name="FirstName"
                      placeholder="Enter FirstName"
                      label="First Name"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      className="form-feild"
                      name="LastName"
                      placeholder="Enter Last Name"
                      label="Last Name"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      className="form-feild"
                      name="Phone"
                      placeholder="Enter Phone"
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      className="form-feild"
                      name="Email"
                      placeholder="Enter Email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      disabled
                      // InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      className="form-feild"
                      name="Address"
                      placeholder="Enter Address"
                      label="Address"
                      value={address}
                      variant="outlined"
                      margin="dense"
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      // InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      className="form-feild"
                      select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      label="Select"
                    >
                      {roles.map((data, key) => (
                        <MenuItem key={key} value={data.role}>
                          {data.role}
                        </MenuItem>
                      ))}
                    </TextField>
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
