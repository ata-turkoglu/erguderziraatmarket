import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import AddProduct from "../components/admin/AddProduct";
import AddImage from "../components/admin/AddImage";
import ProductList from "../components/ProductList";
import Client from "../views/Client";
import Dealership from "../views/Dealership";
import Annos from "../views/Annos";
import About from "../views/About";
import Contact from "../views/Contact";
import AdminHome from "../components/admin/AdminHome";
import AddDealer from "../components/admin/AddDealer";
import AddAnnouncement from "../components/admin/AddAnnouncement";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Client",
    component: Client,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },

      {
        path: "/productlist",
        name: "ProductList",
        component: ProductList,
      },

      {
        path: "/about",
        name: "About",
        component: About,
      },

      {
        path: "/dealership",
        name: "Dealership",
        component: Dealership,
      },

      {
        path: "/announcements",
        name: "Announcements",
        component: Annos,
      },

      {
        path: "/contact",
        name: "Contact",
        component: Contact,
      },
    ],
  },

  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "/",
        name: "Admin",
        component: AdminHome,
      },
      {
        path: "addProduct",
        name: "AddProduct",
        component: AddProduct,
      },
      {
        path: "addImage",
        name: "AddImage",
        component: AddImage,
      },
      {
        path: "addDealer",
        name: "AddDealer",
        component: AddDealer,
      },
      {
        path: "addAnnouncement",
        name: "AddAnnouncemenet",
        component: AddAnnouncement,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
