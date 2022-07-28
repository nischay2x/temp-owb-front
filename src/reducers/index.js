import { combineReducers } from "redux";
import userReducer from "../reducers/auth";
import jobList from "../reducers/userData";
import alertReducer from "./alert";
export default combineReducers({
  userReducer,
  jobList,
  alert: alertReducer,
});
