<template>
  <div class="list row">
    <div class="col-md-12">
      <h4>User List</h4>
      <router-link class="btn btn-success btn-sm" :to="{ name: 'add-user' }"
        >Add User</router-link
      >
      <input
        type="text"
        class="form-control submit-form mt-2 mb-3"
        placeholder="Search by Name"
        v-model="title"
        @keyup="debounceInput"
      />
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.website }}</td>
            <td>
              <router-link
                class="btn btn-success btn-sm"
                :to="{
                  name: 'view-user',
                  params: { id: user.id, edit: false }
                }"
                >View</router-link
              >
              |
              <router-link
                class="btn btn-primary btn-sm"
                :to="{ name: 'user-edit', params: { id: user.id, edit: true } }"
                >Edit</router-link
              >
              |
              <button
                @click="deleteUser(user.id)"
                class="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserDataService from "@/services/UserDataService.js";
import debounce from "debounce";

export default {
  data() {
    return {
      users: [],
      title: ""
    };
  },
  methods: {
    usersList() {
      UserDataService.getAllUser().then(response => {
        this.users = response.data;
      });
    },
    deleteUser(id) {
      UserDataService.deleteUser(id).then(() => {
        this.usersList();
      });
    },
    debounceInput: debounce(function() {
      if (!this.title) {
        this.usersList();
      } else {
        this.users = this.users.filter(user => user.name == this.title);
      }
    }, 1000)
  },
  mounted() {
    this.usersList();
  }
};
</script>

<style scoped>
.submit-form {
  width: 50%;
  margin: 0 auto;
}
</style>
