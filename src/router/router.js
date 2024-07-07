import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/components/UserView/MainWeb.vue";
import LearningView from "@/components/UserView/LearningWeb.vue";
import LearningVideo from "@/components/UserView/LearningVideo.vue";
import LoginAndRegister from "@/components/UserView/LoginAndRegister.vue";
import MainClass from "@/components/UserView/Class/MainClass.vue";
import WriteBlog from "@/components/UserView/Blog/WriteBlog.vue";
import ViewBlog from "@/components/UserView/Blog/MainBlog.vue";
import { supabase } from "@/supabase/supabase";
import MyBlog from "@/components/UserView/Blog/MyBlog.vue";
import MyProfile from "@/components/UserView/Profile/MyProfile.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/course/:id", component: LearningView },
  {
    path: "/lesson/:course",
    component: LearningVideo,
    meta: { checkUserRegister: true },
  },
  {
    path: "/myBlog",
    component: MyBlog,
  },
  {
    path: "/myBlog/:idblog",
    name:"myDetailBlog",
    component: WriteBlog,
  },
  { path: "/signin", component: LoginAndRegister },
  { path: "/myDuy", component: MainClass },
  { path: "/createBlog", component: WriteBlog },
  { path: "/Blog/:blog_id", component: ViewBlog },
  {path:"/profile",component:MyProfile}
  // { path: "/Admin", component: MainAdmin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 100 };
    }
  },
});
async function checkUserRegiter(params, next) {
  const { data: userData } = await supabase.auth.getUser();
  if (userData.user === null) {
    next("/");
  } else {
    const { data } = await supabase
      .from("RegisterCourse")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("course_id", params);
    if (data.length === 0) {
      next("/");
    } else {
      next();
    }
  }
}
router.beforeEach((to, from, next) => {
  if (to.meta.checkUserRegister) {
    checkUserRegiter(to.params.course, next);
  } else {
    next();
  }
});
export default router;
