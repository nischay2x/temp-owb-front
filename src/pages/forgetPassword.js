import { Box, Button, Container, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertBox from "../common/alert";
import { forgetPassword } from "../services/api";
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

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const RedirectResetPassword = async (e) => {
    navigate("/resetPassword", {
      state: {
        email: email,
      },
    });
  };
  const HandleForgetPassword = async (e) => {
    e.preventDefault();
    const postableData = {
      email,
    };
    forgetPassword(postableData)
      .then((res) => {
        if (res.data.status === true) {
          dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
          RedirectResetPassword();
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
            <form onSubmit={HandleForgetPassword}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={HandleForgetPassword}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </Paper>
  );
}
