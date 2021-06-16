<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          @click="rellenarForm()"
          depressed
          dark
          text
          :class="accion === 'nuevo' ? 'success' : 'orange lighten-1'"
          v-on="on"
        >
          <span v-if="accion == 'nuevo'">Nueva categoria</span>
          <span v-else> Editar </span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline blue lighten-2 white--text" primary-title>
          {{ accion == "nuevo" ? "Nueva" : "Editar" }} categoria
        </v-card-title>

        <v-card-text>
          <!-- Formulario de nuevo categoria -->
          <v-form class="px-3" ref="form">
            <!-- Nombre -->
            <v-text-field
              v-model="nombre"
              label="Nombre categoria"
              prepend-icon="mdi-folder"
              :rules="[rules.requerido, rules.contador]"
              counter="30"
              >{{ nombre }}
              </v-text-field>
            <v-text-field
              v-model="descripcion"
              label="Descripcion"
              prepend-icon="mdi-pencil"
              :rules="[rules.requerido]"
              counter="280"
              >{{ nombre }}</v-text-field
            >
            <v-card-action>
              <v-btn
                v-if="accion == 'nuevo'"
                @click="crear()"
                depressed
                dark
                orange
                lighten-1
                mx-0
                mt-3
                class="success mx-0 mt-3"
                >Crear categoria
              </v-btn>
              <v-btn
                v-else
                @click="editar()"
                depressed
                dark
                class="orange lighten-1 mx-0 mt-3"
                >Editar categoria
              </v-btn>
            </v-card-action>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["accion", "idCategoria"],
  data() {
    return {
      dialog: false,
      nombre: "",
      descripcion: "",
      categoriaNueva: {
        nombre: "",
        descripcion: "",
        id: "",
      },

      //Los requisitos son la forma de filtrar inputs utilizando el prop :rules que viene definido en Vuetify
      //Cada requisito es una funcion lambda
      rules: {
        requerido: (value) => !!value || "Campo obligatorio",
        contador: (value) => value.length <= 30 || "Máximo 30 caracteres",
      },
    };
  },
  methods: {
    crear() {
      this.categoriaNueva.nombre = this.nombre;
      this.categoriaNueva.descripcion = this.descripcion;
      this.categoriaNueva.id = String(uuidv4());

      let categoriaAdd = { ...this.categoriaNueva };

      this.$store.dispatch("agregarCategoria", categoriaAdd);

      //Reinicio el objeto categoria

      this.categoria = {
        id: "",
        nombre: "",
        descripcion: "",
      };

      this.nombre = "";
      this.descripcion = "";

      this.dialog = false;
    },
    editar() {
      let categoriaEdit = {
        ...this.$store.getters.categoriaById(this.idCategoria),
      };

      if (categoriaEdit != null) {
        categoriaEdit.nombre = this.nombre;
        categoriaEdit.descripcion = this.descripcion;
        this.$store.dispatch("editarCategoria", categoriaEdit);
      }

      this.nombre = "";
      this.descripcion = "";
      this.dialog = false;
    },
    rellenarForm() {
      if (this.accion == "editar") {
        let categoriaEdit = {
          ...this.$store.getters.categoriaById(this.idCategoria),
        };

        // Llenar los campos de textoc con los datos del objeto traido del store

        this.nombre = categoriaEdit.nombre;
        this.descripcion = categoriaEdit.descripcion;
      }
    },
  },
};
</script>
