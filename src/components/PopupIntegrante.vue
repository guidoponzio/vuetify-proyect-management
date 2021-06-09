<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          :class="accion === 'nuevo' ? 'success' : 'orange lighten-1'"
          dark
          v-on="on"
          >{{ accion == "nuevo" ? "Nuevo integrante" : "Editar" }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline blue lighten-2 white--text" primary-title>
          {{ accion == "nuevo" ? "Nuevo" : "Editar" }} integrante
        </v-card-title>
        <v-card-text>
          <!-- Formulario de nuevo integrante -->
          <v-form class="px-3" ref="form">
            <!-- Nombre -->
            <v-text-field
              v-model="nombre"
              label="Nombre completo"
              prepend-icon="mdi-folder"
              :rules="[rules.requerido, rules.contador]"
              counter="30"
            ></v-text-field>

            <!-- Rol -->
            <v-textarea
              v-model="rol"
              label="Rol"
              prepend-icon="mdi-pencil"
              :rules="[rules.requerido]"
            ></v-textarea>

            <!-- Avatar 
            <v-textarea
              v-model="avatar"
              label="avatar"
              prepend-icon="mdi-pencil"
            ></v-textarea>-->

            <v-btn
              @click="enviar()"
              depressed
              dark
              :class="accion === 'nuevo' ? 'success' : 'orange lighten-1'"
              >{{ accion }} integrante</v-btn
            >
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
  props: ["accion", "idIntegrante"],
  data() {
    return {
      dialog: false,
      nombre: "",
      rol: "",
      //Los requisitos son la forma de filtrar inputs utilizando el prop :rules que viene definido en Vuetify
      //Cada requisito es una funcion lambda
      rules: {
        requerido: (value) => !!value || "Campo obligatorio",
        contador: (value) => value.length <= 30 || "Máximo 30 caracteres",
      },
    };
  },
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        console.log(this.nombre, this.rol);
      }
      this.dialog = false;
      this.nombre = "";
      this.rol = "";
    },
  },
};
</script>
