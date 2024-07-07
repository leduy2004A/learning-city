<template>
  <div v-if="isLoading" class="loading">
    <a-spin size="large"></a-spin>
  </div>
  <div class="view-learning" v-else>
    <div class="content-contain">
      <div class="page-contain">
        <h1 class="title mb-5">
          {{ allData.Course.name_course }}
        </h1>
        <div class="content">
          <div class="content-media">
            <div class="meta mb-5">
              <p class="meta-autho">Bởi:<strong>DuyDev</strong></p>
              <p class="meta-date">
                Cập nhật {{ getMonth(allData.Course.update_at) }}/{{
                  getYear(allData.Course.update_at)
                }}
              </p>
            </div>
            <div class="image-cover">
              <div class="image-main">
                <img :src="dataImage" alt="" class="image-display" />
                <div class="screen-image__cover"></div>
                <div class="list-image">
                  <div class="list-item" v-for="i in allData.Image">
                    <img
                      :src="i"
                      alt=""
                      class="item-image"
                      @click="changeImage(i)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-action">
            <RegisterLearning :money="priceCourse"></RegisterLearning>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import RegisterLearning from "@/components/UserView/Content/RegisterLearning.vue";
import { Suspense, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "@/supabase/supabase";
const route = useRoute();
const showLearningRegister = ref(false)
const dataCourseImage = ref([])
const allData = ref({});
// const listImage = []
const isLoading = ref(true);
const dataImage = ref("");
const images = [];
let priceCourse = {}
function changeImage(data) {
  dataImage.value = data;
}
async function fetchData() {
  try {
    const { data, error } = await supabase
      .from("ImageCourse")
      .select("*")
      .eq("CouseId", route.params.id);
    const course = await supabase
      .from("Course")
      .select("*")
      .eq("id", route.params.id);

    for (const imageCourse of data) {
      const image_url = await supabase
        .from("Image")
        .select("image_url")
        .eq("id", imageCourse.ImageId);
      images.push(image_url.data[0].image_url);
    }
    const { data: price, error: price_error } = await supabase.rpc(
      "getpricecourse",
      { course_id: route.params.id }
    );
    priceCourse = price[0]
    if (price_error) {
      console.log(price_error.message);
    }
    dataCourseImage.value.push(...course.data);

    allData.value = { Course: course.data[0], Image: images };
    dataImage.value = images[0];
    console.log(allData.value);
    if (error) {
      console.log(error);
    }
  } finally {
    setTimeout(()=>{
      isLoading.value = false;
    },1000)
    
  }
}
function getMonth(time) {
  const date = new Date(time);
  const month = date.getUTCMonth() + 1;
  return month;
}

function getYear(time) {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  return year;
}
onMounted(async () => {
  await fetchData();
});
setTimeout(()=>{
  showLearningRegister.value = true
},4000)

</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");
.content-contain {
  width: 100%;
  min-height: 729px;
  background-image: url("https://kt.city/static/lp-headerbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 4rem;
  padding-bottom: 12rem;
}
.loading{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 729px;
  width: 100%;
  overflow-y: hidden;
}
.page-contain {
  max-width: 1140px;
  height: 100%;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}
.title {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  color: white;
}
.content {
  display: flex;
  justify-content: space-between;
}
.content-media {
  width: 620px;
}
.meta-autho {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  color: rgb(10, 255, 240);
}
.meta {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.meta-date {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  color: white;
}
.image-main {
}
.image-display {
  width: 100%;
  height: 348px;
  object-fit: cover;
}
.screen-image__cover {
  width: 100%;
  height: 100%;
}
.list-image {
  display: flex;
  width: 100%;
  height: 100px;
  padding: 10px 10px;
  background-color: #494d96;
}
.item-image {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  border-radius: 10px;
  object-fit: cover;
}
.content-action {
  width: 400px;
  border-radius: 15px;
  background-color: #ffffff;
  padding: 20px 20px;
}
</style>
