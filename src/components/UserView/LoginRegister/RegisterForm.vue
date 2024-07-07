<template>
  <div class="register-form">
    <v-text-field
      prepend-inner-icon="mdi-account"
      label="Họ tên của bạn"
      v-model="user.name"
    ></v-text-field>
    <span v-if="v$.name.$error" style="color: red;">{{ v$.name.$errors[0].$message }}</span>
    <v-text-field
      prepend-inner-icon="mdi-email"
      label="Email của bạn"
      v-model="user.email"
    ></v-text-field>
    <span v-if="v$.email.$error" style="color: red;">{{ v$.email.$errors[0].$message }}</span>
    <v-text-field
      prepend-inner-icon="mdi-eye"
      label="Mật khấu"
      type="password"
      v-model="user.password"
    ></v-text-field>
    <span v-if="v$.password.$error" style="color: red;">{{ v$.password.$errors[0].$message }}</span>
    <v-text-field
      prepend-inner-icon="mdi-eye"
      label="Nhập lại mật khấu"
      type="password"
      v-model="user.repassword"
    ></v-text-field>
    <span v-if="v$.repassword.$error" style="color: red;">{{
      v$.repassword.$errors[0].$message
    }}</span>
    <button class="social-item mb-2" @click="registerFunction()">
      <span>Đăng nhập vào Dcity</span>
    </button>
  </div>
</template>
<script setup>
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import { supabase } from "@/supabase/supabase";
import router from "@/router/router"
const user = reactive({
  name: "",
  email: "",
  password: "",
  repassword: "",
});
const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
    },
    repassword: {
      required,
      sameAs: sameAs(user.password),
    },
  };
});

const v$ = useVuelidate(rules, user);
async function registerFunction() {
  var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });

  const result = await v$.value.$validate();
  if (!result) {
    notyf.error("Kiểm tra lại các trường");

    return;
  } else {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    if (error) {
      notyf.error("Tài khoản đã tồn tại vui lòng đăng nhập lại")
    } else {
      const dateLogin = new Date();
      const { error } = await supabase
        .from("User")
        .insert({
          user_id: data.user.id,
          name: user.name,
          create_at: dateLogin,
          update_at: dateLogin,
        });
      if (!error) {
        notyf.success("Đăng kí thành công")
        window.location.href = "https://learning-city.onrender.com/signin"
      }
    }
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
</style>
