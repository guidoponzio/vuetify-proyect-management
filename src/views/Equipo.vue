<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">Equipo</h1>

    <!-- Boton de nuevo integrante -->
    <v-card-action>
      <v-row>
        <v-col class="mt-6 mb-5 text-center">
          <v-btn depressed class="grey--text mb-3">
            <PopupIntegrante />
          </v-btn>
        </v-col>
      </v-row>
    </v-card-action>

    <v-container class="my-5">
      <v-row wrap>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(persona, i) in equipo"
          :key="i"
        >
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="persona.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="text-subtitle-1">{{ persona.nombre }}</div>
              <div class="grey--text">{{ persona.rol }}</div>
            </v-card-text>
              <v-card-action>
            <v-btn @click="modificarEquipo()" depressed class="mb-2 mx-2 orange lighten-1">
              Editar
            </v-btn>
            <v-btn depressed dark class="mb-2 ml-2 red lighten-1">
              Eliminar
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

export default {
  components: { PopupIntegrante },
  data() {
    return {
      equipo: [
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
      ],
    };
  },
  methods: {

  },
};
</script>
