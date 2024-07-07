<template>
  <div class="login-register">
    <div class="content-login-register">
      <div class="content-main">
        <img
          src="https://kt.city/static/ktcity-logo.png"
          alt=""
          class="img-login"
        />
        <h2 class="title-header my-3">Gia nhập DCity</h2>
        <p class="title mb-2">
          Học tập, kết nối, thảo luận & xây dựng thương hiệu cá nhân cùng hơn
          100.000 thành viên khác
        </p>
        <p class="login-with-title mb-2">Đăng nhập bằng</p>
        <button class="social-item mb-2" @click="loginWithGoogle()">
          <img
            src="https://kt.city/static/icon-social-google.svg"
            alt=""
            class="social-item-icon mr-2"
          />
          <span>Google</span>
        </button>
        <p class="login-with-title mb-2">Hoặc</p>
        <div class="tab">
          <a-tabs v-model:activeKey="activeKey" size="large">
            <a-tab-pane key="1" tab="Đăng nhập">
                <LoginForm></LoginForm>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Đăng kí">
                <RegisterForm></RegisterForm>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import LoginForm from '@/components/UserView/LoginRegister/LoginForm.vue'
import RegisterForm from '@/components/UserView/LoginRegister/RegisterForm.vue'
import { supabase } from '@/supabase/supabase';
async function loginWithGoogle(){
  const {data,error} = await supabase.auth.signInWithOAuth({
  provider:'google'
})
if(error)
{
  console.log(error.message)
}
else{
  console.log(data)
}
}
</script>
<style scoped>
.social-item {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #2979ff;
  border-radius: 20px;
}
.login-with-title {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: rgb(141, 141, 141);
}
.title-header {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  color: rgb(63, 63, 122);
}
.title {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: rgb(63, 63, 122);
}
.img-login {
  width: 100px;
}
.content-login-register {
  padding: 40px 50px;
  width: 504px;
  min-height: 600px;
  background-color: white;
  border-radius: 20px;
}
.login-register {
    padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
  background: linear-gradient(270deg, #1fc197, #c38561);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 5s ease infinite;
  -moz-animation: AnimationName 5s ease infinite;
  -o-animation: AnimationName 5s ease infinite;
  animation: AnimationName 5s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
