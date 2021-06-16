<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          @click="rellenarForm()"
          depressed
          :class="accion === 'nuevo' ? 'success' : 'orange lighten-1'"
          dark
          v-on="on"
        >
          {{ accion == "nuevo" ? "Nuevo proyecto" : "Editar" }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline blue lighten-2" primary-title>
          {{ accion == "nuevo" ? "Nuevo" : "Editar" }} proyecto
        </v-card-title>
        <v-card-text>
          <!-- Formulario de nuevo proyecto -->
          <v-form class="px-3" ref="form">
            <!-- Titulo -->
            <v-text-field
              v-model="nombre"
              label="Título"
              prepend-icon="mdi-folder"
              :rules="[rules.requerido, rules.contador]"
              counter="50"
            ></v-text-field>

            <!-- Categoria -->
            <v-select
              :items="categorias"
              v-model="categoria"
              label="Categoria"
              prepend-icon="mdi-shape"
            ></v-select>

            <!-- Lider-->
            <v-select
              :items="lideres"
              v-model="lider"
              label="Líder"
              prepend-icon="mdi-account"
            ></v-select>

            <!-- Descripcion -->
            <v-textarea
              v-model="descripcion"
              label="Descripción"
              prepend-icon="mdi-pencil"
              :rules="[rules.requerido]"
            ></v-textarea>

            <!-- Fecha -->
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="fechaFormateada"
                  label="Fecha de vencimiento"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                  :rules="[rules.requerido]"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="plazo"
                :first-day-of-week="1"
                locale="es-AR"
              >
              </v-date-picker>
            </v-menu>

            <v-btn
              v-if="accion === 'nuevo'"
              @click="crear()"
              depressed
              dark
              class="success"
            >
              Nuevo Proyecto
            </v-btn>

            <v-btn
              v-else
              @click="editar()"
              dark
              depressed
              class="orange lighten-1"
            >
              Editar proyecto
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
moment.locale("es");

export default {
  props: ["accion", "idProyecto"],
  data() {
    return {
      dialog: false,
      //categorias: ["Fronted", "Backend", "Funcional", "Redes", "Devops"],
     // lideres: ["Lucas Cantoni", "Emiliano Graniero", "Guido Ponzio"],
      //categorias: this.$store.getters.categorias.map(({ nombre }) => ({ nombre })),
     // lideres: this.$store.getters.lideres.map(({ nombre }) => ({ nombre })),
      nombre: "",
      descripcion: "",
      plazo: null,
      categoria: "",
      lider: "",
      proyectoNuevo: {
        id: "",
        categoria: "",
        lider: "",
        nombre: "",
        descripcion: "",
        plazo: null,
        estado: "",
      },
      //Los requisitos son la forma de filtrar inputs utilizando el prop :rules que viene definido en Vuetify
      //Cada requisito es una funcion lambda
      rules: {
        requerido: (value) => !!value || "Campo obligatorio",
        contador: (value) => value.length <= 50 || "Máximo 50 caracteres",
      },
    };
  },
  methods: {
    crear() {

      this.proyectoNuevo.nombre = this.nombre;
      this.proyectoNuevo.categoria = this.categoria;
      this.proyectoNuevo.lider = this.lider;
      this.proyectoNuevo.descripcion = this.descripcion;
      this.proyectoNuevo.plazo = this.plazo;
      this.proyectoNuevo.estado = "enProgreso";
      this.proyectoNuevo.id = String(uuidv4());

      // Creo un objeto clon de proyectoNuevo usando el spread operator 
      //para que no apunten siempre a la misma direccion de memoria 
      //todos los proyectos creados

      let proyectoAdd = {... this.proyectoNuevo}

      //this.$store.state.nuevoProyecto = { ...this.proyectoNuevo };
      this.$store.dispatch("agregarProyecto", proyectoAdd);

      // Reinicio el objeto proyecto
      this.proyectoNuevo = {
        id: "",
        categoria: "",
        lider: "",
        nombre: "",
        descripcion: "",
        plazo: null,
        estado: "",
      };

      // Reinicio las variables en data

      this.nombre = "";
      this.descripcion = "";
      this.lider = "";
      this.categoria = "";
      this.plazo = "";

      // Cerrar popup luego de enviar el form
      (this.dialog = false);
    },
    editar() {
      //this.$store.state.idBuscado = this.idProyecto;
      let proyectoEdit = {...this.$store.getters.proyectoById(this.idProyecto),};

      // Actualizar objeto traido del store
      if (proyectoEdit != null) {
        proyectoEdit.nombre = this.nombre;
        proyectoEdit.categoria = this.categoria;
        proyectoEdit.lider = this.lider;
        proyectoEdit.descripcion = this.descripcion;
        proyectoEdit.plazo = this.plazo;

        this.$store.dispatch("editarProyecto", proyectoEdit);
      }

       // Reinicio las variables en data

        this.nombre = "";
        this.descripcion = "";
        this.lider = "";
        this.categoria = "";
        this.plazo = "";

        // Cerrar popup luego de enviar el form
         this.dialog = false;
    },
    mostrarID() {
      alert("ID que llega al componente: " + this.idProyecto);
      let proyectoEdit = {
        ...this.$store.getters.proyectoById(this.idProyecto),
      };
      alert("ID del proyecto traido del store: " + proyectoEdit.id);
    },
    rellenarForm(){
      if(this.accion == 'editar'){

          let proyectoEdit = {
        ...this.$store.getters.proyectoById(this.idProyecto),
      };

           // Llenar los campos de textoc con los datos del objeto traido del store

        this.nombre = proyectoEdit.nombre;
        this.categoria = proyectoEdit.categoria;
        this.lider = proyectoEdit.lider;
        this.descripcion = proyectoEdit.descripcion;
        this.plazo = proyectoEdit.plazo;
      }
    }
  },
  computed: {
    fechaFormateada() {
      return this.plazo ? moment(this.plazo).format("Do MMMM YYYY") : "";
    },
    categorias(){
      return this.$store.getters.categoriasNombre;
    },
    lideres(){
      return this.$store.getters.lideresNombre;
    }

  },
};
</script>
