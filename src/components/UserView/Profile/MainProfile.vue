<template>
  <div class="main-profile">
    <v-card class="mx-auto my-8" max-width="1000" height="380">
      <div class="content">
        <div class="image-profile">
          <div class="image-contain">
            <div class="frame-image">
              <img
                :src="dataImage || `https://cdn.24h.com.vn/upload/3-2023/images/2023-07-04/1-1688460815-467-width740height493.jpg`"
                alt=""
                class="main-image"
                @click="uploadImage()"
              />
            </div>
          </div>
        </div>

        <div class="info-profile">
          <div class="input-profile">
            <input type="text" class="input-main" v-model="name"/>
            <font-awesome-icon :icon="['fa', 'user']" class="icon" />
          </div>
          <div class="input-profile">
            <input type="text" class="input-main email-edit" :value="dataUser.email" disabled>
            <font-awesome-icon :icon="['fa', 'envelope']"   class="icon"/>
          </div>

          <v-btn class="btn" color="primary" @click="saveChange()">Lưu lại</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script setup>
import { success } from '@/components/ultil/notify';
import { supabase } from '@/supabase/supabase';
import { ref } from 'vue';
    const {data:user} = await supabase.auth.getUser()
    const {data} = await supabase.from("User").select("name,user_image").eq("user_id",user.user.id)
    const dataUser = {
        name:data[0].name,
        email:user.user.email,
        image:data[0].user_image
    }  
     const dataImage = ref(dataUser.image)
     const name = ref(dataUser.name)
     
    const widget = window.cloudinary.createUploadWidget(
  {
    cloud_name: "dlzfanxoh",
    upload_preset: "q8m8r0wi",
    folder: "imageuser",
    clientAllowedFormats: ["image"],
    resourceType: "image",
    multiple:false
  },(error,result)=>{
    if (!error && result && result.event === "success") {
        console.log(result.info.url)
        dataImage.value = result.info.url
    }
  })
    function uploadImage(){
        widget.open()
    }
    function saveChange(){
        supabase.from("User").upsert({
            user_id:user.user.id,
            name:name.value,
            user_image:dataImage.value
        },{onConflict:"user_id"}).then(()=>{
            success("Thay đổi thông tin thành công")
        })
    }
</script>
<style scoped>
.content {
  padding: 50px 50px;
  width: 100%;
  height: 100%;
  display: flex;
}
.image-profile {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-profile {
  width: 50%;
}
.image-contain {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.frame-image {
  width: 150px;
  height: 150px;
}

.main-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.input-main {
  border: 1px solid rgb(229, 229, 229);
  padding: 10px 50px 10px 20px;
  border-radius: 6px;
  font-size: 20px;
  width: 100%;
}
.info-profile {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center
}
.icon {
  position: absolute;
  right: 10px;
  top: 15px;
}
.input-profile {
  width: 100%;
  position: relative;
  margin-bottom: 25px;
}
.btn{
    width: 100%;
}
.email-edit{
    cursor: not-allowed;
    background-color: #f0f0f0;
    
}
</style>
