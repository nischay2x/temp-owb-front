import { Box, Button, Container, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/user";

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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (loginUser.status === true && loginUser.data.token) {
      homeRedirect();
    } else {
      return;
    }
  }, [loginUser]);
  const homeRedirect = (status, email) => {
    navigate("/home", {
      state: {
        name: "chetan",
      },
    });
  };
  const HandleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const RedirectResetPassword = async (e) => {
    navigate("/forgetPassword");
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
          <form onSubmit={HandleLogin}>
            <TextField
              variant="outlined"
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              type="password"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              // onClick={HandleLogin}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={RedirectResetPassword}
            >
              Reset Password
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
