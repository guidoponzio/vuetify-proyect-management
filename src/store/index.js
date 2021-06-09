import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proyectos: [],
    categorias: [],
    personas: [],
    proyecto: null,
    categoria: null,
    persona: null
  },
  mutations: {
    agregarProyecto(state) {
      state.proyectos = [state.proyecto, ...state.proyectos];
    },
    agregarCategoria(state) {
      state.categorias = [state.categoria, ...state.categorias];
    },
    agregarPersona(state) {
      state.personas = [state.persona, ...state.personas];
    },
    editarProyecto(state) {
      state.proyectos = [state.proyecto, ...state.proyectos];
    },
  },
  actions: {
    //Las acciones llaman a las mutaciones. A su vez las acciones pueden hacer llamadas a API's
    agregarProyectoAction (context ){
      context.commit('agregarProyecto');
    }
  },
  getters: {
    proyectos(state) {
      return state.proyectos;
    },
  },
});
