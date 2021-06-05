<template>
  <div class="home">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenar('titulo')"
              v-on="on"
            >
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">titulo</span>
            </v-btn>
          </template>
          <span>Ordenar por titulo</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenar('persona')"
              v-on="on"
            >
              <v-icon left small>mdi-account</v-icon>
              <span right class="caption text-lowercase">persona</span>
            </v-btn>
          </template>
          <span>Ordenar por persona</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenarEstado()"
              v-on="on"
            >
              <v-icon left small>mdi-calendar</v-icon>
              <span right class="caption text-lowercase">estado</span>
            </v-btn>
          </template>
          <span>Ordenar por estado</span>
        </v-tooltip>
      </v-row>
      <v-divider></v-divider>
      <v-card flat v-for="proyecto in proyectos" :key="proyecto.title">
        <v-row wrap :class="`pa-3 proyecto ${proyecto.estado}`">
          <v-flex xs12 md6>
            <div class="caption blue--text">Titulo del proyecto</div>
            <div>{{ proyecto.titulo }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Persona</div>
            <div>{{ proyecto.persona }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Vence</div>
            <div>{{ proyecto.plazo }}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div>
              <v-chip
                small
                :color="`${proyecto.estado}`"
                :class="`v-chip--active white--text caption my-2`"
                >{{
                  proyecto.estado == "enProgreso"
                    ? "en progreso"
                    : proyecto.estado
                }}
              </v-chip>
            </div>
          </v-flex>
        </v-row>
      </v-card>
      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proyectos: [
        {
          titulo: "Trabajo de BD2",
          persona: "Emiliano Graniero",
          plazo: "9 Jun 2021",
          estado: "completado",
          descripcion: "Mens Sana",
        },
        {
          titulo: "Trabajo de NT2",
          persona: "Guido Ponzio",
          plazo: "19 Jun 2021",
          estado: "enProgreso",
          descripcion: "Mens Sana",
        },
        {
          titulo: "Trabajo de AMS",
          persona: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "vencido",
          descripcion: "Mens Sana",
        },
        {
          titulo: "Trabajo de AMS",
          persona: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "completado",
          descripcion: "Mens Sana",
        },
      ],
    };
  },
  methods: {
    ordenar(prop) {
      this.proyectos.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    ordenarEstado() {
      this.proyectos.sort((a, b) => a.estado.localeCompare(b.estado));
    },
  },
};
</script>

<style>
.proyecto.enProgreso {
  border-left: 8px solid#f6fa05;
}
.proyecto.completado {
  border-left: 8px solid#3cd1c2;
}
.proyecto.vencido {
  border-left: 8px solid tomato;
}

.v-chip.enProgreso {
  background: #eba834;
}
.v-chip.completado {
  background:#479c38;
}
.v-chip.vencido {
  background: #f83e70;
}
</style>
