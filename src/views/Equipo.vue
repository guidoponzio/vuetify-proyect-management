<template>
  <div class="team">
    

    <!-- Boton de nuevo integrante -->
     <v-container>
        <v-row>
          <v-col>
            <h1 class="mt-6 mb-5 text-center grey--text">Equipo</h1>
          </v-col>
            <v-col>
            <p class="mt-6 mb-5 text-center grey--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo deleniti quod impedit incidunt a odio voluptatibus culpa adipisci sint corporis enim rem sit, accusantium excepturi, qui laboriosam, earum laudantium?</p>
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
              <v-btn text depressed class="mb-2 mx-2">
                <PopupIntegrante accion="editar" />
              </v-btn>
              <v-btn text depressed class="mb-2 ml-2" color="red" dark>
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
  methods: {},
};
</script>
