<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          @click="rellenarForm()"
          depressed
          :class="
            accion === 'nuevo'
              ? 'success white--text'
              : 'orange lighten-1 white--text'
          "
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
          <v-form v-model="valid" lazy-validation class="px-3" ref="form">
            <!-- Nombre -->
            <v-text-field
              v-model="nombre"
              label="Nombre completo"
              prepend-icon="mdi-folder"
              :rules="nombreRules"
              required
              counter="50"
            ></v-text-field>

            <!-- Rol -->
            <v-textarea
              v-model="rol"
              label="Rol"
              prepend-icon="mdi-pencil"
              :rules="rolRules"
              counter="140"
              required
            ></v-textarea>

            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-folder"
              :rules="emailRules"
              required
            ></v-text-field>

            <!-- Avatar 
            <v-textarea
              v-model="avatar"
              label="avatar"
              prepend-icon="mdi-pencil"
            ></v-textarea>-->

            <v-btn
              v-if="accion == 'nuevo'"
              @click="crear"
              depressed
              class="success white--text"
              :disabled="!valid"
              >Nuevo integrante
            </v-btn>

            <v-btn
              v-else
              @click="editar"
              depressed
              class="orange lighten-1 white--text"
              :disabled="!valid"
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
  props: ["accion", "idIntegrante"],
  data() {
    return {
      valid: true,
      dialog: false,
      nombre: "",
      rol: "",
      email: "",
      integranteNuevo: {
        nombre: "",
        rol: "",
        email: "",
        id: "",
      },
      nombreRules: [
        (v) => !!v || "Nombre es obligatorio",
        (v) => (v && v.length <= 50) || "Debe ser menor a 50 caracteres",
      ],
      rolRules: [
        (v) => !!v || "Rol es obligatorio",
        (v) => (v && v.length <= 80) || "Debe ser menor a 140 caracteres",
      ],
      emailRules: [
        (v) => !!v || "E-mail es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "Ingrese un e-mail valido",
      ],
    };
  },
  methods: {
    crear() {
      if (this.$refs.form.validate()) {
        this.integranteNuevo.nombre = this.nombre;
        this.integranteNuevo.rol = this.rol;
        this.integranteNuevo.email = this.email;
        this.integranteNuevo.id = String(uuidv4());

        let integranteAdd = { ...this.integranteNuevo };
        this.$store.dispatch("agregarIntegrante", integranteAdd);

        this.dialog = false;
        this.nombre = "";
        this.rol = "";
        this.integrante = {
          nombre: "",
          rol: "",
          id: "",
        };

        this.reiniciarForm();
        this.reiniciarValidacion();

        // Cerrar popup luego de enviar el form
        this.dialog = false;
      }
    },
    editar() {
      let integranteEdit = this.$store.getters.integranteById(this.idintegrante);
      if (integranteEdit != null) {
        if(this.$refs.form.validate()){
          integranteEdit.nombre = this.nombre;
          integranteEdit.rol = this.rol;
          integranteEdit.email = this.email;
          this.$store.dispatch("editarIntegrante", integranteEdit);
          this.reiniciarForm();
          this.reiniciarValidacion();

           this.dialog = false;
        }
      }
    },
    rellenarForm() {
      if (this.accion == "editar") {
        let integranteEdit = {
          ...this.$store.getters.integranteById(this.idIntegrante),
        };
        // Llenar los campos de textoc con los datos del objeto traido del store

        this.nombre = integranteEdit.nombre;
        this.rol = integranteEdit.rol;
        this.email = integranteEdit.email;
      }
    },
    reiniciarForm() {
      this.$refs.form.reset();
    },
    reiniciarValidacion() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
