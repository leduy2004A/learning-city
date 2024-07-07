<template>
  <div class="blog">
    <ReactBlog></ReactBlog>
    <div class="blog-content">
      <div class="heading">
        <h1 class="blog-heading">{{ content.topic }}</h1>
      </div>
      <div class="user-post">
        <div class="avatar mb-5">
          <v-avatar class="mr-3">
            <v-img :src="content.User.user_image" cover></v-img>
          </v-avatar>
        </div>
        <div class="infor">
          <div class="name">
            <span class="name-post">{{ content.User.name }}</span>
          </div>
          <div class="date-post">
            {{ getTime(content.created_at) }}
          </div>
        </div>
      </div>
      <div class="main-content">
        <MdPreview :editorId="id" :modelValue="content.content" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { supabase } from "@/supabase/supabase";
import ReactBlog from "@/components/UserView/Blog/ReactBlog.vue"
const id = "preview-only";
const text = ref("# Hello Editor");
const content = ref("");
const route = useRoute();
console.log(route.params.blog_id);
const { data, error } = await supabase
  .from("Blog")
  .select(
    `
  topic,
  content,
  sub_content,
  created_at,
  User(*)
`
  )
  .eq("id", route.params.blog_id);
console.log(data);
content.value = data[0];

function getTime(time) {
  const date = new Date(time);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
</script>
<style scoped>
.blog {
  width: 100%;
  display: flex;
  justify-content: center;
}
.blog-content {
  width: 1000px;
}
.user-post {
  display: flex;
  align-items: center;
}
.name-post {
  font-size: 20px;
  font-weight: 500;
}
.date-post {
  font-weight: 200;
}
.heading {
  text-align: center;
}
.comment-heart {
  width: 24%;
  margin-right: 20px;
}

</style>
