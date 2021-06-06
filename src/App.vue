<template>
  <v-app>
    <Navbar />
    <!-- Margen blanco ML-4 !-->
    <v-content class="grey lighten-3 ml-4">
      <router-view class="grey lighten-3"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
