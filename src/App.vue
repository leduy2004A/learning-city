<template>
  <v-app>
    <div style="background-color: #f8f9ff" class="page">
      <div class="content">
        <!-- <Main></Main> -->
        <RouterView />
       
      </div>
    </div>
  </v-app>
</template>

<script>
// import Main from "@/components/UserView/MainWeb.vue";
export default {
  components: {
    // Main,
  },
};
</script>
<style scoped>
@font-face {
  font-family: "Nunito Sans", sans-serif;
  src: url(/src/assets/font/static/NunitoSans_10pt-Black.ttf);
}
.page {
  width: 100%;
  height: 100%;
}
.content {
  margin: 0 45.2px;
  height: 100%;
}
.v-app{
  height: 100%;
  width: 100%;
}
</style>
