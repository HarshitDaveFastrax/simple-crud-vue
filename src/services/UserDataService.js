import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/";

class UserDataSErvice {
  getAllUser() {
    return axios.get(`${baseURL}users`);
  }

  getUserById(id) {
    return axios.get(`${baseURL}users/${id}`);
  }

  createUser(data) {
    return axios.post(`${baseURL}users`, data);
  }

  updateUser(data, id) {
    return axios.put(`${baseURL}users/${id}`, data);
  }

  deleteUser(id) {
    return axios.delete(`${baseURL}users/${id}`);
  }
}

export default new UserDataSErvice();
