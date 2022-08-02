import { Box, Button, Grid } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../common/layout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getViewJobById, updateWorkerJob } from "../../services/api";
import { ArrowBack, ArrowBackIos, Edit } from "@material-ui/icons";
import AlertBox from "../../common/alert";
import UpdateJobFormDialog from "../../common/updateJobFormDialog";

const useStyles = makeStyles((theme) => ({
  headercolor: {
    backgroundColor: "#e5ecf2",
    color: "grey",
  },
  submit: {
    marginRight: "10px",
    backgroundColor: "#4c79a1",
    color: "white",
  },
}));
export default function ViewJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [ColumnData, setColumnData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [token, setToken] = useState("");
  const [jobsData, setJobsData] = useState("");
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
    getViewJobData();
  }, [gridApi, token]);
  // const redirectUpdateWorkerJob = (url, data, email) => {
  //   console.log("datatta", data);
  //   navigate(`/${url}`, {
  //     state: {
  //       data: data,
  //       email: email,
  //     },
  //   });
  // };

  const ColumnDefs = [
    {
      headerName: "Actions",
      minWidth: 350,
      headerClass: classes.headercolor,
      cellRendererFramework: (params) => (
        <div>
          <Edit
            style={{ width: 100 }}
            variant="outlined"
            color="primary"
            onClick={
              () => handleUpdate(params.data, params.data.id)
              // redirectUpdateWorkerJob(
              //   "updateWorkerJob",
              //   params.data,
              //   location.state.email
              // )
            }
          />
        </div>
      ),
    },

    {
      headerName: "Start Date",
      field: "start_date",
      minWidth: 130,
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-GB")
          : "";
      },
    },
    {
      headerName: "End Date",
      field: "end_date",
      minWidth: 130,
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-GB")
          : "";
      },
    },
    {
      headerName: "Job Site",
      field: "job_site",
      minWidth: 130,
      headerClass: classes.headercolor,
    },
  ];
  const DefaultColDef = {
    minWidth: 100,
    flex: 1,
  };
  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setTimeout(() => {
      setGridApi(params.api);
    }, 500);
  };
  const getViewJobData = async () => {
    const email = location.state.email;
    console.log("email=============", email);
    const dataSource = {
      getRows: (params) => {
        gridApi.showLoadingOverlay();
        getViewJobById(token, location.state.userId)
          .then((res) => {
            if (!res.jobs.length) {
              gridApi.showNoRowsOverlay();
            } else {
              console.log("view jobs");
              gridApi.hideOverlay();
              setJobsData(res.jobs);
            }
            params.successCallback(res.jobs, res.jobs.length);
          })
          .catch((err) => {
            params.successCallback([], 0);
          });
      },
    };

    gridApi.setDatasource(dataSource);
  };
  const handleUpdate = (oldData) => {
    setJobsData(oldData);

    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onDialogChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setJobsData({ ...jobsData, [name]: value });
  };

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 1) {
      return { background: "#e5ecf2" };
    }
  };
  const onSubmit = (data) => {
    // const { id, user_id, job_site, job_id, ...updatedData} = data;
    // console.log("upadted data----------------------", updatedData);
    const postableData = {
      startDate: data.start_date,
      endDate: data.end_date,
    };
    console.log("postablebgffggfg", postableData);

    updateWorkerJob(data.id, token, postableData)
      .then((res) => {
        console.log("res", res);
        dispatch({ type: "SHOW_ALERT", msg: res.data.msg });
        setOpen(false);
        getViewJobData();
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
            height: 70,
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Grid container>
            <Grid item xs={5}>
              <ArrowBack variant="outlined" onClick={() => navigate(-1)} />
            </Grid>
            <Grid item xs={7}>
              Workers
            </Grid>
          </Grid>
        </Box>
        <div className="ag-theme-alpine" style={{ height: "550px" }}>
          <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                getRowStyle={getRowStyle}
                rowData={ColumnData}
                columnDefs={ColumnDefs}
                defaultColDef={DefaultColDef}
                onGridReady={onGridReady}
                pagination={true}
                overlayLoadingTemplate={
                  '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
                }
                overlayNoRowsTemplate={
                  '<span className="ag-overlay-loading-center">No data found to display.</span>'
                }
                rowModelType={"infinite"}
                rowHeight={60}
              ></AgGridReact>
            </div>
          </div>
        </div>
        <UpdateJobFormDialog
          open={open}
          handleClose={handleClose}
          jobsData={jobsData}
          jobEmail={location.state.email}
          onChange={onDialogChange}
          onSubmit={onSubmit}
        ></UpdateJobFormDialog>
      </Box>
    </Layout>
  );
}
