import axios from "axios";
import { Baseurl } from "../config/constant";

export const loginAuth = (email, password) =>
  axios.post(Baseurl + "", {
    email,
    password,
  });
export const aftermfatoken = (email, code) =>
  axios.post(Baseurl + "", {
    email,
    code,
  });
export const googleLoginAuth = (search) => axios.get(``);
