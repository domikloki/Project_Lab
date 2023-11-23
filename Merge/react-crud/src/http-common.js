import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.139.172:8080/api",
  headers: {
    "Content-type": "application/json",
    "Content-Type": 'multipart/form-data'
  }
});