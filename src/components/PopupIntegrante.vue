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

            <v-btn v-if="accion == 'nuevo' "  @click="crear" depressed dark class="success"
              >Nuevo integrante
            </v-btn>

            <v-btn v-else @click="editar" depressed dark class="orange lighten-1"
              >Editar integrante
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["accion", "idLider"],
  data() {
    return {
      dialog: false,
      nombre: "",
      rol: "",
      liderNuevo:{
        nombre: "",
        rol: "",
        id: ""
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
      if (this.$refs.form.validate()) {
        this.liderNuevo.nombre = this.nombre;
        this.liderNuevo.rol = this.rol;
        this.liderNuevo.id = String(uuidv4());

        let liderAdd = {... this.liderNuevo};

        this.$store.dispatch('agregarLider', liderAdd);
      }

      this.dialog = false;
      this.nombre = "";
      this.rol = "";
      this.lider = {
        nombre: "",
        rol: "",
        id: ""
      }
    },
    editar(){

      let liderEdit = this.$store.getters.liderById(this.idLider);
      if (liderEdit != null) {
        liderEdit.nombre = this.nombre;
        liderEdit.rol = this.rol;
        this.$store.dispatch("editarLider", liderEdit);
        
      }

      this.nombre = "";
      this.rol = "";
      this.dialog = false;
    },
    rellenarForm(){
      if(this.accion == 'editar'){

          let liderEdit = {
        ...this.$store.getters.liderById(this.idLider),
      };
           // Llenar los campos de textoc con los datos del objeto traido del store

        this.nombre = liderEdit.nombre;
        this.rol = liderEdit.rol;
      }
    }
  },
};
</script>
