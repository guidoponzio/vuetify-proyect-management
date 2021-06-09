<template>
  <div class="categorias">
    <h1 class="subtitle-1 grey--text">Categorias</h1>

    <!-- Boton de nueva categoria -->
    <v-card-action>
      <v-row>
        <v-col class="mt-6 mb-5 text-center">
          <v-btn depressed class="grey--text mb-3">
            <PopupCategorias />
          </v-btn>
        </v-col>
      </v-row>
    </v-card-action>

    <!-- Categorias -->
 <v-container class="my-5">
      <v-row wrap>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(categoria,i) in categorias"
          :key="i"
        >
          <v-card flat class="text-center ma-3">
            <v-card-text>
              <div class="text-subtitle-1">{{ categoria.nombre }}</div>
              <div class="grey--text">{{ categoria.descripcion }}</div>
            </v-card-text>
            <v-card-action>
            <v-btn depressed class="mb-2 mx-2 orange lighten-1">
              Editar
            </v-btn>
            <v-btn depressed dark class="mb-2 ml-2 red lighten-1">
              Eliminar
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
        { nombre: "Analisis funcional", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "Backend", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "Frontend", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "Redes", descripcion: "Lorem ipsum bla bla bla" },
        { nombre: "DevOps", descripcion: "Lorem ipsum bla bla bla" },
      ],
    };
  },
};
</script>
