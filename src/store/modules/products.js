import axios from "axios";

const state = {
  products: []
};
const getters = {
  allproducts: state => state.products
};
const actions = {
  async getProducts({ commit }) {
    const response = await axios.get("http://localhost:3000/products");
    commit("setProducts", response.data);
  },
  async addProduct({ commit }, product) {
    const response = await axios.post(
      "http://localhost:3000/products",
      product
    );
    commit("addProduct", response.data);
  },
  async deleteProducts({ commit }, id) {
    await axios.get(`http://localhost:3000/products/${id}`);
    commit("deleteProducts", id);
  }
};
const mutations = {
  setProducts: (state, products) => (state.products = products),
  addProduct: (state, product) => state.products.unshift(product),
  deleteProducts: (state, id) =>
    (state.products = state.products.filter(product => product.id !== id))
};

export default {
  state,
  getters,
  actions,
  mutations
};
