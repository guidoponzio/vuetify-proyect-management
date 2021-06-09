<template>
  <div class="categorias">
    <h1 class="subtitle-1 grey--text">Categorias</h1>

     <!-- Boton de nueva categoria -->
      <v-card-action>
        <v-row>
         <v-col class="mt-6 mb-5 text-center">
              <v-btn depressed class="grey--text mb-3">
                <PopupCategorias/>
              </v-btn>
        </v-col>
      </v-row>
      </v-card-action>

   <v-card flat v-for="categoria in categorias" :key="categoria.nombre">
        <v-row wrap :class="`pa-3 categoria ${categoria.nombre}`">
          <v-flex xs12 md2>
            <div class="caption blue--text">Categoria</div>
            <div>{{ categoria.nombre }}</div>
          </v-flex>

          <v-flex xs12 md2>
            <div class="caption blue--text">Categoria</div>
            <div>{{ categoria.nombre }}</div>
          </v-flex>
        </v-row>
    </v-card>
  </div>
</template>

<script>

import PopupCategorias from '@/components/PopupCategorias';

export default {
  components: {PopupCategorias},
  data() {
    return {
      categorias: [
        { nombre: "Analisis funcional"},
        { nombre: "Backend"},
        { nombre: "Frontend"}
      ],
    };
  },
};

</script>