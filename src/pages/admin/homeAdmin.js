import { Box, Button } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../common/layout";
import { getUsers, getUsersService } from "../../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
}));
export default function HomeAdmin() {
  const navigate = useNavigate();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [ColumnData, setColumnData] = useState([]);
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
    getUsersData();
  }, [gridApi, token]);

  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setTimeout(() => {
      setGridApi(params.api);
    }, 500);
  };
  const getUsersData = async () => {
    console.log("token on home page", token);
    const dataSource = {
      getRows: (params) => {
        gridApi.showLoadingOverlay();
        getUsers(token)
          .then((res) => {
            if (!res.data.users.length) {
              gridApi.showNoRowsOverlay();
            } else {
              gridApi.hideOverlay();
            }
            params.successCallback(res.data.users, res.data.users.length);
          })
          .catch((err) => {
            params.successCallback([], 0);
          });
      },
    };

    gridApi.setDatasource(dataSource);
  };

  const redirectJob = (url, userId, email) => {
    navigate(`/${url}`, {
      state: {
        userId: userId,
        email: email,
      },
    });
  };
  const redirectUpdateWorker = (url, data) => {
    console.log("datatta", data);
    navigate(`/${url}`, {
      state: {
        data: data,
      },
    });
  };
  const RedirectCreateWorker = () => {
    navigate("/createWorker");
  };
  const ColumnDefs = [
    {
      headerName: "Email Id",
      field: "email",
      headerClass: classes.headercolor,
    },
    {
      headerName: "First Name",
      field: "firstname",
      headerClass: classes.headercolor,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      headerClass: classes.headercolor,
    },
    {
      headerName: "Address",
      field: "address",
      headerClass: classes.headercolor,
    },
    {
      headerName: "Actions",
      minWidth: 350,
      headerClass: classes.headercolor,
      cellRendererFramework: (params) => (
        <div style={{ flexDirection: "row" }}>
          <Edit
            style={{ width: 100 }}
            variant="outlined"
            color="primary"
            onClick={() => redirectUpdateWorker("updateWorker", params.data)}
          />
          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onClick={() =>
              redirectJob("addJob", params.data.id, params.data.email)
            }
          >
            Add Jobs
          </Button>

          <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            onClick={() =>
              redirectJob("viewJob", params.data.id, params.data.email)
            }
          >
            View Job
          </Button>
        </div>
      ),
    },
  ];
  const DefaultColDef = {
    editable: false,
    minWidth: 100,
    filter: false,
    flex: 1,
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
      {/* <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 5 }}>
        <Box
          sx={{
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Button
            onClick={RedirectCreateWorker}
            style={{
              justifyContent: "flex-end",
              color: "white",
              display: "flex",
              width: "100%",
              flexFlow: "row",
            }}
          >
            Add User
          </Button>
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
      </Box> */}
    </Layout>
  );
}
