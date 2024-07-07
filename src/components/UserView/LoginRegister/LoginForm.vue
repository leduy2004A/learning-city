<template>
  <div class="login-form">
    <v-text-field
      prepend-inner-icon="mdi-email"
      label="Email của bạn"
      v-model="userLogin.email"
    ></v-text-field>
    <v-text-field
      prepend-inner-icon="mdi-eye"
      label="Mật khấu"
      type="password"
      v-model="userLogin.password"
    ></v-text-field>
    <button class="social-item mb-2" @click="loginFunction()">
      <span>Đăng nhập vào Dcity</span>
    </button>
  </div>
</template>
<script setup>
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { reactive } from 'vue';
import { supabase } from '@/supabase/supabase';
async function signOut(){
  
const { error } = await supabase.auth.signOut();
}
async function getLogin(){
  
const { data: { user } } = await supabase.auth.getUser()
console.log(user)
}
const userLogin = reactive({
  email:"",
  password:""
})
async function loginFunction(){
  var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });
const { data, error } = await supabase.auth.signInWithPassword({
  email: userLogin.email,
  password: userLogin.password,
})
if(error)
{
  notyf.error("Tài khoản không tồn tại")
}
else{
  notyf.success("Đăng nhập thành công")
  setTimeout(()=>{
    window.location.href = "http://localhost:3000/"
  },2000)
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
}</style>
