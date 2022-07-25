import { Box, Button, Container, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../services/api";

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

export default function ForgetPassword() {
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
    try {
      const postableData = {
        email,
      };
      forgetPassword(postableData).then((res) => {
        console.log("res", res);
        alert(res.data.msg);
        RedirectResetPassword();
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
  );
}
