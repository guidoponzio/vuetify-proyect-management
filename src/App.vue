<template>
  <v-app>
    <Navbar />
    <v-content class="grey lighten-3 mx-4 mb-4">
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
