<template>
  <nav>
    <v-app-bar flat app color="grey lighten-3">
      <v-app-bar-nav-icon
        class="blue--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title flat>
        <span class="font-weight-light text-downcase blue--text">ORT </span>
        <span class="grey--text text-uppercase">Todo</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- Menu alternativo derecha -->

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="blue" v-on="on">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Botón para salir -->
      <v-btn text color="salir">
        <span>Salir</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Menu principal izquierda -->

    <v-navigation-drawer v-model="drawer" app class="blue lighten-1">

      <!-- Boton de nuevo proyecto -->
      <v-row>
        <v-col class="mt-6 mb-5 text-center">
          <PopupProyecto accion="nuevo"/>
        </v-col>
      </v-row>

      <!-- Lista de paginas -->
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text"> {{ link.icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import PopupProyecto from './PopupProyecto.vue';

export default {
  components: { PopupProyecto },
  data() {
    return{
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        //{ icon: "mdi-folder", text: "Mis proyectos", route: "/proyectos" },
        { icon: "mdi-shape", text: "Categorias", route: "/categorias" },
        { icon: "mdi-account", text: "Equipo", route: "/equipo" }
      ],
    };
  },
};

</script>

<style scoped></style>
