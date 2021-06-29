import Vue from "vue";
import Vuex from "vuex";
import AxiosService from "../services/AxiosService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proyectos: [],
    categorias: [],
    integrantes: [],
    //nuevoProyecto: null,
    //nuevaCategoria: null,
    //nuevoLider: null,
    //idBuscado: "",
    //idBuscadoCategoria: "",
    //idBuscadoLider: ""
  },
  mutations: {
    ADD_PROYECTO(state, proyectoNuevo) {
      state.proyectos = [proyectoNuevo, ...state.proyectos];
      console.log(state.proyectos);
    },
    EDIT_PROYECTO(state, proyectoEdit) {
      let idx = state.proyectos.findIndex((p) => p.id == proyectoEdit.id);
      if (idx !== -1) {
        state.proyectos[idx] = proyectoEdit;
        //Hay que usar el spread operator para obligar a la UI a refrescar la info en pantalla
        state.proyectos = [... state.proyectos];
      } else {
        console.log(`El proyecto con ID ${proyectoEdit.id} no existe`);
      }
      console.log("Proyectos: " + state.proyectos);
    },
    DELETE_PROYECTO(state, id) {
      let arrAux = state.proyectos.filter( (p) => p.id != id  ) 
      state.proyectos = [... arrAux];
    },
    CAMBIAR_ESTADO_PROYECTO(state, id){
      let idx = state.proyectos.findIndex((p) => p.id == id);
      if (idx >= 0) {
        let estadoActual = state.proyectos[idx].estado;
        if(estadoActual == 'enProgreso'){
          state.proyectos[idx].estado = 'completado';
        }else{
          state.proyectos[idx].estado = 'enProgreso';
        }
      } 
    },
    ADD_CATEGORIA(state, categoriaNueva){
      state.categorias = [categoriaNueva, ...state.categorias];
    },
    EDIT_CATEGORIA(state, categoriaEdit){
      let idx = state.categorias.findIndex((c) => c.id == categoriaEdit.id);
      if (idx >= 0) {
        state.categorias[idx] = categoriaEdit;
        state.categorias = [... state.categorias];
      } else {
        console.log(`La categoria con ID ${categoriaEdit.id} no existe`);
      }
    },
    DELETE_CATEGORIA(state, id){
      let arrAux = state.categorias.filter( (c) => c.id != id  ) 
      state.categorias = [... arrAux];
    },
    ADD_INTEGRANTE(state, integranteNuevo){
      state.integrantes = [integranteNuevo, ...state.integrantes]
    },
    EDIT_LIDER(state, liderEdit){
      let idx = state.lideres.findIndex((c) => c.id == liderEdit.id);
      if (idx >= 0) {
        state.lideres[idx] = liderEdit;
        state.lideres = [... state.lideres];
      } else {
        console.log(`La categoria con ID ${liderEdit.id} no existe`);
      }
    },
    DELETE_LIDER(state, id){
      let arrAux = state.lideres.filter( (l) => l.id != id  ) 
      state.lideres = [... arrAux];
    },
    FETCH_PROYECTOS(state, proyectos){
      state.proyectos = [... proyectos];
    },
    FETCH_CATEGORIAS(state, categorias) {
      state.categorias = [... categorias];
    },
    FETCH_INTEGRANTES(state, integrantes) {
      state.integrantes = [... integrantes];
    }
  },
  actions: {
    async fetchProyectos({ commit }) {
      const proyectos = await AxiosService.get('proyectos');
      commit("FETCH_PROYECTOS", proyectos);
    },
    async fetchCategorias({ commit }) {
      const categorias = await AxiosService.get('categorias');
      commit("FETCH_CATEGORIAS", categorias)
    },
    async fetchIntegrantes({ commit }) {
      const integrantes = await AxiosService.get('integrantes');
      commit("FETCH_INTEGRANTES", integrantes)
    },
    //Las acciones llaman a las mutaciones. A su vez las acciones pueden hacer llamadas a API's
    async agregarProyecto({ commit }, proyectoNuevo) {
      await AxiosService.insert('proyectos', proyectoNuevo);
      this.dispatch("fetchProyectos");
      commit("ADD_PROYECTO", proyectoNuevo);
    },
    async editarProyecto({ commit }, proyectoEdit) {
      //console.log("Proyecto en action: ", proyectoEdit);
      await AxiosService.editar('proyectos', proyectoEdit);
      commit("EDIT_PROYECTO", proyectoEdit);
    },
    async eliminarProyecto({ commit }, id) {
      await AxiosService.delete('proyectos', id);
      commit("DELETE_PROYECTO", id);
    },
    async cambiarEstado ({commit}, id){
      commit("CAMBIAR_ESTADO_PROYECTO", id);
    },
    async agregarCategoria({ commit }, categoriaNueva) {
      await AxiosService.insert('categorias', categoriaNueva);
      this.dispatch("fetchCategorias");
      commit("ADD_CATEGORIA", categoriaNueva);
    },
    async editarCategoria({ commit }, categoriaEdit) {
      await AxiosService.update('categorias', categoriaEdit)
      commit("EDIT_CATEGORIA", categoriaEdit);
    },
    async eliminarCategoria({ commit }, id) {
      await AxiosService.delete('categorias', id);
      commit("DELETE_CATEGORIA", id);
    },
    async agregarIntegrante({commit}, integranteNuevo) {
      await AxiosService.insert('integrantes', integranteNuevo);
      this.dispatch("fetchIntegrantes");
      commit("ADD_INTEGRANTE",integranteNuevo);
    },
    async editarIntegrante({commit}, integrante) {
      await AxiosService.editar('integrantes', integrante)
      commit("EDIT_INTEGRANTE", integrante);
    },
    async eliminarIntegrante({commit}, id) {
      await AxiosService.delete('integrantes', id);
      commit("DELETE_INTEGRANTE", id);
    },
  },
  getters: {
    proyectos: (state) => {
      // Por una cuestion de reactividad de Vue conviene devolver un nuevo array clonado que el mismo que está en el store
      let proyectos = [... state.proyectos];
      return proyectos;
    },
    categorias: (state) => {
      let categorias = [... state.categorias];
      return categorias;
    },
    categoriasNombre: (state) => {
        let catNombres = state.categorias.map( (categoria) => categoria.nombre )
        return catNombres;
    },
    integrantes: (state) => {
      let integrantes = [... state.integrantes];
      return integrantes;
    },
    lideresNombre: (state) => {
      let lidNombres = state.lideres.map( (lideres) => lideres.nombre )
      return lidNombres;
  },
    proyectoById: (state) => (id) => {
      return state.proyectos.find((p) => p.id === id);
    },
    categoriaById: (state) => (id) => {
      return state.categorias.find((c) => c.id === id);
    },
    liderById: (state) => (id) => {
      return state.lideres.find((l) => l.id === id);
    },
  },
});
