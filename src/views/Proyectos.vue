<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Mis Proyectos</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="proyecto in misProyectos" :key="proyecto.titulo">
          <v-expansion-panel-header>
            {{ proyecto.titulo }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div class="font-weight-bold">
                  Vence el dia {{ proyecto.plazo }}
                </div>
                <div>{{ proyecto.descripcion }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
          descripcion:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
        },
        {
          titulo: "Trabajo de NT2",
          persona: "Guido Ponzio",
          plazo: "19 Jun 2021",
          estado: "enProgreso",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
        },
        {
          titulo: "Trabajo de AMS",
          persona: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "vencido",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
        },
        {
          titulo: "Trabajo de AMS",
          persona: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "completado",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
        },
      ],
    };
  },
  computed: {
      misProyectos(){
          return this.proyectos.filter(p => {
              // Simula que estoy logueado como Guido asi que solo veo sus proyectos
              return p.persona == "Guido Ponzio"
          })
      }
  },
};
</script>
