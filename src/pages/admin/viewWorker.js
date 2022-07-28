import { Box, Button, Grid } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../common/layout";
import { getViewWorkers } from "../../services/api";
import { useSelector } from "react-redux";
import { localuser } from "../../config/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, Edit } from "@material-ui/icons";

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
export default function ViewWorker() {
  const navigate = useNavigate();
  const location = useLocation();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [ColumnData, setColumnData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [token, setToken] = useState("");
  const [jobData, setJobData] = useState([]);
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
    getUsers();
  }, [gridApi, token]);

  const redirectUpdateJobsitesWorker = (url, data) => {
    console.log("datattaworker", data);
    navigate(`/${url}`, {
      state: {
        data: data,
        jobdata: jobData,
      },
    });
  };

  const ColumnDefs = [
    {
      headerName: "Actions",
      headerClass: classes.headercolor,
      cellRendererFramework: (params) => (
        <div>
          <Edit
            style={{ width: 100 }}
            variant="outlined"
            color="primary"
            onClick={() =>
              redirectUpdateJobsitesWorker("updateJobsiteWorker", params.data)
            }
          />
        </div>
      ),
    },
    {
      headerName: "First Name",
      field: "firstname",
      minWidth: 130,
      headerClass: classes.headercolor,
    },

    {
      headerName: "Address",
      field: "address",
      minWidth: 130,
      headerClass: classes.headercolor,
    },

    {
      headerName: "Email",
      field: "email",
      minWidth: 200,
      headerClass: classes.headercolor,
    },
    {
      headerName: "Phone",
      field: "phone",
      minWidth: 130,
      headerClass: classes.headercolor,
    },

    {
      headerName: "Start Date",
      field: "user_start_date",
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
      field: "user_end_date",
      minWidth: 130,
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-GB")
          : "";
      },
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
  const getUsers = async () => {
    const dataSource = {
      getRows: (params) => {
        gridApi.showLoadingOverlay();
        getViewWorkers(token, location.state.id)
          .then((res) => {
            if (!res.data.persons.length) {
              gridApi.showNoRowsOverlay();
              console.log("view worker if----------------", res.data);
            } else {
              gridApi.hideOverlay();
              setJobData(res.data.job);
            }
            params.successCallback(res.data.persons, res.data.persons.length);
          })
          .catch((err) => {
            params.successCallback([], 0);
          });
      },
    };

    gridApi.setDatasource(dataSource);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 1) {
      return { background: "#e5ecf2" };
    }
  };
  return (
    <Layout>
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 5 }}>
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
      </Box>
    </Layout>
  );
}
