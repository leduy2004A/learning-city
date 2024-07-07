<template>
  <div class="blog mt-8">
    <div class="header-blog">
      <div class="btn-ok">
        <v-btn flat color="primary" @click="postBlog">Xuất bản</v-btn>
      </div>

      <div class="title-blog">
        <v-text-field label="Chủ đề" v-model="form.topic"> </v-text-field>
        <span v-if="v$.topic.$error" style="color: red">{{
          v$.topic.$errors[0].$message
        }}</span>
      </div>
      <div class="subtitle-blog">
        <v-text-field
          label="Mô tả một chút về bài viết của bạn nhé"
          v-model="form.subcontent"
        ></v-text-field>
        <span v-if="v$.subcontent.$error" style="color: red">{{
          v$.subcontent.$errors[0].$message
        }}</span>
      </div>
    </div>
    <div class="content-blog">
      <MdEditor
        v-model="form.text"
        language="en-US"
        :on-upload-img="uploadImage"
        :toolbars="toolbars"
      >
        <template #defToolbars>
          <Emoji>
            <template #trigger> Emoji </template>
          </Emoji>
        </template>
      </MdEditor>
      <span v-if="v$.text.$error" style="color: red">{{
        v$.text.$errors[0].$message
      }}</span>
    </div>
  </div>

  <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { toolbars } from "@/staticConfig";
import { supabase } from "@/supabase/supabase";
import { ref, reactive, computed } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import "md-editor-v3/lib/style.css";
import { Emoji } from "@vavt/v3-extension";
import "@vavt/v3-extension/lib/asset/Emoji.css";
import { checkUserLogin } from "@/components/ultil/checkUserLogin";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";
const route = useRoute();


var notyf = new Notyf({
    position: {
      x: "right",
      y: "top",
    },
  });
const form = reactive({
  text: "# Viết nội dung vào đây",
  topic: "",
  subcontent: "",
});
if (route.params.idblog)
{
  const {data} = await supabase.from("Blog").select().eq("id",route.params.idblog)
form.text = data[0].content
form.topic = data[0].topic
form.subcontent = data[0].sub_content
}
else{
  console.log("Lỗi")
}


const rules = computed(() => {
  return {
    topic: { required, minLength: minLength(8) },
    text: { required, minLength: minLength(50) },
    subcontent: { required, minLength: minLength(10) },
  };
});
const v$ = useVuelidate(rules, form);
let ImageBlog =
  "https://res.cloudinary.com/dlzfanxoh/image/upload/v1719393639/imageblog/voyiikqvifea0k1ezdyh.png";
async function uploadImage(file, callback) {
  await console.log(file);
  const { data, error } = await supabase.storage
    .from("imageProject")
    .upload(file[0].name, file[0], {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(data);
  const { data: urlImage } = supabase.storage
    .from("imageProject")
    .getPublicUrl(file[0].name);
  if (urlImage.publicUrl !== null) {
    let url = [];
    url.push(urlImage.publicUrl);
    callback(url);
  }

  if (error) {
    console.log(error.message);
  }
}

const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: "dlzfanxoh",
    upload_preset: "q8m8r0wi",
    folder: "imageblog",
    clientAllowedFormats: ["image"],
    resourceType: "image",
    multiple:false
  },
  async (error, result) => {
    if (!error && result && result.event === "success") {
      console.log(result.info.url);
      ImageBlog = result.info.url;
      const { data } = await supabase.auth.getUser();
        if (data.user !== null) {
          const { error } = await supabase.from("Blog").upsert({
            id:route.params.idblog,
            user_id: data.user.id,
            content: form.text,
            topic: form.topic,
            sub_content: form.subcontent,
            image_blog: ImageBlog,
          },{onConflict:"id"});
          if (!error) {
            notyf.success("Tạo blog thành công");
            setTimeout(() => {
              window.location.href = "https://learning-city.onrender.com";
            }, 2000);
          }
        }
    } else {
      console.log(error);
    }
  }
);
async function postBlog() {
  const resultLogin = await checkUserLogin();
  if (resultLogin === false) {
    return;
  }


  const result = await v$.value.$validate();
  if (!result) {
    notyf.error("Tạo blog thất bại kiểm tra lại các trường");
    return;
  } else {
    Swal.fire({
      title: "Hãy thêm ảnh vào blog để bài viết nổi bật hơn nhé",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Thêm Ảnh",
      denyButtonText: `Không Thêm`,
    }).then(async (result) => {
      
      if (result.isConfirmed) {
        widget.open();
      } else if (result.isDenied) {
        

        const { data } = await supabase.auth.getUser();
        const {data:dataImage} = await supabase.from("Blog").select("image_blog").eq("id",route.params.idblog)
        if (data.user !== null) {
          const { error } = await supabase.from("Blog").upsert({
            id:route.params.idblog,
            user_id: data.user.id,
            content: form.text,
            topic: form.topic,
            sub_content: form.subcontent,
            image_blog: dataImage.image_blog,
          },{onConflict:"id"});
          if (!error) {
            notyf.success("Tạo blog thành công");
            setTimeout(() => {
              window.location.href = "https://learning-city.onrender.com";
            }, 2000);
          }
        }
      }
    });
  }

// const {data} = await supabase.from("Blog").select().eq("id",route.params.idblog)

}
</script>
<style scoped>
.header-blog {
  width: 100%;
}
.btn-ok {
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
}
</style>
