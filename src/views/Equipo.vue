<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">Equipo</h1>
    <v-container class="my-5">
      <v-row wrap>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="persona in equipo"
          :key="persona.nombre"
        >
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4"> foto de perfil </v-responsive>
            <v-card-text>
              <div class="text-subtitle-1">{{ persona.nombre }}</div>
              <div class="grey--text">{{ persona.rol }}</div>
            </v-card-text>
            <v-card-action>
              <v-btn depressed class="grey--text mb-3">
                <v-icon small left> mdi-message </v-icon>
                <span>Contactar</span>
              </v-btn>
            </v-card-action>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipo: [
        { nombre: "Emiliano Graniero", rol: "Desarrollador Backend" },
        { nombre: "Guido Ponzio", rol: "Desarrollor Frontend" },
        { nombre: "Lucas Cantoni", rol: "Analista funcional" },
      ],
    };
  },
};
</script>
