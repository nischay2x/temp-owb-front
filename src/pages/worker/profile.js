import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Layout from "../../common/layout";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  textstyleheading1: {
    color: "grey",
    fontWeight: "bold",
  },
  textstyleheading2: {
    color: "black",
    fontWeight: "bold",
  },
}));

export default function Profile() {
  const [profileData, setProfileData] = useState("");
  const loginUser = useSelector((state) => state.userReducer);
  const classes = useStyles();
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  useEffect(() => {
    if (!loginUser.data) {
      setProfileData(userProfile);
    } else {
      setProfileData(loginUser.data);
    }
  }, [loginUser]);

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, p: 5, mt: 5 }}>
        <Typography className={classes.textstyleheading1}>Name</Typography>
        <Typography className={classes.textstyleheading2}>
          {profileData.firstname}
        </Typography>
        <Typography className={classes.textstyleheading1}>Email</Typography>
        <Typography className={classes.textstyleheading2}>
          {profileData.email}
        </Typography>
        <Typography className={classes.textstyleheading1}>Phone</Typography>
        <Typography className={classes.textstyleheading2}>
          {profileData.phone}
        </Typography>
        <Typography className={classes.textstyleheading1}>Address</Typography>
        <Typography className={classes.textstyleheading2}>
          {profileData.address}
        </Typography>
      </Box>
    </Layout>
  );
}
