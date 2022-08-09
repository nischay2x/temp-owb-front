import { Box, Button, Card, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createJob, postUserJob } from "../../services/api";
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

export default function CreateJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobsite, setJobSite] = useState("");
  const [jobStartDate, setJobStartDate] = useState(null);
  const [jobEndDate, setJobEndDate] = useState(null);
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
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const postableData = {
      jobSite: jobsite,
      startDate: jobStartDate,
      endDate: jobEndDate,
      personJobs: [],
    };
    console.log("postable data", postableData);

    createJob(token, postableData)
      .then((res) => {
        if (res.data.status) {
          setJobSite("");
          setJobEndDate("");
          setJobStartDate("");
          // dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
          navigate(-1);
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
                name="JobSite"
                placeholder="Enter Jobsite"
                label="Job Site"
                variant="outlined"
                margin="dense"
                fullWidth
                value={jobsite}
                onChange={(e) => {
                  setJobSite(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Job Start Date"
                  value={jobStartDate}
                  onChange={(newValue) => {
                    setJobStartDate(newValue);
                  }}
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
                  value={jobEndDate}
                  onChange={(newValue) => {
                    setJobEndDate(newValue);
                  }}
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

// import { Box, Button, Card, Grid, TextField } from "@material-ui/core";
// import React, { useState } from "react";
// import Layout from "../../common/layout";
// import { makeStyles } from "@material-ui/core/styles";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const useStyles = makeStyles((theme) => ({
//   headercolor: {
//     backgroundColor: "#4c79a1",
//     color: "white",
//   },
//   submit: {
//     marginRight: "10px",
//     backgroundColor: "#4c79a1",
//     color: "white",
//   },
// }));

// export default function CreateJob() {
//   const [jobStartDate, setJobStartDate] = useState(null);
//   const [jobEndDate, setJobEndDate] = useState(null);
//   const classes = useStyles();
//   return (
//     <Layout>
//       <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 5 }}>
//         <Box
//           sx={{
//             bgcolor: "#4c79a1",
//             color: "white",
//             p: 2,
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//           }}
//         >
//           Add Details
//         </Box>
//         <Card style={{ padding: 10 }}>
//           <Grid container spacing={5}>
//             <Grid item xs={4}>
//               <TextField
//                 name="JobSite"
//                 placeholder="Enter Jobsite"
//                 label="Job Site"
//                 variant="outlined"
//                 margin="dense"
//                 fullWidth
//               />
//               <TextField
//                 name="Email"
//                 placeholder="Enter Email"
//                 label="Email"
//                 variant="outlined"
//                 margin="dense"
//                 fullWidth
//               />

//               <TextField
//                 name="Phone"
//                 placeholder="Enter Phone"
//                 label="Phone"
//                 variant="outlined"
//                 margin="dense"
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DatePicker
//                   label="Job Start Date"
//                   value={jobStartDate}
//                   onChange={(newValue) => {
//                     setJobStartDate(newValue);
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       variant="outlined"
//                       margin="dense"
//                       fullWidth
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//               <TextField
//                 name="FirstName"
//                 placeholder="Enter FirstName"
//                 label="First Name"
//                 variant="outlined"
//                 margin="dense"
//                 fullWidth
//               />

//               <TextField
//                 name="Address"
//                 placeholder="Enter Address"
//                 label="Address"
//                 variant="outlined"
//                 margin="dense"
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DatePicker
//                   label="Job End Date"
//                   value={jobEndDate}
//                   onChange={(newValue) => {
//                     setJobEndDate(newValue);
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       variant="outlined"
//                       margin="dense"
//                       fullWidth
//                     />
//                   )}
//                 />
//               </LocalizationProvider>

//               <TextField
//                 name="LastName"
//                 placeholder="Enter Last Name"
//                 label="Last Name"
//                 variant="outlined"
//                 margin="dense"
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           <Box
//             sx={{
//               mt: 5,
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//             }}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               className={classes.submit}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               className={classes.submit}
//             >
//               Create
//             </Button>
//           </Box>
//         </Card>
//       </Box>
//     </Layout>
//   );
// }
