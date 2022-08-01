import { Box, Button, Grid } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../common/layout";
import { getJobsites, getUsersService } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { getJobList } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { localuser } from "../../config/constant";
import { Edit } from "@material-ui/icons";

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
  spacer: {
    flex: "1 1 auto",
  },
}));
export default function JobSites() {
  const navigate = useNavigate();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [ColumnData, setColumnData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [token, setToken] = useState("");
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));

  const RedirectAddworker = (id) => {
    navigate("/addworker", {
      state: {
        id: id,
      },
    });
  };
  const RedirectViewworker = (id) => {
    console.log("datatattat", id);
    navigate("/viewworker", {
      state: {
        id: id,
      },
    });
  };
  const RedirectAddJob = () => {
    navigate("/createJob");
  };
  const redirectUpdateJob = (url, data) => {
    console.log("datatta", data);
    navigate(`/${url}`, {
      state: {
        data: data,
      },
    });
  };

  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
      console.log("localtoken--------get jobsites", token);
    } else {
      setToken(loginUser.data.token);
      console.log("statetoken--------get jobsites", token);
    }
    getUsers();
  }, [gridApi, token]);

  const ColumnDefs = [
   
    {
      headerName: "Actions",
      minWidth: 450,
      headerClass: classes.headercolor,
      cellRendererFramework: (params) => (
        <div style={{ flexDirection: "row" }}>
           <Edit
            style={{ width: 100 }}
            variant="outlined"
            color="primary"
            onClick={() => redirectUpdateJob("updateJob", params.data)}
          />
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onClick={() => RedirectViewworker(params.data.id)}
          >
            View Workers
          </Button>

          <Button
            onClick={() => RedirectAddworker(params.data.id)}
            type="submit"
            variant="contained"
            className={classes.submit}
          >
            Add Workers
          </Button>
        </div>
      ),
    },
    {
      headerName: "Job Site",
      field: "job_site",
      headerClass: classes.headercolor,
    },

    {
      headerName: "Job Start Date",
      field: "start_date",
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-GB")
          : "";
      },
    },
    {
      headerName: "Job End Date",
      field: "end_date",
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
    console.log("token--------get jobsites", token);
    const dataSource = {
      getRows: (params) => {
        gridApi.showLoadingOverlay();

        getJobsites(token)
          .then((res) => {
            if (!res.data.length) {
              gridApi.showNoRowsOverlay();
            } else {
              gridApi.hideOverlay();
            }
            params.successCallback(res.data, res.data.length);
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
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Grid container justify="flex-end">
            <Button
              onClick={RedirectAddJob}
              style={{
                justifyContent: "flex-end",
                color: "white",
                display: "flex",
                flexFlow: "row",
              }}
            >
              Add New JobSite
            </Button>
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
