import Vue from "vue";
import Vuex from "vuex";
import ProyectoService from "../services/ProyectoService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    proyectos: [],
    categorias: [],
    lideres: [],
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
    },
    EDIT_PROYECTO(state, proyectoEdit) {
      let idx = state.proyectos.findIndex((p) => p.id == proyectoEdit.id);
      if (idx !== -1) {
        //state.proyectos.splice(idx, 1, proyectoEdit);
        state.proyectos[idx] = proyectoEdit;
        //Hay que usar el spread operator para obligar a la UI a refrescar la info en pantalla
        state.proyectos = [... state.proyectos];
      } else {
        console.log(`El proyecto con ID ${proyectoEdit.id} no existe`);
      }
      console.log("Proyectos: " + state.proyectos);
    },
    DELETE_PROYECTO(state, id) {
     /** let idx = state.proyectos.findIndex((p) => p.id == id);
      if (idx >= 0) {
        state.proyectos.splice(idx, 1);
      } else {
        console.log(`El proyecto con ID ${id} no existe`);
      }**/
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
    ADD_LIDER(state, liderNuevo){
      state.lideres = [liderNuevo, ...state.lideres]
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
    /**,
    agregandoCategoria(state) {
      state.categorias = [state.nuevaCategoria, ...state.categorias];
    },
    editandoCategoria(state) {
      let idx = state.categorias.findIndex(
        (c) => c.id == state.idBuscadoCategoria
      );
      console.log(state);
      state.splice(idx, 1, state.nuevaCategoria);
    },
    eliminandoCategoria(state) {
      let idx = state.categorias.findIndex(
        (c) => c.id == state.idBuscadoCategoria
      );
      state.categorias.splice(idx, 1);
    },
    agregandoLider(state) {
      state.lideres = [state.nuevoLider, ...state.lideres];
    },
    editandoLider(state) {
      let idx = state.lideres.findIndex((c) => c.id == state.idBuscadoLider);
      console.log(state);
      state.splice(idx, 1, state.nuevoLider);
    },
    eliminandoLider(state) {
      let idx = state.lideres.findIndex((c) => c.id == state.idBuscadoLider);
      state.lideres.splice(idx, 1);
    },**/
    FETCH_PROYECTOS(state, proyectos){
      state.proyectos = [... proyectos];
    },
  },
  actions: {
    async fetchProyectos({ commit }) {
      const proyectos = await ProyectoService.getProyectos();
      commit("FETCH_PROYECTOS", proyectos);
    },
    //Las acciones llaman a las mutaciones. A su vez las acciones pueden hacer llamadas a API's
    async agregarProyecto({ commit }, proyectoNuevo) {
      await ProyectoService.insertProyecto(proyectoNuevo);
      this.dispatch("fetchProyectos");
      commit("ADD_PROYECTO", proyectoNuevo);
    },
    async editarProyecto({ commit }, proyectoEdit) {
      console.log("Proyecto en action: ", proyectoEdit);
      commit("EDIT_PROYECTO", proyectoEdit);
    },
    async eliminarProyecto({ commit }, id) {
      /**this.$http.delete("http://localhost:3000/proyectos/" + id).then(() => {
        commit("DELETE_PROYECTO", id);
      });**/
      commit("DELETE_PROYECTO", id);
    },
    async cambiarEstado ({commit}, id){
      commit("CAMBIAR_ESTADO_PROYECTO", id);
    },
    async agregarCategoria({ commit }, categoriaNueva) {
      commit("ADD_CATEGORIA", categoriaNueva);
    },
    async editarCategoria({ commit }, categoriaEdit) {
      commit("EDIT_CATEGORIA", categoriaEdit);
    },
    async eliminarCategoria({ commit }, id) {
     commit("DELETE_CATEGORIA", id);
    },
    async agregarLider({commit}, liderNuevo) {
      commit("ADD_LIDER",liderNuevo);
    },
    async editarLider({commit}, liderEdit) {
      commit("EDIT_LIDER", liderEdit);
    },
    async eliminarLider({commit}, id) {
      commit("DELETE_LIDER", id);
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
    lideres: (state) => {
      let lideres = [... state.lideres];
      return lideres;
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
