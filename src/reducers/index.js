import { combineReducers } from "redux";
import userReducer from "../reducers/auth";
import jobList from "../reducers/userData";
export default combineReducers({
  userReducer,
  jobList,
});
