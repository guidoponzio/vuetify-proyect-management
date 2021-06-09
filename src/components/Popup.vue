<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn depressed class="success" dark v-on="on">Nuevo proyecto</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline blue lighten-2" primary-title
          >Añadir nuevo proyecto</v-card-title
        >
        <v-card-text>
          <!-- Formulario de nuevo proyecto -->
          <v-form class="px-3" ref="form">
            <!-- Titulo -->
            <v-text-field
              v-model="titulo"
              label="Título"
              prepend-icon="mdi-folder"
              :rules="[rules.requerido, rules.contador]"
              counter="50"
            ></v-text-field>

            <v-text-field
              v-model="categoria"
              label="Categoria"
              prepend-icon="mdi-folder"
              :rules="[rules.requerido, rules.contador]"
              counter="30"
            ></v-text-field>

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

            <v-btn @click="enviar" depressed class="success mx-0 mt-3"
              >Agregar proyecto</v-btn
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
  data() {
    return {
      titulo: "",
      descripcion: "",
      plazo: null,
      //Los requisitos son la forma de filtrar inputs utilizando el prop :rules que viene definido en Vuetify
      //Cada requisito es una funcion lambda
      rules: {
        requerido: (value) => !!value || "Campo obligatorio",
        contador: (value) => value.length <= 50 || "Máximo 50 caracteres",
      },
    };
  },
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
        console.log(this.titulo, this.descripcion);
      }

      this.titulo = "";
      this.descripcion = "";
      this.plazo = null;
    },
  },
  computed: {
    fechaFormateada() {
      return this.plazo ? moment(this.plazo).format("Do MMMM YYYY") : "";
    },
  },
};
</script>
