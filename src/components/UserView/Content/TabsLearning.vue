<template>
  <div class="tabs">
    <div class="content-main">
            <div class="content-tabs">
        <a-tabs v-model:activeKey="activeKey" centered size="large" class="size">
          
        <a-tab-pane key="1" tab="Bình luận">
          <Comment></Comment>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Nội dung học tập"
          ><ContentLearning></ContentLearning></a-tab-pane
        >
        </a-tabs>
      </div>
    </div>

    
  </div>
</template>
<script>
import Comment from '../Tabs/Comment.vue';
import ContentLearning from '../Tabs/ContentLearning.vue';
export default {
  components:{
    Comment,
    ContentLearning
  }
};
</script>
<style scoped>
.content-main{
  background-color: #ffffff;
  width: 100%;
  min-height: 500px;
  padding-bottom: 50px;
}
.content-tabs{
  max-width: 1140px;
  min-height: 500px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #ffffff;
}

</style>
