import axios from "axios";
import { Baseurl } from "../config/constant";

export const loginAuth = (email, password) =>
  axios.post(Baseurl + "auth/login", {
    email,
    password,
  });
export const getJobDetails = (token) =>
  fetch(Baseurl + "user/me/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const getJobsites = (token) =>
  fetch(Baseurl + "jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
export const getViewWorkers = (token, id) =>
  fetch(Baseurl + `job/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
export const getUsers = (token) =>
  fetch(Baseurl + `users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
export const postUserJob = (token, postableData) =>
  axios.post(
    Baseurl + "user-job",
    {
      userJobs: postableData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
export const createJob = (token, postableData) =>
  axios.post(Baseurl + "job", postableData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const getViewJobById = (token, id) =>
  fetch(Baseurl + `user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const createWorker = (token, postableData) =>
  axios.post(Baseurl + "user", postableData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const updateWorker = (id, token, postableData) =>
  axios.patch(Baseurl + `user/${id}`, postableData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const updateJob = (id, token, postableData) =>
  axios.patch(Baseurl + `job/${id}`, postableData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const updateWorkerJob = (id, token, postableData) =>
  axios.patch(Baseurl + `user-job/${id}`, postableData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
export const forgetPassword = (postableData) =>
  axios.post(Baseurl + `auth/forget-password`, postableData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const resetPassword = (postableData) =>
  axios.post(Baseurl + `auth/reset-password`, postableData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
