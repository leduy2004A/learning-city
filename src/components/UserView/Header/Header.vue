<template>
  <div class="header">
    <div class="grid-contain">
      <v-container class="grid-item">
        <v-row no-gutters>
          <v-col cols="1" class="image-item">
            <div class="image-contain">
              <img :src="logoApp" alt="" class="logo-image" />
            </div>
          </v-col>
          <v-col cols="4" class="test">
            <div class="text-search">
              <div class="search-box">
                <input
                  type="text"
                  class="search"
                  placeholder="Tìm khoá học,expert..."
                  v-model="text_query"
                />
                <div
                  class="button-search"
                  @click="searchCourse()"
                  v-if="open_search === false"
                >
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </div>
                <div
                  class="button-search"
                  @click="closeCourse()"
                  v-if="open_search === true"
                >
                  <p class="pointer">x</p>
                </div>
              </div>
              <div class="result-search" v-if="open_search">
                <div class="main-result">
                  <div class="title-search">
                    <b>Khoá học</b>
                  </div>
                  <ul class="list-query">
                    <li v-for="n in result_query" class="item-qu">
                      <a :href="`/course/${n.id}`" @click="open_search = false">
                        <p>{{ n.name_course }}</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="7" class="function">
            <ul class="list-function">
              <li class="list-item">
                <router-link to="/createBlog" class="detail-list block-explore">
                  <img
                    src="https://kt.city/static/img-menu-square.png"
                    alt=""
                    class="logo-explore"
                  />
                  Viết Blog</router-link
                >
              </li>
              <li class="list-item">
                <a href="#" class="detail-list">Trò chuyện với City</a>
              </li>
              <li class="list-item">
                <router-link
                  :to="textRegister.route"
                  class="detail-list button-login"
                >
                  {{ textRegister.title }}
                </router-link>
              </li>
              <li class="list-item">
                <a href="#" class="detail-list">
                  <a-dropdown placement="bottom">
                    <img
                      :src="
                        user_image ||
                        `https://kt.city/static/avatar/avatar5.jpg`
                      "
                      alt=""
                      class="avatar"
                    />
                    <template #overlay v-if="isLogin">
                      <a-menu>
                        <a-menu-item @click="signOut()">
                          <p>Đăng Xuất</p>
                        </a-menu-item>
                        <router-link to="/profile">
                          <a-menu-item>
                            <p>Thông Tin Cá Nhân</p>
                          </a-menu-item>
                        </router-link>

                        <router-link to="/myBlog">
                          <a-menu-item>
                            <p>Bài Viết Của Tôi</p>
                          </a-menu-item>
                        </router-link>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </a>
              </li>
              <li class="list-item">
                <a href="#" class="detail-list">
                  <font-awesome-icon
                    :icon="['fas', 'bag-shopping']"
                    class="faShoping"
                  />
                </a>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "@/supabase/supabase";
import { onMounted, ref } from "vue";
import logoApp from "@/assets/images/sublogo.png";
let isLogin = ref(true);
const text_query = ref("");
const result_query = ref("");
const textRegister = ref({
  title: "Đăng nhập",
  route: "/signin",
});
const open_search = ref(false);
let user_image = "";
onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  const { data: user_info } = await supabase
    .from("User")
    .select("user_image")
    .eq("user_id", data.user.id);
  user_image = user_info[0].user_image;
  const result = await checkUserRegister();
  console.log(result);
  if (result) {
    textRegister.value = {
      title: "Khu vực học tập",
      route: "/myDuy",
    };
  } else {
    textRegister.value = {
      title: "Đăng nhập",
      route: "/signin",
    };
  }
});

async function checkUserRegister() {
  const { data } = await supabase.auth.getUser();
  if (data.user !== null) {
    return true;
  }
  isLogin.value = false;
  return false;
}
async function signOut() {
  const { error } = await supabase.auth.signOut();
  window.location.reload();
}

async function searchCourse() {
  open_search.value = true;
  const { data, error } = await supabase
    .from("Course")
    .select("*")
    .eq("view", true)
    .textSearch("name_course", text_query.value, {
      type: "websearch",
    });
  result_query.value = data;
}
function closeCourse() {
  open_search.value = false;
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");
.header {
  display: flex;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  height: 78px;
  background-color: #ffffff;
}
.test {
  width: 100%;
}
.grid-item {
  height: 100%;
  /* padding: 0 0; */
}
.logo-image {
  width: 120px;
  height: 100%;
}
.text-search {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  width: 322px;
  align-items: center;
}
.image-item {
  display: flex;
  align-items: center;
}
.image-contain {
  display: flex;
  align-items: center;
}
.test {
  display: flex;
  justify-content: end;
}
.search {
  padding: 10px 20px;
  width: 265px;
  border: 0.8px solid #dee1f3;
  height: 45px;
  border-radius: 50px 0 0 50px;
}
.search-box {
  display: flex;
  justify-items: flex-end;
}
.grid-contain {
  padding: 0 20px;
  margin: 0 80px;
  width: 100%;
}
.button-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 45px;
  background-color: #dee1f3;
  border-radius: 0 50px 50px 0;
}
.list-function {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
}
.list-function li {
  margin-left: 40px;
}
.list-function li a {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  text-decoration: none;
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #273167;
}
.logo-explore {
  width: 54px;
}
.block-explore {
  display: flex;
  align-items: center;
}
.button-login {
  padding: 7.5px 10px;
  border: 1px solid black;
  border-radius: 50px;
  color: #273167;
  border-color: #273167;
}
.function {
  display: flex;
  flex-wrap: nowrap;
}
.v-container {
  width: 100%;
  padding: 0;
  margin-right: 0;
  margin-left: 0;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.faShoping {
  font-size: 20px;
}
.text-search {
  position: relative;
}
.result-search {
  position: absolute;
  width: 100%;
  height: 200px;
  background-color: white;
  top: 70px;
  z-index: 10000;
  border-radius: 20px;
  padding: 30px 30px;
  overflow-y: auto;
}

.title-search {
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
ul {
  list-style: none;
}
.list-query li {
  padding: 10px 10px;
  cursor: pointer;
}
.list-query li:hover {
  background-color: #eaf3fa;
  padding: 10px 10px;
}
a {
  text-decoration: none;
}
.pointer {
  cursor: pointer;
}
</style>
