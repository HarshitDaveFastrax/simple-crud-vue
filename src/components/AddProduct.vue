<template>
  <div class="add-product submit-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Product Name"
          v-model="product.name"
          :class="{
            'is-invalid': submitted && $v.product.name.$error,
            'is-valid': submitted && !$v.product.name.$error
          }"
        />
        <div
          v-if="submitted && !$v.product.name.required"
          class="invalid-feedback"
        >
          Product Name is required
        </div>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Product Price"
          v-model="product.price"
          :class="{
            'is-invalid': submitted && $v.product.price.$error,
            'is-valid': submitted && !$v.product.price.$error
          }"
          @input="acceptNumber"
        />
        <div
          v-if="submitted && !$v.product.price.required"
          class="invalid-feedback"
        >
          Product Price is required
        </div>
      </div>
      <div class="form-group">
        <input class="btn btn-success" type="submit" value="Submit" />
        <input
          class="btn btn-success ml-2"
          type="button"
          @click="back"
          value="Back"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        name: null,
        price: null
      },
      submitted: false
    };
  },
  validations: {
    product: {
      name: { required },
      price: { required }
    }
  },
  methods: {
    ...mapActions(["addProduct"]),
    submitForm() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.addProduct(this.product);
      this.back();
    },
    back() {
      this.$router.push({ name: "product" });
    },
    acceptNumber() {
      this.product.price = this.product.price.replace(/[^0-9]+/g, "");
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
