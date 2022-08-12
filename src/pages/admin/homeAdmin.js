import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../common/layout";
import { adminHome } from "../../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
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
  const classes = useStyles();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [ColumnDefs, setColumnDefs] = useState([]);
  const [ColumnData, setColumnData] = useState([]);
  const [token, setToken] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const loginUser = useSelector((state) => state.userReducer);
  const localuser = JSON.parse(localStorage.getItem("user"));
  
  var date = new Date();
 
  var firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).toLocaleDateString();
  let CurrentDate = new Date().toLocaleDateString();
  const [startDate, setJobStartDate] = useState(firstDay);
  const [endDate, setJobEndDate] = useState(CurrentDate);
  useEffect(() => {
    if (!loginUser.data) {
      setToken(localuser);
    } else {
      setToken(loginUser.data.token);
    }
    getHomeData();
  }, [gridApi, token]);

  const onGridReady = (params) => {
    params.api.showLoadingOverlay();
    setTimeout(() => {
      setGridApi(params.api);
    }, 500);
  };
  const format = ({ header, rows }) => {
    let colDef = [{ headerName: "Date", field: "date", resizable: true ,valueFormatter: params => dayjs(params.value).format('MM/DD/YYYY') }];
    console.log("dattatattttt");
    header.names.forEach((n, i) => {
      colDef.push({ headerName: n, field: n, resizable: true });
    });

    const nameIndex = header.names.map((n) => n);
    console.log("nameindex---", nameIndex);
    let rowData = [];

    rows.forEach((r, i) => {
      let obj = { date: r.date };

      r.jobs.forEach((j, idx) => {
        obj[nameIndex[idx]] = j;
      });

      rowData.push(obj);
    });

    return { colDef, rowData };
  };

  const getHomeData = async () => {
    console.log("token on home page", token);
    const dataSource = {
      getRows: (params) => {
        gridApi.showLoadingOverlay();
        adminHome(token, startDate, endDate)
          .then((res) => {
            console.log("resssssss", res.data);
            const formatRes = format(res.data);
            setColumnDefs(formatRes.colDef);
            if (!formatRes.rowData.length) {
              gridApi.showNoRowsOverlay();
            } else {
              gridApi.hideOverlay();
            }
            params.successCallback(formatRes.rowData, formatRes.rowData.length);
          })
          .catch((err) => {
            params.successCallback([], 0);
          });
      },
    };

    gridApi.setDatasource(dataSource);
  };

  const DefaultColDef = {
    editable: false,
    minWidth: 200,
    filter: false,
    resizable: true,
    // flex: 1,
  };

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 1) {
      return { background: "#e5ecf2" };
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getHomeData();
  };
  const dateFormat = () => {
    setJobStartDate(firstDay);
    setJobEndDate("28/07/2022");
    console.log(firstDay);
    console.log(CurrentDate);
    getHomeData();
  };
  return (
    <Layout>
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 5 }}>
        <Grid container>
          <Box>
            <Grid
              container
              spacing={5}
              style={{ marginLeft: 150, padding: 20 }}
            >
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Job Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setJobStartDate(new Date(newValue).toLocaleDateString());
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
                    inputFormat="dd/MM/yyyy"
                    label="Job End Date"
                    value={endDate}
                    onChange={(newValue) => {
                      setJobEndDate(new Date(newValue).toLocaleDateString());
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
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Box
          sx={{
            bgcolor: "#4c79a1",
            color: "white",
            p: 2,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          Jobs Report
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
                enableRtl={true}
                // pagination={true}
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
