<template>
  <div class="header">
    <Header></Header>
    <Banner></Banner>
    <div class="padding-content">
      <advertise></advertise>
    </div>
    <div class="margin-content">
      <media></media>
    </div>

    <MainContent class="my-10"></MainContent>

    <PopularBlog class="test"></PopularBlog>

    <footerWeb class="mt-10"></footerWeb>
    <div class="notify-containt rotate-bl" v-if="notify">
      <NotifyRealtime class="main-notify" :data="userCourse"></NotifyRealtime>
    </div>
  </div>
</template>
<script setup>
import PopularBlog from "@/components/UserView/Content/PopularBlog.vue";
import Header from "@/components/UserView/Header/Header.vue";
import Banner from "./Banner/Banner.vue";
import advertise from "./Content/advertise.vue";
import media from "./Content/media.vue";
import MainContent from "./Content/MainContent.vue";
import footerWeb from "@/components/UserView/footer/footer.vue";
import NotifyRealtime from "@/components/UserView/realtime/NotifyRealtime.vue";
import { onMounted, ref } from "vue";
import { supabase } from "@/supabase/supabase";
const notify = ref(false);
const userCourse = ref({});
import { useRoute } from "vue-router";
onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: session, error } = await supabase.auth.getSession();
  console.log(session);
  if (user.app_metadata.provider === "google") {
    const dateLogin = new Date();
    const { error } = await supabase.from("User").upsert({
      user_id: user.id,
      name: user.user_metadata.full_name,
      create_at: dateLogin,
      update_at: dateLogin,
    });
    if (error) {
      console.log(error);
    }
  }
});
function nodisplay() {
  notify.value = false;
}
supabase
  .channel("RegisterCourse")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "RegisterCourse" },
    async (payload) => {
      console.log(payload);
      const { data: registerCourse } = await supabase
        .from("RegisterCourse")
        .select(
          `
      User(name),
      Course(classify)
    `
        )
        .eq("user_id", payload.new.user_id);
      userCourse.value = registerCourse[0];
      notify.value = true;
      setTimeout(nodisplay, 3500);
    }
  )
  .subscribe();
</script>
<style scoped>
.padding-content {
  width: 100%;
  padding-top: 75px;
  padding-bottom: 40px;
}
.margin-content {
  margin-bottom: 40px;
}
.footer {
  height: 200px;
}
.notify-containt {
  width: 100px;
  height: 200px;
  position: fixed;
  bottom: 5px;
  z-index: 1000;
}
.main-notify {
  width: 350px;
  height: 100%;
  margin-bottom: 10px;
}
.rotate-bl {
  animation: rotate-bl 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
@keyframes rotate-bl {
  0% {
    transform: rotate(0);
    transform-origin: bottom left;
  }
  100% {
    transform: rotate(360deg);
    transform-origin: bottom left;
  }
}
.test {
  /* min-height: 400px;
  padding: 20px; */
}
</style>
