import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },
  {
    path: "/",
    name: "employees",
    component: () => import("@/components/Employee")
  },
  {
    path: "/employee-list/:id",
    name: "employee-list",
    component: () => import("@/components/EmployeeList"),
    props: true
  },
  {
    path: "/add-employee",
    name: "add-employee",
    component: () => import("@/components/AddEmployee")
  },
  {
    path: "/users",
    name: "users-list",
    component: () => import("@/components/User")
  },
  {
    path: "/add-user",
    name: "add-user",
    component: () => import("@/components/AddUser")
  },
  {
    path: "/user/:id",
    name: "view-user",
    redirect: {
      name: "user-edit"
    },
    props: true
  },
  {
    path: "/user-edit/:id",
    name: "user-edit",
    component: () => import("@/components/EditUser"),
    props: true
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/components/Product")
  },
  {
    path: "/add-product",
    name: "add-product",
    component: () => import("@/components/AddProduct")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
