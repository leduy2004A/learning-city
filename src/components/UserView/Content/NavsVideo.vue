<template>
  <div class="navs-video">
    <div class="header-nav">
      <h2 class="title-nav">Nội dung bài học</h2>
    </div>
    <div class="menu">
        <a-collapse v-model:activeKey="activeKey" >
          <a-collapse-panel :key="index" :header="item.name_topic" v-for="(item,index) in dataContent">
            <div v-for="i in item.video">
               <div class="video_name" @click="watchVideo({video_url: i.video_url,video_name:i.video_name})">{{ i.video_name }}</div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
  </div>
</template>
<script setup>
import { supabase } from '@/supabase/supabase';
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useEmitter from '@/components/useEmitter';
const route = useRoute()
const emitter = useEmitter()
  let dataContent = ref({});
async function watchVideo(url){
  emitter.emit("url-data", url);
  
}
onMounted(async () => {
  const { data, error } = await supabase
    .rpc("getlessonfollowcourse",{course:route.params.course})
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
.navs-video {
  width: 420px;
   
}
.header-nav {
  width: 100%;
  padding: 20px 30px;
  margin-bottom:9px ;
}
.title-nav {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  color: #273167;
}
.video_name{
  height: 60px;
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
}
.ant-collapse-content-box{
  cursor: pointer;
}
.video_name{
  cursor: pointer;
}
.menu{
  overflow:auto;
  height:700px;
}
</style>
