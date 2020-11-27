<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6 overflow-auto">
      <h4>Employee List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(employee, index) in employees"
          :key="index"
          @click="setActiveEmployee(employee, index)"
        >
          {{ employee.employee_name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentEmployee">
        <h4>Employee</h4>
        <div>
          <label><strong>Employee Name:</strong></label>
          {{ currentEmployee.employee_name }}
        </div>
        <div>
          <label><strong>Age:</strong></label>
          {{ currentEmployee.employee_age }}
        </div>
        <div>
          <label><strong>Employee Salary:</strong></label>
          {{ currentEmployee.employee_salary }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/employee-list/' + currentEmployee.id"
        >
          Edit </a
        >&nbsp;&nbsp;
        <a class="badge badge-danger" @click="deleteEmployee">
          Delete
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Employee Data...</p>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "@/services/EmployeeDataService";

export default {
  name: "employees",
  data() {
    return {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveEmployees() {
      EmployeeDataService.getAllEmployee().then(response => {
        this.employees = response.data.data;
      });
    },
    setActiveEmployee(employee, index) {
      this.currentEmployee = employee;
      this.currentIndex = index;
    },
    deleteEmployee() {
      EmployeeDataService.deleteEmployeeById(this.currentEmployee.id);
    },
    searchTitle() {
      if (this.title !== "") {
        this.employees = this.employees.filter(
          employee => employee.employee_name === this.title
        );
      } else {
        this.retrieveEmployees();
      }
    }
  },
  mounted() {
    this.retrieveEmployees();
  }
};
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group {
  background-color: green;
  float: left;
  overflow-y: scroll;
  height: 200px;
  width: 100%;
}
</style>
