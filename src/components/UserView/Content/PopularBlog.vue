<template>
  <div class="popular-blog">
    <div class="blog">
      <div class="heading">
        <span class="text">
          <font-awesome-icon :icon="['fas', 'pen']" />
          Các bài viết nổi bật</span
        >
      </div>
      <div class="content">
        <v-container class="mb-6">
          <v-row>
            <v-col v-for="n in content" :key="n" cols="3">
              <div class="pa-2 ma-2">
                <v-skeleton-loader   :loading="loader"
                width="100%"
                height="300"
                type="image, list-item-two-line"
                color="#EAF3FA"
                ><router-link :to='`Blog/${n.id}`' >
                  <CardBlog :dataBlog="n" class="card-blog"></CardBlog>
                </router-link>
                  
                </v-skeleton-loader>
                
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "@/supabase/supabase";
import CardBlog from "@/components/UserView/Blog/CardBlog.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import emailjs from "@emailjs/browser";
import { genarateNumber } from "@/components/ultil/genarateRandom";
import {sendMailWithCodeCourse} from "@/components/ultil/sendEmail"
const content = ref([]);
const loader = ref(true);
const { data, error } = await supabase.from("Blog").select(`
id,
  topic,
  content,
  sub_content,
  created_at,
  image_blog,
  User(*)
`);
setTimeout(()=>{
  loader.value = false
},1000)
content.value = data;


async function checkSendCode() {
  const { data: course, error: loi } = await supabase
    .from("Payment")
    .select("course_id,user_id")
    .eq("code_order", route.query.orderCode);
  console.log(course[0].course_id);
  const data = await supabase
    .from("CodeCourse")
    .insert({ 
      user_id:course[0].user_id,
      course_id:course[0].course_id,
      code: genarateNumber(7) 
    })
    .eq("course_id", course[0].course_id).eq("user_id",course[0].user_id);
  if (data.error) {
    console.log(data.error.message);
  } else {
    const getCode = await supabase
      .from("CodeCourse")
      .select("code")
      .eq("course_id", course[0].course_id).eq("user_id",course[0].user_id)
    const { data: user } = await supabase.auth.getUser();
    if (user.user !== null) {
      sendMailWithCodeCourse( user.user.user_metadata.full_name,getCode.data[0].code,user.user.email).then(()=>{
        window.location.href = "http://localhost:3000/"
      })
        
    }
  }
}
const route = useRoute();
if (route.query.status === "PAID") {
  const { error } = await supabase
    .from("Payment")
    .update({
      status: "PAID",
    })
    .eq("code_order", route.query.orderCode);
  if (!error) {
    console.log("Thành công");
    await checkSendCode()
    
    
    
  }
}
</script>
<style scoped>
.popular-blog {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #eaf3fa;
  border-radius: 10px;
  padding: 23px 0;
  min-height: 200px;
}
.blog {
  width: 1100px;
  min-height: 200px;
  background-color: #eaf3fa;
}

.text {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  color: #273167;
}
.v-container {
  padding: 0 0;
}
.content {
}
.v-col-3 {
  padding: 0;
}
.card-blog{
  width: 100%;
}
a{
  text-decoration: none
}
</style>
