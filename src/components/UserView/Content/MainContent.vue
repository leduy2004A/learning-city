<template>
  <div class="main-content">
    <div class="content-main">
      <div class="title mb-5">
        <h2 class="text">
          <font-awesome-icon :icon="['fas', 'book']" class="mr-5" />
          <span>Kiến thức chất lượng khác</span>
        </h2>
      </div>
      <div class="card-learning">
        <v-container>
          <v-row no-gutters>
            <v-col v-for="i in dataCourse" :key="n" cols="12" sm="4">
              <router-link :to="`/course/${i.course_uid}`">
                <v-card max-width="344" hover class="mb-5">
                 
                     <v-card-item>
                    <v-img
                      class="image-banner"
                      :src="i.image_url"
                      cover
                    ></v-img>
                    <div class="title-card">
                      <v-card-title>{{ i.name_course }}</v-card-title>
                      <div class="tag-subtitle">
                        <v-card-subtitle>
                          <v-avatar color="surface-variant">
                            <v-img :src="i.avatar_img" cover></v-img>
                          </v-avatar>
                          {{ i.full_name }}
                        </v-card-subtitle>
                        <div class="tag">
                          <v-img
                            v-if="true"
                            src="https://kt.city/_next/image?url=%2Fstatic%2Flabel-new.png&w=128&q=75"
                            cover
                            max-width="120"
                          ></v-img>
                          <v-img
                            v-if="false"
                            src="https://kt.city/_next/image?url=%2Fstatic%2Flabel-trending.png&w=128&q=75"
                            cover
                            max-width="120"
                          ></v-img>
                        </div>
                      </div>
                    </div>
                  </v-card-item>
                 
                 
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "@/supabase/supabase";
import { onMounted, ref } from "vue";
const dataCourse = ref([]);
onMounted(async () => {
  const { data, error } = await supabase.from("courselearning").select("*");
  dataCourse.value = data;
  console.log(data);
  if (error) {
    console.log(error.message);
  }
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");
.text {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  color: #273167;
}
.main-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
.content-main {
  width: 1100px;
 
}
.v-card-item {
  padding: 0;
}
.v-card-item {
  padding: 0;
}
.title-card {
  width: 100%;
  padding: 15px 15px;
}
.v-card-title {
  width: 100%;
  display: inline-block;
  white-space: normal;
}
.tag {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
}
.tag-subtitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-container {
  padding: 0;
}
.image-banner {
  width: 346.66px;
  height: 180px;
}
.v-card-title {
  height: 96px;
}
.v-card{
  border-radius: 10px;
}
a{
  text-decoration: none;
}
</style>
