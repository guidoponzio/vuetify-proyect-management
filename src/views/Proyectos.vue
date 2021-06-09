<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Mis Proyectos</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="proyecto in misProyectos" :key="proyecto.titulo">
          <v-expansion-panel-header class="font-weight-bold">
            {{ proyecto.titulo }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              Categoria: {{ proyecto.categoria }} 
            </v-card>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div  class="font-weight-bold">
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
          categoria: "Backend",
          persona: "Emiliano Graniero",
          plazo: "9 Jun 2021",
          estado: "completado",
          descripcion:
            "Crear base de datos",
        },
        {
          titulo: "Trabajo de NT2",
          categoria: "Frontend",
          persona: "Guido Ponzio",
          plazo: "19 Jun 2021",
          estado: "enProgreso",
          descripcion:
            "Crear Pagina con 3 CRUD",
        },
        {
          titulo: "Trabajo de AMS",
          categoria: "Funcional",
          persona: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "vencido",
          descripcion:
            "Crear Analisis funcional",
        },
        {
          titulo: "Trabajo de AMS",
          categoria: "Funcional",
          persona: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "completado",
          descripcion:
            "Crear analisis Tecnico",
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
