<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn depressed class="success" dark v-on="on">Nueva categoria</v-btn>
      </template>
     
      <v-card>
        <v-card-title class="headline blue lighten-2" primary-title>
          Añadir nueva categoria
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
            ></v-text-field>
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
  data() {
    return {
      categoria: "",
      
      //Los requisitos son la forma de filtrar inputs utilizando el prop :rules que viene definido en Vuetify
      //Cada requisito es una funcion lambda
      rules: {
        requerido: (value) => !!value || "Campo obligatorio"
      },
    };
  },
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        console.log(this.titulo, this.descripcion);
      }

      this.nombre = "";

    },
  },
};
</script>
