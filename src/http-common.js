import axios from "axios";

export default axios.create({
  baseURL: "http://dummy.restapiexample.com/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});
