<template>
  <div class="content-learning">
    <h3 class="study-title mb-10">Nội dung học tập</h3>
    <div class="category" v-for="item in dataContent">
      <h4 class="study-lecture__title">
        {{ item.name_topic }}
      </h4>
      <ul>
        <li
          class="study-lesson d-flex justify-space-between align-center"
          v-for="i in item.video_name"
        >
          <div class="title-lesson d-flex align-center">
            <font-awesome-icon
              :icon="['fas', 'circle-play']"
              class="mr-2 icon-play"
            />
            <span
              ><p>{{ i }}</p></span
            >
          </div>
          <!-- <time class="mlauto">05:30</time> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "@/supabase/supabase";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
let dataContent = ref({});


onMounted(async () => {
  const { data, error } = await supabase
    .rpc("gettopicfollowcourse",{course:route.params.id})
    .select("*")

  console.log(data)
  dataContent.value = data
  if(error)
  {
    console.log(error.message)
  }
});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");
.study-title {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  color: rgb(63, 63, 122);
}
.study-lecture__title {
  height: 54px;
  width: 100%;
  background-color: #dfe8f6;
  padding: 12px 28px;
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: rgb(63, 63, 122);
}
ul {
  list-style: none;
}
.icon-play {
  font-size: 25px;
}
p {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: rgb(84, 84, 84);
}
li {
  padding: 20px 20px;
  border-bottom: 1px solid rgb(84, 84, 84);
}
.mlauto {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: rgb(84, 84, 84);
}
</style>
