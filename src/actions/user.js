import { loginAuth, getJobsites, getJobDetails } from "../services/api";

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await loginAuth(email, password);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("user", JSON.stringify(data.data.token));
    localStorage.setItem("userProfile", JSON.stringify(data.data));
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
export const getJobList = () => async (dispatch) => {
  try {
    const { data } = await getJobsites();
    dispatch({ type: "JOB_SITES", payload: data });
  } catch (error) {
    console.log(error);
    alert("Error in fetching Page List");
  }
};
export const getJobDetailsList = (token) => async (dispatch) => {
  try {
    const { data } = await getJobDetails(token);
    dispatch({ type: "JOB_Details", payload: data });
    console.log("data in job daetail", data);
  } catch (error) {
    console.log(error);
    alert("Error in fetching Page List");
  }
};

// export const getJobDetailsList = (token) => async (dispatch) => {
//   try {
//     const [...data] = await getJobDetails(token)
//       .then((resp) => resp.json())
//       .then((res) => {
//         return res.data;
//       });
//     dispatch({ type: "JOB_Details", payload: data });
//     return data;
//   } catch (error) {
//     console.log(error);
//     alert("Error in fetching Page List");
//   }
// };
