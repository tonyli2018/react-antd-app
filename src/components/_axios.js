import axios from "axios";
import { useHistory } from "react-router-dom";

var DOMAIN = process.env.VUE_APP_ROOT_API || "http://localhost:8080";

const _axios = axios.create({
  baseURL: `${DOMAIN}`,
});

_axios.interceptors.request.use(
  (request) => {
    // Edit request config
    if (localStorage.getItem("token")) {
      console.log("Token", localStorage.getItem("token"));
      request.headers.Authorization = localStorage.getItem("token");
    }
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
/*
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = "2uuwya6&^8822";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);*/
_axios.interceptors.response.use(
  (response) => {
    console.log("response", response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log("error in _axios", error);
    console.log("error.response.status", error.response.status);
    console.log("err message", error.response.data);

    if (error.response.status === 403) window.location.href = "/login";
    else if (error.response.status === 401) console.log("status code is 401!");
    else window.location.href = "/error";
    return Promise.reject(error);
  }
);

export default _axios;
