<template>
  <div class="my-blog">
    <div class="header">
      <Header></Header>
    </div>
    <div class="main-content py-10">
      
      <div class="main-blog">
        <v-container class="mb-6">
          <h2>Bài Viết Của Tôi</h2>
          <v-row>
            <v-col v-for="n in dataBlog" :key="n" cols="3">
              <div class="pa-2 ma-2">
                <v-skeleton-loader
                  :loading="loader"
                  width="100%"
                  height="300"
                  type="image, list-item-two-line"
                  color="#EAF3FA"
                >
                  <CardBlog
                    :dataBlog="n"
                    class="card-blog"
                    @click="optionCard(n.id)"
                  ></CardBlog>
                </v-skeleton-loader>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div class="footer">
      <footerWeb></footerWeb>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "@/supabase/supabase";
import Header from "../Header/Header.vue";
import footerWeb from "../footer/footer.vue";
import CardBlog from "./CardBlog.vue";
import Swal from "sweetalert2";
import router from "@/router/router";
import WriteBlog from "./WriteBlog.vue";
import {useBlogStore} from "@/stores/blog";
const useBlog = useBlogStore()
let dataBlog = "";
const { data: userLogin } = await supabase.auth.getUser();
const { data } = await supabase
  .from("Blog")
  .select("*")
  .eq("user_id", userLogin.user.id);
dataBlog = data;

function optionCard(id) {
  Swal.fire({
    title: "Lựa chọn của bạn?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Xoá bài viết",
    denyButtonText: `Chỉnh sửa bài viết`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await supabase.from("Blog").delete().eq("id", id);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đã xoá bài viết",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(()=>{
          window.location.reload();  
        },1501)
        
      }
    } else if (result.isDenied) {

      useBlog.getContentBlog(data)
      const dataBlog = useBlog.$state.dataBlog
        router.push({path:"/myBlog/"+id,state:dataBlog})
    }
  });
}
</script>
<style scoped>
.v-skeleton-loader {
  background-color: #f8f9ff !important;
}
.card-blog {
  width: 100%;
}
</style>
