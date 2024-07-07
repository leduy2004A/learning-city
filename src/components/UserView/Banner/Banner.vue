<template lang="">
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    :loop="true"
    class="mySwiper border"
  >
    <swiper-slide>
      <div class="contain-banner border">
        <div class="content-text">
          <h2>Học online mọi lúc mọi nơi</h2>
          <h4 class="sub-content">Dễ dàng học ở bất kì đâu chỉ cần chiếc laptop hoặc điện thoại</h4>
        </div>
        <img
          src="https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png"
          alt=""
          class="logo-image"
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="contain-banner border color-purble">
          <div class="content-text">
          <h2>Cập nhật nhanh chóng</h2>
          <h4 class="sub-content">Các bài học sẽ được cập nhật một cách nhanh chóng và đều đặn</h4>
        </div>
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6179d68d-393b-475c-b706-f210b6b4b336/d7u8qis-6819f50c-005a-486e-88d1-8d7c8eec8983.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYxNzlkNjhkLTM5M2ItNDc1Yy1iNzA2LWYyMTBiNmI0YjMzNlwvZDd1OHFpcy02ODE5ZjUwYy0wMDVhLTQ4NmUtODhkMS04ZDdjOGVlYzg5ODMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Smb_HGdrXPQmrS46Vvw9JYLCT-mubC58IhshqCTzlOg"
          alt=""
          class="logo-image"
        />
      </div>
    
   
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>
<style scoped>
.logo-image {
  width: 100%;
}
.contain-banner {
  font-size: 20px;
  padding:20px 20px;
  display: flex;
  height: 270px;
  background-color: #018ffe;
}
.content-text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  font-weight: 300;
  width: 150%;
  margin-left: 30px;
}
/* .contain-banner- {
  font-size: 20px;
  padding:20px 20px;
  display: flex;
  padding:20px 20px;
  height: 270px;
  background-color: #755cfa;
} */
.border {
  border-radius: 20px;
}
.sub-content{
  font-weight: 100
}
.color-purble{
  background-color: #755CFA !important; 
}
</style>
