import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proyectos: [
      /**{
      id: 1,
      categoria: "Frontned",
      lider: "Guido Ponzio",
      nombre: "Trabajo práctico NT2",
      descripcion: "Lorem ipsum bla bla bla",
      plazo: null,
      estado: "enProgreso"
    }**/
    ],
    categorias: [],
    lideres: [],
    nuevoProyecto: null,
    nuevaCategoria: null,
    nuevoLider: null,
    idBuscado: "",
    idBuscadoCategoria: "",
  },
  mutations: {
    agregandoProyecto(state) {
      state.proyectos.push(state.nuevoProyecto);
    },
    editandoProyecto(state) {
      let idx = state.proyectos.findIndex((p) => p.id == state.idBuscado);
      //state.proyectos[idx] = state.nuevoProyecto;
      state.splice(idx, 2, state.nuevoProyecto);
    },
    eliminandoProyecto(state) {
      let idx = state.proyectos.findIndex((p) => p.id == state.idBuscado);
      state.proyectos.splice(idx, 1);
    },
    agregandoCategoria(state) {
      state.categorias = [state.nuevaCategoria, ...state.categorias];
    },
    editandoCategoria(state){
      let idx = state.categorias.findIndex((c) => c.id == state.idBuscadoCategoria);
      state.splice(idx, 2, state.nuevaCategoria);
    },
    eliminandoCategoria(state){
      let idx = state.categorias.findIndex((c) => c.id == state.idBuscadoCategoria);
      state.categorias.splice(idx, 1);
    },
    agregandoLider(state) {
      state.lideres = [state.nuevoLider, ...state.lideres];
    },
  },
  actions: {
    //Las acciones llaman a las mutaciones. A su vez las acciones pueden hacer llamadas a API's
    async agregarProyecto(context) {
      context.commit("agregandoProyecto");
    },
    async editarProyecto(context) {
      context.commit("editandoProyecto");
    },
    async eliminarProyecto(context) {
      context.commit("eliminandoProyecto");
    },
    async agregarCategoria(context) {
      context.commit("agregandoCategoria");
    },
    async editarCategoria(context) {
      context.commit("editandoCategoria");
    },
    async eliminarCategoria(context) {
      context.commit("eliminandoCategoria");
    },
    async agregarLider(context) {
      context.commit("agregandoLider");
    },
  },
  getters: {
    proyectos(state) {
      return state.proyectos;
    },
    categorias(state) {
      return state.categorias;
    },
    lideres(state) {
      return state.lideres;
    },
    proyecto(state) {
      return state.proyectos.find((p) => p.id == state.idBuscado);
    },
    categoria(state){
      return state.categorias.find((c) => c.id == state.idBuscadoCategoria);
    }
  },
});
