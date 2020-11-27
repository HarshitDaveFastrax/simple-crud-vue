<template>
  <div class="d-flex justify-content-center">
    <!-- <h4>{{ employee.employee_name }}Employee Detail</h4> -->
    <div class="submit-form">
      <div>
        <div class="form-group">
          <label for="employee_name">Name</label>
          <input
            type="text"
            class="form-control"
            id="employee_name"
            required
            v-model="employee.employee_name"
            name="employee_name"
          />
        </div>

        <div class="form-group">
          <label for="employee_age">Age</label>
          <input
            class="form-control"
            id="employee_age"
            required
            v-model="employee.employee_age"
            name="employee_age"
          />
        </div>

        <div class="form-group">
          <label for="employee_salary">Salary</label>
          <input
            class="form-control"
            id="employee_salary"
            required
            v-model="employee.employee_salary"
            name="employee_salary"
          />
        </div>

        <button @click="updateEmployee" class="btn btn-success">Submit</button
        >&nbsp;&nbsp;
        <button @click="back" class="btn btn-success">Back</button>&nbsp;&nbsp;
        <button @click="deleteEmployee" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "@/services/EmployeeDataService";

export default {
  props: ["id"],
  data() {
    return {
      employee: {}
    };
  },
  methods: {
    fetchEmployeeData(id) {
      EmployeeDataService.getEmployeeById(id)
        .then(response => {
          this.employee = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateEmployee() {
      EmployeeDataService.updateEmployeeById(this.employee, this.id)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "employees" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    back() {
      this.$router.push({ name: "employees" });
    },
    deleteEmployee() {
      EmployeeDataService.deleteEmployeeById(this.id);
      this.back();
    }
  },
  mounted() {
    this.fetchEmployeeData(this.id);
  }
};
</script>
