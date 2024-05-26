import axios from "axios";

const postRequest = (url, body, headers = null) => {
  return axios.post(url, body, headers);
};

const getRequest = (url, headers = null) => {
  return axios.get(url, headers);
};

const putRequest = (url, body, headers = null) => {
  return axios.put(url, body, headers);
};

const deleteRequest = (url, headers = null) => {
  return axios.delete(url, headers);
};

export default {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
};
