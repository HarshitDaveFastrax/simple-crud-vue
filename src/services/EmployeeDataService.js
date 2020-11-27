import http from "../http-common";

class EmployeeDataService {
  getAllEmployee() {
    return http.get("employees");
  }

  createEmployee(data) {
    return http.post("create", data);
  }

  getEmployeeById(id) {
    return http.get(`employee/${id}`);
  }

  updateEmployeeById(data, id) {
    return http.put(`update/${id}`, data);
  }

  deleteEmployeeById(id) {
    return http.delete(`delete/${id}`);
  }
}

export default new EmployeeDataService();
