<template>
  <div class="projects">
    
    <v-container>
        <v-row>
          <v-col>
            <h1 class="mt-6 mb-5 text-center grey--text">Mis proyectos</h1>
          </v-col>
            <v-col>
            <p class="mt-6 mb-5 text-center grey--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo deleniti quod impedit incidunt a odio voluptatibus culpa adipisci sint corporis enim rem sit, accusantium excepturi, qui laboriosam, earum laudantium?</p>
          </v-col>
      </v-row>
    </v-container>
   


    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="proyecto in misProyectos" :key="proyecto.titulo">
          <v-expansion-panel-header class="font-weight-bold">
            {{ proyecto.titulo }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div>
                 Categoria: {{proyecto.categoria}}
                </div>
                <div  class="font-weight-bold">
                  Vence el dia {{ proyecto.plazo }}
                </div>
                <div>
                  {{ proyecto.descripcion }}
                </div>
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
          lider: "Emiliano Graniero",
          plazo: "9 Jun 2021",
          estado: "completado",
          descripcion:
            "Crear base de datos",
        },
        {
          titulo: "Trabajo de NT2",
          categoria: "Frontend",
          lider: "Guido Ponzio",
          plazo: "19 Jun 2021",
          estado: "enProgreso",
          descripcion:
            "Crear Pagina con 3 CRUD",
        },
        {
          titulo: "Trabajo de PR2",
          categoria: "Funcional",
          lider: "Guido Ponzio",
          plazo: "19 Jun 2021",
          estado: "enProgreso",
          descripcion:
            "Presentar trabajo practico de PR2",
        },
        {
          titulo: "Trabajo de AMS",
          categoria: "Funcional",
          lider: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "vencido",
          descripcion:
            "Crear Analisis funcional",
        },
        {
          titulo: "Trabajo de AMS",
          categoria: "Funcional",
          lider: "Lucas Cantoni",
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
              return p.lider == "Guido Ponzio"
          })
      }
  },
};
</script>
