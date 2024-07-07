<template>
  <a-modal :open="open" title="Bình luận" @ok="handleOk" class="modal" @cancel="handleCancel" width="1000px" :mask="true" :maskClosable="true" :bodyStyle="style" :closable="false" :footer="null">
    <textarea rows="4" cols="50" class="comment" v-model="text_comment">
</textarea
    >
    <v-btn color="primary" @click="postComment()">Bình luận</v-btn>
    <div class="comment-content">
        <CardComment></CardComment>
    </div>
  </a-modal>
</template>
<script setup>
import { supabase } from '@/supabase/supabase';
import { useRoute } from 'vue-router';
import CardComment from '@/components/UserView/Blog/CardComment.vue'
import { ref } from 'vue';
import useEmitter from '@/components/useEmitter';
import { checkUserLogin } from '@/components/ultil/checkUserLogin';
const emitter = useEmitter()
let text_comment = ""
const open = ref(false)
const {data} = await supabase.auth.getUser();
const route = useRoute()
const props = defineProps({
    openModal:Boolean
})
open.value = props.openModal
console.log(props.openModal + "Duy nè")
const style = {
    "overflow-y":"auto",
    "height":"450px"
}
async function postComment(){
 const result = await checkUserLogin()
 if(result !== false)
 {
       await supabase.from("CommentBlog").insert({
        user_id:data.user.id,
        blog_id:route.params.blog_id,
        comment:text_comment
    })
 }

}
const handleOk = e => {
  console.log(e);
  open.value = false;
};
const handleCancel = e => {
  open.value = false;
  emitter.emit("toggle-modal",false)
};
</script>
<style scoped>
.comment{
    width: 100%;
    border: 1px solid black;
}
.ant-modal-content{
    height: 300px !important;
    width: 800px !important;
    
}
</style>
