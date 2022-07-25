import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core";
import { Button, ListItemButton } from "@mui/material";
import { Home, Person, Work } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#4c79a1",
  },
}));
const Header = (props) => {
  const loginUser = useSelector((state) => state.userReducer);
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState("");
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const homeRedirectUser = () => {
    navigate("/home");
  };
  const homeRedirectAdmin = () => {
    navigate("/homeAdmin");
  };
  const profileRedirect = () => {
    navigate("/profile");
  };
  const jobSitesRedirect = () => {
    navigate("/jobsites");
  };
  const workersRedirect = () => {
    navigate("/users");
  };
  const logoutUser = () => {
    window.localStorage.clear();
    dispatch(logout());
    navigate("/");
  };
  useEffect(() => {
    if (!loginUser.data) {
      setProfileData(userProfile);
    } else {
      setProfileData(loginUser.data);
    }
  }, [loginUser]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: "black",
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/users">
            <Box
              component="img"
              sx={{
                height: 45,
                width: 200,
              }}
              alt=""
              src="https://cloud.vastedge.com/apps/vastedge/r/327/files/static/v5/OWB-New-Bath-Logo.webp"
            />
          </Link>
          <Box sx={{ width: 870 }}></Box>
          <Button
            onClick={logoutUser}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              color: "#4c79a1",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {profileData.role === "admin" ? (
            <ListItem disablePadding>
              <ListItemButton onClick={homeRedirectAdmin}>
                <ListItemIcon>
                  <Home className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          ) : (
            <div></div>
          )}
          {profileData.role === "user" ? (
            <ListItem disablePadding>
              <ListItemButton onClick={homeRedirectUser}>
                <ListItemIcon>
                  <Home className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Job Details" />
              </ListItemButton>
            </ListItem>
          ) : (
            <div></div>
          )}
          <ListItem disablePadding>
            <ListItemButton onClick={profileRedirect}>
              <ListItemIcon>
                <Person className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Profile Details" />
            </ListItemButton>
          </ListItem>
          {profileData.role === "admin" ? (
            <ListItem disablePadding>
              <ListItemButton onClick={jobSitesRedirect}>
                <ListItemIcon>
                  <Work className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Job Sites" />
              </ListItemButton>
            </ListItem>
          ) : (
            <div></div>
          )}
          {profileData.role === "admin" ? (
            <ListItem disablePadding>
              <ListItemButton onClick={workersRedirect}>
                <ListItemIcon>
                  <Work className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Workers" />
              </ListItemButton>
            </ListItem>
          ) : (
            <div></div>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
