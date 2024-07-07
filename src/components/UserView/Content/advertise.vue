<template>
  <div class="advertise">
    <div class="content-main">
      <h2 class="text">
        Học tập xu hướng MMO, kinh doanh, tiếp thị số mới và nổi bật 2024
      </h2>
      <div class="card-content">
        <swiper
          :slidesPerView="1"
          :spaceBetween="10"
          :navigation="true"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false,
          }"
          :loop="true"
          :pagination="{
            clickable: true,
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '768': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="item in dataAuthor">
            <v-card class="mx-auto height-card" max-width="255" hover>
              <v-skeleton-loader
                :loading="loader"
                width="150"
                height="240"
                type="image, list-item-two-line"
              >
                <v-card-item>
                  <div class="avatar-contain">
                    <v-avatar color="surface-variant" size="150" class="avatar">
                      <v-img
                        aspect-ratio="16/9"
                        cover
                        :src="item.avatar_img"
                      ></v-img>
                    </v-avatar>
                  </div>
                  <div class="text-ad">
                    <v-card-subtitle>
                      Học {{ item.expert }} từ
                    </v-card-subtitle>
                    <v-card-title> {{ item.full_name }} </v-card-title>
                  </div>
                </v-card-item>
              </v-skeleton-loader>
            </v-card>
          </swiper-slide>
        </swiper>
      </div>
      <div class="">
        <p class="end">
          Và nhiều expert hàng đầu khác, luôn cập nhật nội dung hàng tháng
        </p>
        <v-divider class="border-opacity-75" color="info"></v-divider>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthorStore } from "@/stores/Author";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { supabase } from "@/supabase/supabase";
import { Suspense, onMounted, ref } from "vue";
const modules = [Pagination, Navigation, Autoplay];
const dataAuthor = ref([{},{},{},{},{}]);
const loader = ref(true);
onMounted(() => {
    supabase.from("Author").select().then(({data,error}) =>{
    setTimeout(()=>{
      dataAuthor.value = data;
      loader.value = false;
    },1000)
    
    console.log(dataAuthor.value);
  })

});
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");
.text {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  color: #273167;
  text-align: center;
  margin: 0 192.5px;
  margin-bottom: 60px;
}
.advertise {
  width: 100%;
  display: flex;
  justify-content: center;
}
.text-content {
  width: 100%;
  margin: 0 192.5px;
}
.content-main {
  width: 1100px;
  height: 579.8px;
}
.logo-image {
  width: 100%;
}
.height-card {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 310px;
}
.avatar-contain {
  width: 100%;
  display: flex;
  justify-content: center;
}
.avatar {
  margin-bottom: 31px;
}
.text-ad {
  text-align: center;
}
.mySwiper {
  height: 350px;
}
.end {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-size: 20px;
  padding-bottom: 15px;
  text-align: center;
}
</style>
