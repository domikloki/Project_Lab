import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.73:8080/api",
  headers: {
    "Content-type": "application/json",
    "Content-Type": 'multipart/form-data'
  }
});