<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">

      <template v-slot:activator="{ on }">
        <v-btn
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
              >{{ nombre }}</v-text-field
            >
            <v-text-field
              v-model="descripcion"
              label="Descripcion"
              prepend-icon="mdi-pencil"
              :rules="[rules.requerido, rules.contador]"
              counter="280"
              >{{ nombre }}</v-text-field
            >
            <v-card-action>
              <v-btn
                @click="enviar"
                depressed
                dark
                :class="
                  accion === 'nuevo'
                    ? 'success mx-0 mt-3'
                    : 'orange lighten-1 mx-0 mt-3'
                "
                >{{ accion == "nuevo" ? "Nueva" : "Editar" }} categoria</v-btn
              >
            </v-card-action>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("es");

export default {
  props: ["accion", "idCategoria"],
  data() {
    return {
      dialog: false,
      nombre: "",
      descripcion: "",

      //Los requisitos son la forma de filtrar inputs utilizando el prop :rules que viene definido en Vuetify
      //Cada requisito es una funcion lambda
      rules: {
        requerido: (value) => !!value || "Campo obligatorio",
      },
    };
  },
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        console.log(this.nombre, this.descripcion);
        this.dialog = false;
        
        this.nombre = "";
        this.descripcion = "";
      }
    },
  },
};
</script>
