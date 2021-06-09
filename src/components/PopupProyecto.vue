<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
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
      categorias: ["Fronted", "Backend", "Funcional", "Redes", "Devops"],
      lideres: ["Lucas Cantoni", "Emiliano Graniero", "Guido Ponzio"],
      nombre: "",
      descripcion: "",
      plazo: null,
      categoria: "",
      lider: "",
      proyecto: {
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
      this.proyecto.nombre = this.nombre;
      this.proyecto.categoria = this.categoria;
      this.proyecto.lider = this.lider;
      this.proyecto.descripcion = this.descripcion;
      this.proyecto.plazo = this.plazo;
      this.proyecto.estado = "enProgreso";
      this.proyecto.id = String(uuidv4());

      this.$store.state.nuevoProyecto = this.proyecto;
      this.$store.dispatch("agregarProyecto");

      // Reinicio el objeto proyecto
      this.proyecto = {
        id: "",
        categoria: "",
        lider: "",
        nombre: "",
        descripcion: "",
        plazo: null,
        estado: "",
      },
      this.dialog = false;
    },
    editar() {
      this.$store.state.idBuscado = this.idProyecto;
      let proyectoEdit = this.$store.getters.proyecto;
      if (!proyectoEdit) {
        proyectoEdit.nombre = this.nombre;
        proyectoEdit.categoria = this.categoria;
        proyectoEdit.lider = this.lider;
        proyectoEdit.descripcion = this.descripcion;
        proyectoEdit.plazo = this.plazo;

        this.$store.state.nuevoProyecto = this.proyectoEdit;
        this.$store.dispatch("editarProyecto");
      }
      this.dialog = false;
    },
  },
  computed: {
    fechaFormateada() {
      return this.plazo ? moment(this.plazo).format("Do MMMM YYYY") : "";
    },
  },
};
</script>
