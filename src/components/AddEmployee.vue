<template>
  <div class="d-flex justify-content-center">
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

        <button @click="saveEmployee" class="btn btn-success">Submit</button
        >&nbsp;&nbsp;
        <button @click="back" class="btn btn-success">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeDataService from "@/services/EmployeeDataService";

export default {
  name: "add-employee",
  data() {
    return {
      employee: {
        id: null,
        employee_name: "",
        employee_age: 0,
        employee_salary: 0
      },
      submitted: false
    };
  },
  methods: {
    saveEmployee() {
      const employee_data = {
        employee_name: this.employee.employee_name,
        employee_age: this.employee.employee_age,
        employee_salary: this.employee.employee_salary
      };
      EmployeeDataService.createEmployee(employee_data)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.$router.push({ name: "employees" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    back() {
      this.$router.push({ name: "employees" });
    }
  }
};
</script>
