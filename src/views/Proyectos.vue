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
      proyectos: [],
    };
  },
  created() {
    // get data
    this.proyectos = this.$store.getters.proyectos
  },
  computed: {
      misProyectos(){ return this.$store.getters.proyectos

        /* 
          return this.proyectos.filter(p => {
              // Simula que estoy logueado como Guido asi que solo veo sus proyectos
              return p.lider == "Guido Ponzio"
          })
         */
      }
  },
};
</script>
