<template>
  <div class="main-video">
    <div class="header-video">
      <img
        :src="sublogo"
        alt=""
        class="img-header"
      />
      <div class="icon-back">
        <font-awesome-icon :icon="['fas', 'shapes']" class="mr-2 icon-shape" />
        <router-link to="/">
          <span>Trở về dashboard</span>
        </router-link>
        
      </div>
    </div>
    <div class="content-video">

      <iframe width="640" height="360" :src="linkVideo.video_url" frameborder="0" scrolling="0" allowfullscreen class="video-main"></iframe>
      <!-- <iframe width="560" height="211" src="https://helvid.net/play/index/109375b60442" allow="autoplay" allowfullscreen class="video-main"></iframe> -->
      <div class="title-video">
        <h2 class="title my-10">
            <font-awesome-icon :icon="['fas', 'circle-play']" class="mr-2"/>
            <span>{{ linkVideo.video_name }}</span>
        </h2>
      </div>
    </div>
  </div>
</template>
<script setup>
import useEmitter from '@/components/useEmitter';
import sublogo from '@/assets/images/sublogo.png'
import { ref } from 'vue';
const emitter = useEmitter()
import { onMounted } from 'vue';
const linkVideo = ref("")
onMounted(()=>{
  emitter.on("url-data",data =>{
    linkVideo.value = data
  })
})
</script>
<style scoped>
.main-video {
}
.header-video {
  padding: 20px 100px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-header {
  width: 101px;
}
.icon-shape {
  color: #2979ff;
}
.content-video {
  width: 100%;
  height: 100%;
  background-image: url("https://kt.city/static/img-lesson-bg.png");
  padding: 45px 50px;
}
.video-main {
  height: 512.1px;
  width: 910.4px;
}
.title{
    font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  color: #273167;
}
span{
  cursor: pointer;
}
a{
  text-decoration: none;
  color: #273167;
}
</style>
