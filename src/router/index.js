import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
//import Proyectos from "../views/Proyectos.vue";
import Categorias from "../views/Categorias.vue";
import Equipo from "../views/Equipo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  /**{
    path: "/proyectos",
    name: "Proyectos",
    component: Proyectos,
  },**/
  {
    path: "/categorias",
    name: "Categorias",
    component: Categorias,
  },
  {
    path: "/categorias",
    name: "Categorias",
    component: Categorias,
  },
  {
    path: "/equipo",
    name: "equipo",
    component: Equipo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
