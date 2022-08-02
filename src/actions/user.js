import { loginAuth, getJobsites, getJobDetails } from "../services/api";

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await loginAuth(email, password);
    if (data.status) {
      //rest code
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("user", JSON.stringify(data.data.token));
      localStorage.setItem("userProfile", JSON.stringify(data.data));
    } else {
      dispatch({ type: "SHOW_ALERT", msg: data.msg });
    }
  } catch (error) {
    console.log(error);
  }
};
export const logout = () => async (dispatch) => {
  try {
    const data = {};

    dispatch({ type: "LOGOUT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
