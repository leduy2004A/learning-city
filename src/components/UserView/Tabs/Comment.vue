<template>
  <div class="comment">
    <div class="comment-text mb-10 d-flex" v-if="isRegister">
      <v-text-field
        class="comment-main"
        hide-details="auto"
        label="Bình luận về khoá học"
        v-model="contentComment"
      ></v-text-field>
      <v-btn class="send" color="primary" prepend-icon="mdi-bee" @click="send()"
        >Gửi</v-btn
      >
    </div>
    <div class="content-comment" v-for="item in dataComment">
      <div class="name-time mb-5">
        <div class="name">
          <v-avatar color="surface-variant" class="mr-3">
            <v-img :src="item.user_image" cover></v-img>
          </v-avatar>
          <span>
            <strong>{{ item.name }}</strong>
          </span>
        </div>
        <div class="time">
          <p>{{ getDate(item.created_at) }}</p>
        </div>
      </div>
      <div class="comment-text">
        <p>
          {{ item.content_comment }}
        </p>
      </div>
    </div>
    <div class="button-load mt-5" v-if="false">
      <v-btn class="text-center" color="primary" @click="loadComment()"
        >Xem thêm...</v-btn
      >
    </div>
  </div>
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import useEmitter from "@/components/useEmitter";
import { onMounted, ref, computed } from "vue";
import { supabase } from "@/supabase/supabase";
import { useRoute } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const emitter = useEmitter();
const isRegister = ref(true);
const contentComment = ref("");
const route = useRoute();
const dataComment = ref({});
let visibleComment = 4;
onMounted(() => {
  emitter.on("checkRegister", (value) => {
    isRegister.value = !value;
  });
});

const rules = computed(() => {
  return {
    contentComment: {
      required,
      minLength:minLength(10)
    },
  };
});
const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const v$ = useVuelidate(rules,{contentComment} );
async function send() {
  const result = await v$.value.$validate();
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    
    notyf.error("Comment ít nhất 10 ký tự nhé");
   
  } else {
    const { data: userLogin } = await supabase.auth.getUser();
    console.log(userLogin);
    const course_id = route.params.id;
    const { error } = await supabase.from("Comment").insert({
      user_id: userLogin.user.id,
      course_id: course_id,
      content_comment: contentComment.value,
    });
    if (!error) {
      contentComment.value = "";
      notyf.success("Đã đăng bình luận")
      getComment();
    } else {
      notyf.error("Bạn chưa đăng nhập")
      console.log(error.message);
    }
  }
}
function loadComment() {
  visibleComment += 3;

  const data = dataComment.value;
  console.log(data);
  dataComment.value = data.slice(0, visibleComment);
}
async function getComment() {
  const { data } = await supabase.rpc("getcommentcourse", {
    course: route.params.id,
  });
  dataComment.value = data;

  console.log(data);
}
supabase
  .channel("Comment")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "Comment" },
    (payload) => {
      getComment();
    }
  )
  .subscribe();
function getDate(date) {
  let dateObj = new Date(date);
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  return `${day}-${month}-${year}`;
}
getComment();
</script>
<style scoped>
.name-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-comment {
  padding: 10px 0;
  border-bottom: 1px solid black;
}
.comment-text {
  height: 55px;
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
</style>
