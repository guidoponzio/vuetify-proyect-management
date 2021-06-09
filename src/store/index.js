import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proyectos: [],
    categorias: [],
    lideres: [],
  },
  mutations: {
    agregandoProyecto(state, nuevoProyecto) {
      state.proyectos.push(nuevoProyecto);
    },
    agregandoCategoria(state, nuevaCategoria) {
      state.categorias.push(nuevaCategoria);
    },
    agregandoLider(state, nuevoLider) {
      state.lideres.push(nuevoLider);
  },
  actions: {
    //Las acciones llaman a las mutaciones. A su vez las acciones pueden hacer llamadas a API's
    agregarProyecto(context, nuevoProyecto) {
      context.commit("agregarProyecto", nuevoProyecto);
    },
  },
  getters: {
    proyectos(state) {
      return state.proyectos;
    },
    categorias(state) {
      return state.categorias;
    },
    personas(state) {
      return state.pèrsonas;
    },
  },
});
