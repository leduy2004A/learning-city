<template>
  <div class="meta-price">
    <div class="" v-if="isRegister">
      <span class="sell-price">{{
        changeMoney(props.money.original_price)
      }}</span>
      <div class="price">{{ changeMoney(props.money.down_price) }}</div>
      <div class="check-price" v-if="checkMoney">
        <v-text-field
          label="Nhập vào mã kích hoạt"
          hide-details
          required
          class="mt-5"
          v-model="code"
        ></v-text-field>
        <i
          ><span style="color: red;">(*)</span> Lưu ý: sau khi thanh toán thành công hãy nhấn nút gửi mã kích hoạt, hệ thống sẽ
          gửi mã kích hoạt về tài khoản gmail của bạn</i
        >
        <v-btn class="button-register mt-5" height="50" @click="sendCode()"
          >Gửi mã kích hoạt</v-btn
        >
      </div>

      <v-btn class="button mt-10" height="50" @click="registerCourse()"
        >Đăng kí khoá học</v-btn
      >
    </div>
    <div class="resgiter-success" v-else>
      <span class="my-10"
        ><font-awesome-icon
          :icon="['fas', 'circle-check']"
          style="color: #63e6be"
        />
        Bạn đã đăng ký</span
      >
      <p class="title">
        Bạn có thể truy cập khóa học này tại khu vực học tập. Hoặc khám phá
        những khóa học khác.
      </p>
      <router-link to="/myDuy" class="button-link">
        <v-btn class="button mt-10">Vào khu vực học tập</v-btn>
      </router-link>
    </div>
    <a-modal v-model:open="open" title="Tí rau tí bún cho Duy" @ok="handleOk">
      <img :src="image" alt="" class="img-pay" />
    </a-modal>
  </div>
</template>
<script setup>
import CryptoJS from "crypto-js";
import { supabase } from "@/supabase/supabase";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import useEmitter from "@/components/useEmitter";
import { genarateNumber } from "@/components/ultil/genarateRandom";
import { random } from "@/components/ultil/randomNumber";
import { paymentCheck } from "@/components/ultil/checkPayment";
import { getUserID } from "@/components/ultil/checkUserLogin";
import { sendMailWithCodeCourse } from "@/components/ultil/sendEmail";
import { checkUserLogin } from "@/components/ultil/checkUserLogin";
const route = useRoute();
const code = ref("");
const open = ref(false);
const isRegister = ref(true);
const emitter = useEmitter();
const image = ref("");
const props = defineProps({
  money: Object,
});
let checkMoney = true;
let randomDescription = genarateNumber(6);
let randomOrdercode = random();
onMounted(async () => {
  const { data: user } = await supabase.auth.getUser();
  emitter.emit("checkRegister", isRegister.value);
  if (user.user !== null) {
    const checkRegister = await supabase
      .from("RegisterCourse")
      .select("*")
      .eq("user_id", user.user.id)
      .eq("course_id", route.params.id);
    console.log(checkRegister.data);
    if (checkRegister.data.length !== 0) {
      isRegister.value = false;
      emitter.emit("checkRegister", isRegister.value);
    }
    
  }
});
async function sendCode() {
  const resultLogin = await checkUserLogin();
  if (resultLogin === false) {
    return;
  }
  const user_id = await getUserID();
  open.value = true;
  const result = await paymentCheck(user_id, route.params.id);
  if (result === false) {
    const CLIENT_ID = "8c448ecd-05a3-40c1-8b2d-d3f569c3e565";
    const API_KEY = "35701812-b251-4b90-83ca-ef0d4dd0862c";
    const checksumKey =
      "25361ec01b25ea3e433a9a1d4a313a4c9419cf4858a466ef822be8c76c36b362";
    const data2 = {
      orderCode: randomOrdercode,
      amount: props.money.down_price,
      description: randomDescription,
      cancelUrl: "http://localhost:3000/",
      returnUrl: "http://localhost:3000/",
    };
    const sortedData = Object.keys(data2)
      .sort()
      .reduce((result, key) => {
        result[key] = data2[key];
        return result;
      }, {});

    const dataString = Object.entries(sortedData)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const signature = CryptoJS.HmacSHA256(dataString, checksumKey).toString(
      CryptoJS.enc.Hex
    );
    const { data: userLogin } = await supabase.auth.getUser();
    const course_id = route.params.id;
    const data = {
      orderCode: randomOrdercode,
      amount: props.money.down_price,
      description: randomDescription,
      cancelUrl: "http://localhost:3000/",
      returnUrl: "http://localhost:3000/",
      signature: signature,
    };

    const headers = {
      "x-client-id": CLIENT_ID,
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    };

    fetch("https://api-merchant.payos.vn/v2/payment-requests", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (data) => {
        console.log(data);
        const { error } = await supabase.from("Payment").upsert({
          user_id: userLogin.user.id,
          course_id,
          amount: props.money.down_price,
          description: randomDescription,
          code_order: randomOrdercode,
        });
        if (error) {
          console.log(error.message);
          return;
        } else {
          window.open(data.data.checkoutUrl, "_self");
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  } else {
    const getCode = await supabase
      .from("CodeCourse")
      .select("code")
      .eq("course_id", route.params.id)
      .eq("user_id", user_id);
    const { data: user } = await supabase.auth.getUser();
    if (user.user !== null) {
      sendMailWithCodeCourse(
        user.user.user_metadata.full_name,
        getCode.data[0].code,
        user.user.email
      );
    }
  }
}
async function registerCourse() {
  const result = await checkUserLogin();
  if (result === false) {
    return;
  }
  const { data: user } = await supabase.auth.getUser();
  if (checkMoney === false) {
    const { error } = await supabase
      .from("RegisterCourse")
      .insert({ user_id: user.user.id, course_id: route.params.id });
    if (!error) {
      isRegister.value = false;
    }
    if (error) {
      console.log(error);
    }
  } else {
    // const { data: user } = await supabase.auth.getUser();
    const { data: dataCourse } = await supabase
      .from("CodeCourse")
      .select("code")
      .eq("course_id", route.params.id)
      .eq("user_id", user.user.id);
    console.log(dataCourse[0].code);
    if (code.value === dataCourse[0].code) {
      const { error } = await supabase
        .from("RegisterCourse")
        .insert({ user_id: user.user.id, course_id: route.params.id });
      if (!error) {
        console.log("Thành công");
        isRegister.value = false;
      }
      if (error) {
        console.log(error);
      }
    }
  }
}
function changeMoney(money) {
  var x = money;
  x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return x;
}
function handleOk(e) {
  open.value = false;
}
if (props.money.down_price === 0) {
  checkMoney = false;
}
</script>
<style scoped>
.sell-price {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  color: rgb(71, 71, 71);
  text-decoration: line-through;
}
.price {
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: rgb(4, 206, 158);
}
.button {
  width: 100%;
  background-color: #2979ff;
  color: white;
}
.button-register {
  width: 100%;
  background-color: #494d96;
  color: white;
}
.resgiter-success {
  font-size: 32px;
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
}
.title {
  font-size: 20px;
  font-weight: 100;
}
.resgiter-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.img-pay {
  width: 100%;
}
.button-link {
  width: 100%;
}
</style>
