<template>
  <div class="comment-contain" v-for="(item, index) in test" :key="index">
    <div class="content-comment">
      <div class="name-time mb-5">
        <div class="name">
          <v-avatar color="surface-variant" class="mr-3">
            <v-img :src="item.comment.User.user_image" cover></v-img>
          </v-avatar>
          <span>
            <strong>{{ item.comment.User.name }}</strong>
          </span>
        </div>
        <div class="time ml-2">
          <p>{{ getDate(item.comment.created_at) }}</p>
        </div>
      </div>
      <div class="comment-text">
        <p>
          {{ item.comment.comment }}
        </p>
      </div>
      <div class="react">
        <v-btn flat color="primary" class="mt-2" @click="clickOpen(index)"
          >Phản hồi</v-btn
        >
      </div>

      <div class="text-response" v-if="openRespone(index)">
        <textarea
          rows="4"
          cols="100"
          class="comment"
          v-model="content_recoment"
        ></textarea>
        <div class="button-recomment mt-3">
          <v-btn color="primary" @click="cancelOpen()" class="mr-3">Huỷ</v-btn>
          <v-btn
            color="primary"
            @click="postReComment(item.comment.id, item.comment.User.name)"
            >Bình luận</v-btn
          >
        </div>
      </div>
    </div>
    <div
      class="sub-comment"
      v-if="item.response"
      v-for="(i, order) in item.recoment.recomment"
      :key="order"
    >
      <div class="name-time mb-5">
        <div class="name">
          <v-avatar color="surface-variant" class="mr-3">
            <v-img :src="i.image_user" cover></v-img>
          </v-avatar>
          <span>
            <strong>{{ i.name_user }}</strong>
          </span>
        </div>
        <div class="time ml-2">
          <p>{{ getDate(i.create_at) }}</p>
        </div>
      </div>
      <div class="comment-text">
        <p>
          <strong>{{ i.tag }}</strong> {{ i.content_comment }}
        </p>
      </div>
      <div class="react">
        <v-btn flat @click="clickOpenSubcomment(order, index)" class="mt-3"
          >Phản hồi</v-btn
        >
      </div>
      <div class="text-response" v-if="openSubcomment(order, index)">
        <textarea
          rows="4"
          cols="100"
          class="comment"
          v-model="content_rerecomment"
        ></textarea>
        <div class="button-recomment mt-3">
          <v-btn color="primary" class="mr-3" @click="cancelRerecoment()"
            >Huỷ</v-btn
          >
          <v-btn
            color="primary"
            @click="postRerecomment(item.comment.id, i.name_user)"
            >Bình luận</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "@/supabase/supabase";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getDate } from "@/components/ultil/getDate";
import { checkUserLogin } from "@/components/ultil/checkUserLogin";
const route = useRoute();
const listComment = ref([]);
const test = ref([]);
const index = ref(-1);
const indexMaincomment = ref(-1);
const orderSubcomment = ref(-1);
let content_recoment = "";
let content_rerecomment = "";
onMounted(async () => {
  let array_comment = [];
  const { data } = await supabase
    .from("CommentBlog")
    .select(`comment,User(name,user_image),created_at,id`)
    .order("created_at", { ascending: true })
    .eq("blog_id", route.params.blog_id);
  listComment.value = data;
  console.log(data);
  const { data: recoment_data } = await supabase.from("recomment").select();

  let main_comment = [];
  for (let i of data) {
    let found = false;
    for (let j of recoment_data) {
      if (i.id === j.comment_blog_id) {
        array_comment.push({ recoment: j, comment: i, response: true });
        found = true;
        break;
      }
    }
    if (!found) {
      main_comment.push({ comment: i, recoment: {}, response: false });
    }
  }

  array_comment.push(...main_comment);
  test.value = array_comment;
});
supabase
  .channel("CommentBlog")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "CommentBlog" },
    async () => {
      let array_comment = [];
      const { data } = await supabase
        .from("CommentBlog")
        .select(`comment,User(name,user_image),created_at,id`)
        .order("created_at", { ascending: true })
        .eq("blog_id", route.params.blog_id);
      listComment.value = data;
      console.log(data);
      const { data: recoment_data } = await supabase.from("recomment").select();
      console.log(recoment_data);

      let main_comment = [];
      for (let i of data) {
        let found = false;
        for (let j of recoment_data) {
          if (i.id === j.comment_blog_id) {
            array_comment.push({ recoment: j, comment: i, response: true });
            found = true;
            break;
          }
        }
        if (!found) {
          main_comment.push({ comment: i, recoment: {}, response: false });
        }
      }

      array_comment.push(...main_comment);

      test.value = [];

      test.value = array_comment;
    }
  )
  .subscribe();

supabase
  .channel("RecommentBlog")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "RecommentBlog" },
    async () => {
      let array_comment = [];
      const { data } = await supabase
        .from("CommentBlog")
        .select(`comment,User(name,user_image),created_at,id`)
        .order("created_at", { ascending: true })
        .eq("blog_id", route.params.blog_id);
      listComment.value = data;
      console.log(data);
      const { data: recoment_data } = await supabase.from("recomment").select();
      console.log(recoment_data);

      let main_comment = [];
      for (let i of data) {
        let found = false;
        for (let j of recoment_data) {
          if (i.id === j.comment_blog_id) {
            array_comment.push({ recoment: j, comment: i, response: true });
            found = true;
            break;
          }
        }
        if (!found) {
          main_comment.push({ comment: i, recoment: {}, response: false });
        }
      }

      array_comment.push(...main_comment);

      test.value = [];

      test.value = array_comment;
    }
  )
  .subscribe();

function openRespone(i) {
  if (index.value === i) {
    return true;
  }
  return false;
}
function clickOpen(d) {
  index.value = d;
}
function cancelOpen() {
  index.value = -1;
}
async function postReComment(id, name_user) {
  const result = await checkUserLogin();
  if (result !== false) {
    const { data } = await supabase.auth.getUser();
    await supabase.from("RecommentBlog").insert({
      comment_blog_id: id,
      user_id: data.user.id,
      content_comment: content_recoment,
      tag: "@" + name_user,
    });
  }
}
function openSubcomment(i, index) {
  if (indexMaincomment.value === index && orderSubcomment.value === i) {
    return true;
  } else {
    return false;
  }
}
function clickOpenSubcomment(o, i) {
  orderSubcomment.value = o;
  indexMaincomment.value = i;
}
async function postRerecomment(comment_id, user_recomment) {
  const result = await checkUserLogin();
  if (result !== false) {
    const { data } = await supabase.auth.getUser();
    await supabase.from("RecommentBlog").insert({
      comment_blog_id: comment_id,
      user_id: data.user.id,
      content_comment: content_rerecomment,
      tag: "@" + user_recomment,
    });
  }
}
function cancelRerecoment() {
  orderSubcomment.value = -1;
  indexMaincomment.value = -1;
}
</script>
<style scoped>
.name-time {
  display: flex;
  align-items: center;
}
.content-comment {
  padding: 10px 0;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}
.comment-text {
  height: 20px;
  align-items: center;
}
.send {
  height: 100%;
  margin-left: 20px;
}
.comment-main {
  height: 100%;
}
.button-load {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sub-comment {
  margin-left: 30px;
}
.comment {
  border: 1px solid black;
}
.text-response {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}
.button-recomment {
  align-self: flex-end;
}
.name {
  display: flex;
  align-items: center;
}
.comment-text {
  font-size: 16px;
}
</style>
