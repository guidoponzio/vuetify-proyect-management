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
          <v-form v-model="valid" lazy-validation class="px-3" ref="form">
            <!-- Titulo -->
            <v-text-field
              v-model="nombre"
              label="Título"
              prepend-icon="mdi-folder"
              :rules="nombreRules"
              required
              :counter="50"
            ></v-text-field>

            <!-- Categoria -->
            <v-select
              :items="categorias"
              v-model="categoria"
              label="Categoria"
              prepend-icon="mdi-shape"
              required
              :rules="[(v) => !!v || 'Categoria es obligatoria']"
            ></v-select>

            <!-- Lider-->
            <v-select
              :items="lideres"
              v-model="lider"
              label="Líder"
              prepend-icon="mdi-account"
              required
              :rules="[(v) => !!v || 'Lider es obligatorio']"
            ></v-select>

            <!-- Descripcion -->
            <v-textarea
              v-model="descripcion"
              label="Descripción"
              prepend-icon="mdi-pencil"
              required
              :rules="descripcionRules"
              :counter="280"
            ></v-textarea>

            <!-- Fecha -->
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="fechaFormateada"
                  label="Fecha de vencimiento"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                  required
                  :rules="[(v) => !!v || 'Fecha es obligatoria']"
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
              :disabled="!valid"
              @click="crear()"
              depressed
              class="success white--text"
            >
              Nuevo Proyecto
            </v-btn>

            <v-btn
              v-else
              @click="editar()"
              :disabled="!valid"
              depressed
              class="orange lighten-1 white--text"
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
      nombreRules: [
        (v) => !!v || "Nombre es requerido",
        (v) =>
          (v && v.length <= 50) ||
          "Nombre tiene que tener menos de 50 caracteres",
      ],
      descripcionRules: [
        (v) => !!v || "Descripcion es requerida",
        (v) =>
          (v && v.length <= 280) ||
          "La descripción tiene que tener menos de 280 caracteres",
      ],
      valid: true,
    };
  },
  methods: {
    crear() {
      if (this.$refs.form.validate()) {
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

        let proyectoAdd = { ...this.proyectoNuevo };

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

        this.reiniciarForm();
        this.reiniciarValidacion();

        // Cerrar popup luego de enviar el form
        this.dialog = false;
      }
    },
    editar() {


      let proyectoEdit = {
        ...this.$store.getters.proyectoById(this.idProyecto),
      };

      // Actualizar objeto traido del store
      if (proyectoEdit != null) {
        if (this.$refs.form.validate()) {
          proyectoEdit.nombre = this.nombre;
          proyectoEdit.categoria = this.categoria;
          proyectoEdit.lider = this.lider;
          proyectoEdit.descripcion = this.descripcion;
          proyectoEdit.plazo = this.plazo;

          this.$store.dispatch("editarProyecto", proyectoEdit);

          this.reiniciarForm();
          this.reiniciarValidacion();

          // Cerrar popup luego de enviar el form
          this.dialog = false;
        }
      }

    },
    mostrarID() {
      alert("ID que llega al componente: " + this.idProyecto);
      let proyectoEdit = {
        ...this.$store.getters.proyectoById(this.idProyecto),
      };
      alert("ID del proyecto traido del store: " + proyectoEdit.id);
    },
    rellenarForm() {
      if (this.accion == "editar") {
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
    },
    reiniciarForm() {
      this.$refs.form.reset();
    },
    reiniciarValidacion() {
      this.$refs.form.resetValidation();
    },
  },
  computed: {
    fechaFormateada() {
      return this.plazo ? moment(this.plazo).format("Do MMMM YYYY") : "";
    },
    categorias() {
      return this.$store.getters.categoriasNombre;
    },
    lideres() {
      return this.$store.getters.lideresNombre;
    },
  },
};
</script>
