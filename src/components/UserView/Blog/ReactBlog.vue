<template>
  <div class="comment-heart">
    <div class="header-comment">{{ name_topic }}</div>
    <div class="react">
      <div class="heart mr-4">
        <font-awesome-icon
          :icon="['fa', 'heart']"
          @click="likeBlog()"
          v-if="like"
          class="icon"
        />
        <font-awesome-icon
          :icon="['fas', 'heart']"
          style="color: #63e6be"
          @click="unlikeBlog()"
          class="icon"
          v-else
        />
        {{ countLike }}
      </div>
      <div class="comment">
        <font-awesome-icon :icon="['fas', 'comment']" class="icon" @click="openComment()"/>
        {{ countAllComment }}
      </div>
    </div>

    <ModalComment :openModal="openModal" v-if="openModal"></ModalComment>
  </div>
  
</template>
<script setup>
import { checkUserLogin } from "@/components/ultil/checkUserLogin";
import { supabase } from "@/supabase/supabase";
import { ref,onMounted } from "vue";
import { useRoute } from "vue-router";
import ModalComment from "@/components/UserView/Blog/ModalComment.vue"
import useEmitter from "@/components/useEmitter";
const emitter = useEmitter()
let countLike = ref(0);
const route = useRoute();
const like = ref(true);
const openModal = ref(false);
const name_topic = ref("")
let countRecommentMain = 0
let countAllComment = ref(0)
onMounted(async ()=>{
  emitter.on("toggle-modal",data =>{
    openModal.value = data
  })
})
  const {data:dataNameBlog} = await supabase.from("Blog").select("topic").eq("id",route.params.blog_id)
  name_topic.value = dataNameBlog[0].topic
 const {data:dataComment,count:countComment} = await supabase.from("CommentBlog").select("*",{count:"exact"}).eq("blog_id",route.params.blog_id)
  for(let i of dataComment)
  {
    const {count:countRecomment} = await supabase.from("RecommentBlog").select("*",{count:"exact"}).eq("comment_blog_id",i.id)
    countRecommentMain += countRecomment
  }
  
  countAllComment.value = countRecommentMain + countComment
const { data } = await supabase.auth.getUser();
const { count } = await supabase
  .from("LikeBlog")
  .select("*", { count: "exact" })
  .eq("blog_id", route.params.blog_id);
countLike.value = count;
if(data.user !== null)
{
  const { data: LikeBlog } = await supabase
  .from("LikeBlog")
  .select()
  .eq("user_id", data.user.id)
  .eq("blog_id", route.params.blog_id);
if (LikeBlog.length === 0) {
  like.value = true;
} else {
  like.value = false;
}
}

async function likeBlog() {
  if ((await checkUserLogin()) === false) {
    return;
  } else {
    if (data.user !== null) {
      supabase
        .from("LikeBlog")
        .insert({
          user_id: data.user.id,
          blog_id: route.params.blog_id,
        })
        .then(async () => {
          like.value = false;
          const { count } = await supabase
            .from("LikeBlog")
            .select("*", { count: "exact" })
            .eq("blog_id", route.params.blog_id);
          countLike.value = count;
        });
    }
  }
}
function unlikeBlog() {
  supabase
    .from("LikeBlog")
    .delete()
    .eq("user_id", data.user.id)
    .eq("blog_id", route.params.blog_id)
    .then(async () => {
      like.value = true;
      const { count } = await supabase
        .from("LikeBlog")
        .select("*", { count: "exact" })
        .eq("blog_id", route.params.blog_id);
      countLike.value = count;
    });
}
function openComment(){
      openModal.value  =true;
}

</script>
<style scoped>
.header-comment {
  border-bottom: 1px solid #e6e6e6;
  padding: 10px 0;
}
.react {
  margin-top: 10px;
  display: flex;
}
.icon {
  font-size: 25px;
  cursor: pointer;
}
</style>
