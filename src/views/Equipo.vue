<template>
  <div class="team">
    <!-- Boton de nuevo integrante -->
    <v-container>
      <v-row>
        <v-col>
          <h1 class="mt-6 mb-5 text-center grey--text">Equipo</h1>
        </v-col>
        <v-col>
          <p class="mt-6 mb-5 text-center grey--text">
            Acá puede agregar integrantes a su equipo para poder asignarlos como lideres en los proyectos.
          </p>
        </v-col>
        <v-col class="mt-6 mb-5 text-center">
          <v-btn x-large depressed text>
            <PopupIntegrante accion="nuevo" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="my-5">
      <v-row wrap>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="lider in lideres"
          :key="lider.id"
        >
          <v-card flat class="text-center ma-3">
            <!--<v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="persona.avatar" />
              </v-avatar>
            </v-responsive>-->
            <v-card-text>
                 <v-card-title>
              <div class="text-title-1">{{ lider.nombre }}</div>
            </v-card-title>
              <div class="grey--text">{{ lider.rol }}</div>
              <div class="grey--text"> Email: {{ lider.email }}</div>
            </v-card-text>


            <v-card-action>
              <v-btn text depressed class="mb-2 mx-2">
                <PopupIntegrante accion="editar" :idLider="lider.id"/>
              </v-btn>
              <v-btn @click="eliminar(lider.id)" text depressed class="mb-2 ml-2" color="red" dark>
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-card-action>
            <!-- <v-card-action>
              <v-btn depressed class="grey--text mb-3">
                <v-icon small left> mdi-message </v-icon>
                <span>Contactar</span>
              </v-btn>
            </v-card-action>
            -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PopupIntegrante from "@/components/PopupIntegrante";
import { mapState } from "vuex";

export default {
  components: { PopupIntegrante },
  data() {
    return {
      /**equipo: [
        {
          nombre: "Emiliano Graniero",
          rol: "Desarrollador Backend",
          avatar: "/backend.jpg",
        },
        {
          nombre: "Guido Ponzio",
          rol: "Desarrollor Frontend",
          avatar: "/frontend.jpg",
        },
        {
          nombre: "Lucas Cantoni",
          rol: "Analista funcional",
          avatar: "/ba.jpg",
        },
      ],**/
    };
  },
  methods: {
     eliminar(id) {
      if (confirm("¿Está seguro que desea borrar este integrante? ID: " + id)) {
        // Borrar
        this.$store.dispatch("eliminarLider", id);
        alert(`El lider ${id} ha sido borrado.`);
      } else {
        // No borrar
        console.log("Borrado cancelado");
      }
    },
  },
  computed: {
    ...mapState(['lideres'])
 },
};
</script>
