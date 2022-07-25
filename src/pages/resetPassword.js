import { Box, Button, Container, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

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
}));

export default function ResetPassword() {
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
    try {
      const postableData = {
        email,
        otp,
        newPassword,
        confirmNewPassword,
      };
      resetPassword(postableData).then((res) => {
        console.log("res", res);
        alert(res.data.msg);
        Redirectlogin();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
  );
}
