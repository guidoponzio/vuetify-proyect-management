<template>
  <div>
    <!-- Cabecera !-->
    <v-container>
      <v-row wrap>
        <v-col>
          <h1 class="mt-6 mb-5 text-center grey--text">Dashboard</h1>
        </v-col>
        <v-col>
          <p class="mt-6 mb-5 text-center grey--text">
            Acá puede ver todos los proyectos, cambiar su estado, editarlos y
            borrarlos. En la parte superior derecha del panel hay botones para
            ordenar los proyectos y facilitar su visualización.
          </p>
        </v-col>
        <v-col class="mt-6 mb-5">
          <PopupProyecto accion="nuevo"></PopupProyecto>
        </v-col>
      </v-row>
    </v-container>

    <!-- Botones de ordenamiento !-->

    <v-container class="my-5">
      <v-row wrap class="mb-3">
        <!-- Titulo !-->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenar('nombre')"
              v-on="on"
            >
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">titulo</span>
            </v-btn>
          </template>
          <span>Ordenar por titulo</span>
        </v-tooltip>

        <!-- Persona !-->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenar('lider')"
              v-on="on"
            >
              <v-icon left small>mdi-account</v-icon>
              <span right class="caption text-lowercase">líder</span>
            </v-btn>
          </template>
          <span>Ordenar por líder</span>
        </v-tooltip>

        <!-- Estado !-->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenar('estado')"
              v-on="on"
            >
              <v-icon left small>mdi-calendar</v-icon>
              <span right class="caption text-lowercase">estado</span>
            </v-btn>
          </template>
          <span>Ordenar por estado</span>
        </v-tooltip>

        <!-- Categoria !-->

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              depressed
              class="grey--text"
              @click="ordenar('categoria')"
              v-on="on"
            >
              <v-icon left small>mdi-shape</v-icon>
              <span right class="caption text-lowercase">categoria</span>
            </v-btn>
          </template>
          <span>Ordenar por categoria</span>
        </v-tooltip>
     
      </v-row>
       <v-divider></v-divider>
      

      <!-- Datos !-->

      <v-card flat v-for="proyecto in proyectos" :key="proyecto.id">
        <v-row wrap :class="`pa-3 proyecto ${proyecto.estado}`">
          <v-col>
            <div class="caption blue--text">Titulo del proyecto</div>
            <div>{{ proyecto.nombre }}</div>
          </v-col>

          <v-col>
            <div class="caption blue--text">Categoria</div>
            <div>{{ proyecto.categoria }}</div>
          </v-col>

          <v-col>
            <div class="caption blue--text">Líder</div>
            <div>{{ proyecto.lider }}</div>
          </v-col>

          <v-col>
            <div class="caption blue--text">Vence</div>
            <div>{{ proyecto.plazo }}</div>
          </v-col>

          <v-col>
            <div class="caption blue--text">ID</div>
            <div>{{ proyecto.id }}</div>
          </v-col>

          <v-col>
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
          </v-col>

          <v-col>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  depressed
                  class="grey--text"
                  @click="cambiarEstado(proyecto.id)"
                  v-on="on"
                >
                  <v-icon
                    v-if="proyecto.estado == 'enProgreso'"
                    color="green lighten-1"
                    >mdi-check</v-icon
                  >
                  <v-icon
                    v-else-if="proyecto.estado == 'completado'"
                    color="orange lighten-1"
                    >mdi-progress-clock
                  </v-icon>
                  <v-icon v-else color="red lighten-1"
                    >mdi-progress-close
                  </v-icon>
                </v-btn>
              </template>
              <span v-if="proyecto.estado == 'enProgreso'"
                >Cambiar estado a completado</span
              >
              <span v-else-if="proyecto.estado == 'completado'"
                >Cambiar estado a en proceso</span
              >
              <span v-else
                >Este proyecto vencio. Cambiar estado a completado cuanto
                antes</span
              >
            </v-tooltip>
          </v-col>

          <v-col>
            <PopupProyecto accion="editar" :idProyecto="proyecto.id" />
          </v-col>

          <v-col>
            <v-btn
              @click="eliminar(proyecto.id)"
              text
              depressed
              class="mb-2 ml-2"
              color="red"
              dark
            >
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import PopupProyecto from "@/components/PopupProyecto.vue";
import { mapState } from "vuex";
export default {
  components: { PopupProyecto },
  data() {
    return {
      /**proyectos: [
        {
          titulo: "Trabajo de BD2",
          categoria: "Backend",
          lider: "Emiliano Graniero",
          plazo: "9 Jun 2021",
          estado: "completado",
          descripcion: "Mens Sana",
        },
        {
          titulo: "Trabajo de NT2",
          categoria: "Frontend",
          lider: "Guido Ponzio",
          plazo: "19 Jun 2021",
          estado: "enProgreso",
          descripcion: "Mens Sana",
        },
        {
          titulo: "Trabajo de AMS",
          categoria: "Analisis funcional",
          lider: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "vencido",
          descripcion: "Mens Sana",
        },
        {
          titulo: "Trabajo de AMS",
          categoria: "Analisis funcional",
          lider: "Lucas Cantoni",
          plazo: "1 Jun 2021",
          estado: "completado",
          descripcion: "Mens Sana",
        },
      ],**/
    };
  },
  methods: {
    ordenar(prop) {
      this.proyectos.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    cambiarEstado(id) {
      this.$store.dispatch("cambiarEstado", id);
      //this.$store.state.idBuscado = id;
      // let estadoActual = this.$store.getters.proyectoById(id).estado;
      /**let proyectoActual = this.$store.getters.proyectoById(id);
      let estadoActual = proyectoActual.estado;
      if (estadoActual == "enProgreso") {
        proyectoActual.estado = "completado";
      } else if (estadoActual == "completado") {
        proyectoActual.estado = "enProgreso";
      } else {
        proyectoActual.estado = "enProgreso";
      }**/
    },
    eliminar(id) {
      if (confirm("¿Está seguro que desea borrar este proyecto? ID: " + id)) {
        // Borrar
        //this.$store.state.idBuscado = id;
        this.$store.dispatch("eliminarProyecto", id);
        alert(`El proyecto ${id} ha sido borrado.`);
      } else {
        // No borrar
        console.log("Borrado cancelado");
      }
    }
  },
  beforeMount(){
    this.$store.dispatch("fetchProyectos");
 },
  computed: {
   ...mapState(['proyectos']),
    /**proyectos() {
      console.log(this.$store.state)
      return this.$store.state.proyectos;
    },**/
  },
};
</script>

<style>
.proyecto.enProgreso {
  border-left: 8px solid #ffa726;
}
.proyecto.completado {
  border-left: 8px solid#5da84f;
}
.proyecto.vencido {
  border-left: 8px solid tomato;
}

.v-chip.enProgreso {
  background: #ffa726;
}
.v-chip.completado {
  background: #479c38;
}
.v-chip.vencido {
  background: #f83e70;
}
</style>
