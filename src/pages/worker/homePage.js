import { Box } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../common/layout";
import { getJobDetails } from "../../services/api";
import { getJobDetailsList } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  headercolor: {
    backgroundColor: "#e5ecf2",
    color: "grey",
  },
}));
export default function Home() {
  const dispatch = useDispatch();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [ColumnData, setColumnData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [token, setToken] = useState("");
  const loginUser = useSelector((state) => state.userReducer);
  // const statetoken = loginUser.data.token;
  const localuser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
    getjobs();
  }, [gridApi, token]);
  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setTimeout(() => {
      setGridApi(params.api);
    }, 500);
  };
  const getjobs = async () => {
    const dataSource = {
      getRows: (params) => {
        gridApi.showLoadingOverlay();
        getJobDetails(token)
          .then((res) => {
            if (!res.data.length) {
              gridApi.showNoRowsOverlay();
            } else {
              gridApi.hideOverlay();
              params.successCallback(res.data, res.data.length);
            }
          })
          .catch((err) => {
            params.successCallback([], 0);
          });
      },
    };

    gridApi.setDatasource(dataSource);
  };

  const ColumnDefs = [
    {
      headerName: "job Site",
      field: "job_site",
      minWidth: 130,
      headerClass: classes.headercolor,
    },
    {
      headerName: "Start date",
      field: "start_date",
      minWidth: 130,
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-US")
          : "";
      },
    },
    {
      headerName: "End date",
      field: "end_date",
      minWidth: 130,
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-US")
          : "";
      },
    },
    {
      headerName: "Created date",
      field: "user_start_date",
      minWidth: 130,
      headerClass: classes.headercolor,
      cellRenderer: (data) => {
        return data.value
          ? new Date(data.value).toLocaleDateString("en-US")
          : "";
      },
    },
  ];
  const DefaultColDef = {
    minWidth: 100,
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
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 5 }}>
        <Box
          sx={{
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        ></Box>
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
