<template>
  <div>
    <router-link class="btn btn-success btn-sm" :to="{ name: 'add-product' }"
      >Add Product</router-link
    >
    <table
      style="width: 50%; margin: 0 auto;"
      class="table table-striped table-sm mt-3"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in allproducts" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.price | currency }}</td>
          <td>
            <button @click="deleteProducts(product.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Product",
  computed: {
    ...mapGetters(["allproducts"])
  },
  filters: {
    currency(value) {
      return "₹ " + parseFloat(value).toFixed(2);
    }
  },
  methods: {
    ...mapActions(["getProducts", "deleteProducts"])
  },
  created() {
    this.getProducts();
  }
};
</script>
