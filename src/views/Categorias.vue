<template>
  <div class="categorias">

    <!-- Boton de nueva categoria -->
     <v-container>
        <v-row>
          <v-col>
            <h1 class="mt-6 mb-5 text-center grey--text">Categorias</h1>
          </v-col>
            <v-col>
            <p class="mt-6 mb-5 text-center grey--text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo deleniti quod impedit incidunt a odio voluptatibus culpa adipisci sint corporis enim rem sit, accusantium excepturi, qui laboriosam, earum laudantium?</p>
          </v-col>
        <v-col class="mt-6 mb-5 text-center">
          <v-btn x-large depressed text>
            <PopupCategorias accion="nuevo" />
          </v-btn>
        </v-col>
      </v-row>
    </v-container>


    <!-- Categorias -->
    <v-container class="my-5">
      <v-row wrap>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(categoria, i) in categorias"
          :key="i"
        >
          <v-card flat shaped class="text-center ma-3">
            <v-card-title>
              <div class="text-title-1">{{ categoria.nombre }}</div>
            </v-card-title>
            <v-card-text>
              <div class="grey--text">{{ categoria.descripcion }}</div>
            </v-card-text>
            <v-btn text depressed class="mb-2 ml-2">
              <PopupCategorias accion="editar" idCategoria="i"/>
            </v-btn>
            <v-card-action>
              <v-btn text class="mb-2 ml-2" color="red" dark>
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-card-action>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PopupCategorias from "@/components/PopupCategorias";

export default {
  components: { PopupCategorias },
  data() {
    return {
      categorias: [
        {
          nombre: "Analisis funcional",
          descripcion: "Lorem ipsum bla bla bla",
        },
        { nombre: "Backend", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "Frontend", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "Redes", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "DevOps", descripcion: "Lorem ipsum bla bla bla" },
      ],
    };
  },
};
</script>
