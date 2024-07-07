<template>
  <div class="footer">
    <v-container>
      <v-row no-gutters>
        <v-col cols="2.4">
          <img
            :src="mainlogo"
            alt=""
            class="logo-image"
          />
          <p class="mt-3">Email: support@kt.city</p>
          <p class="mt-3">Hotline: 02873098979</p>
          <p class="mt-3">Giờ làm việc 8h30-18h từ thứ 2 tới thứ 6.</p>
        </v-col>
        <v-col cols="2.4">
          <p class="mt-3"><b>Địa chỉ</b></p>
          <p class="mt-3">
            202 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP HCM
          </p>
        </v-col>
        <v-col cols="2.4">
          <p class="mt-3"><b>Hướng dẫn</b></p>
          <p class="mt-3">KTcity 101</p>
          <p class="mt-3">Giới thiệu</p>
          <p class="mt-3">Quy chế hoạt động</p>
        </v-col>
        <v-col cols="2.4">
          <p class="mt-3"><b>Khám phá</b></p>
          <p class="mt-3">Solution</p>
          <p class="mt-3">Reviewer Program</p>
          <p class="mt-3">Blog kiến thức</p>
          <p class="mt-3">Affiliate Program</p>
        </v-col>
        <v-col cols="2.4">
          <p class="mt-3"><b>Liên kết</b></p>
          <img src="https://kt.city/static/bct.png" alt="" class="logo-congthuong" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import mainlogo from '@/assets/images/sublogo.png'
</script>
<style scoped>
.footer {
  width: 100%;
  min-height: 294px;
  background-image: url("https://kt.city/static/footer-bg.png");
  background-color: transparent;
  background-size: cover;
}
.v-container {
  padding: 0;
}
.logo-image {
  width: 101px;
}
.logo-congthuong{
    width: 213px;
}
</style>
