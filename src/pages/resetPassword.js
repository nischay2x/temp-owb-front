import { Box, Button, Container, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../common/alert";
import { resetPassword } from "../services/api";
import BackgroundImage from "../images/oneweekbath.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    backgroundColor: "#4c79a1",
    color: "white",
  },
  paperContainer: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [email, setEmail] = useState(location.state.email);
  const [newPassword, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");
  const Redirectlogin = async (e) => {
    navigate("/");
  };
  const HandleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword != confirmNewPassword) {
      alert("please enter same password as confirm password");
    }

    const postableData = {
      email,
      otp,
      newPassword,
      confirmNewPassword,
    };
    resetPassword(postableData)
      .then((res) => {
        if (res.data.status === true) {
          console.log("res", res);
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
          Redirectlogin();
        } else {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
        }
      })
      .catch((err) => {
        dispatch({ type: "SHOW_ALERT", msg: err.response.data.error });
      });
  };

  return (
    <Paper className={classes.paperContainer}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <Container component="main" maxWidth="xs">
        <AlertBox />
        <Box>
          <Paper
            style={{
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle",
              boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "20px",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 70,
                width: 350,
              }}
              alt="The house from the offer."
              src="https://cloud.vastedge.com/apps/vastedge/r/327/files/static/v5/OWB-New-Bath-Logo.webp"
            />
            <form onSubmit={HandleResetPassword}>
              <TextField
                variant="outlined"
                type="email"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                type="OTP"
                margin="normal"
                required
                fullWidth
                label="OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <TextField
                variant="outlined"
                type="password"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                type="confirmpassword"
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                id="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={HandleResetPassword}
              >
                Reset Password
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </Paper>
  );
}
