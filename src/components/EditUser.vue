<template>
  <div class="submit-form">
    <h4 v-if="this.edit">Edit User {{ user.name }}</h4>
    <h4 v-else>View User {{ user.name }}</h4>

    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="user.name"
          name="name"
          :disabled="true"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
          :class="{
            'is-invalid': submitted && $v.user.email.$error,
            'is-valid': submitted && !$v.user.email.$error
          }"
          :disabled="!this.edit ? true : false"
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
          required
          v-model="user.phone"
          name="phone"
          :class="{
            'is-invalid': submitted && $v.user.phone.$error,
            'is-valid': submitted && !$v.user.phone.$error
          }"
          :disabled="!this.edit ? true : false"
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
          required
          v-model="user.website"
          name="website"
          :class="{
            'is-invalid': submitted && $v.user.website.$error,
            'is-valid': submitted && !$v.user.website.$error
          }"
          :disabled="!this.edit ? true : false"
        />
        <div
          v-if="submitted && $v.user.website.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.user.website.required">Website is required</span>
        </div>
      </div>

      <button v-if="this.edit" class="btn btn-success">
        Submit</button
      >&nbsp;&nbsp;
      <button @click="back" class="btn btn-success">Back</button>&nbsp;&nbsp;
    </form>
  </div>
</template>

<script>
import UserDataService from "@/services/UserDataService.js";
import { required, email } from "vuelidate/lib/validators";

export default {
  props: ["id", "edit"],
  data() {
    return {
      user: {},
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
    fetchUserData() {
      UserDataService.getUserById(this.id).then(response => {
        this.user = response.data;
      });
    },
    updateUser() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      UserDataService.updateUser(this.user, this.id).then(() => {
        this.back();
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
  },
  mounted() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
.submit-form {
  width: 50%;
  margin: 0 auto;
}
</style>
