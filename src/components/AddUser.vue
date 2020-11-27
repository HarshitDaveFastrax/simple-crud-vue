<template>
  <div class="submit-form">
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="user.name"
          name="name"
          :class="{
            'is-invalid': submitted && $v.user.name.$error,
            'is-valid': submitted && !$v.user.name.$error
          }"
        />
        <div
          v-if="submitted && !$v.user.name.required"
          class="invalid-feedback"
        >
          Name is required
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="user.email"
          name="email"
          :class="{
            'is-invalid': submitted && $v.user.email.$error,
            'is-valid': submitted && !$v.user.email.$error
          }"
        />
        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
          <span v-if="!$v.user.email.required">Email is required</span>
          <span v-if="!$v.user.email.email">Email is invalid</span>
        </div>
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="user.phone"
          name="phone"
          :class="{
            'is-invalid': submitted && $v.user.phone.$error,
            'is-valid': submitted && !$v.user.phone.$error
          }"
          placeholder="(123) 456-7890"
          maxlength="14"
          @input="acceptNumber"
        />
        <div v-if="submitted && $v.user.phone.$error" class="invalid-feedback">
          <span v-if="!$v.user.phone.required">Phone is required</span>
        </div>
      </div>

      <div class="form-group">
        <label for="website">Website</label>
        <input
          type="text"
          class="form-control"
          id="website"
          v-model="user.website"
          name="website"
          :class="{
            'is-invalid': submitted && $v.user.website.$error,
            'is-valid': submitted && !$v.user.website.$error
          }"
        />
        <div
          v-if="submitted && $v.user.website.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.user.website.required">Website is required</span>
        </div>
      </div>

      <button class="btn btn-success">Submit</button>&nbsp;&nbsp;
      <button @click="back" class="btn btn-success">Back</button>&nbsp;&nbsp;
    </form>
  </div>
</template>

<script>
import UserDataService from "@/services/UserDataService.js";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        website: ""
      },
      submitted: false
    };
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      phone: { required },
      website: { required }
    }
  },
  methods: {
    addUser() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      UserDataService.createUser(this.user).then(response => {
        if (response.status === 201) {
          this.back();
        } else {
          console.log("There is some issue while creating data!!");
          console.log(response);
        }
      });
    },
    back() {
      this.$router.push({ name: "users-list" });
    },
    acceptNumber() {
      var x = this.user.phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.user.phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }
  }
};
</script>

<style scoped>
.submit-form {
  width: 50%;
  margin: 0 auto;
}
</style>
