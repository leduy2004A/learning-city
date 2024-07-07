<template>
    <div class="card-blog">
        
            <v-card
    max-width="344"
    height="300"
    hover
  >
  <div class="image-contain">
     <img :src="props.dataBlog.image_blog" alt="">
  </div>
 
    <v-card-item>
      <v-card-title>
        {{ props.dataBlog.topic }}
      </v-card-title>

      <v-card-subtitle>
        {{ props.dataBlog.sub_content }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      Đọc thêm
    </v-card-text>
  </v-card>
     
        
    </div>
</template>
<script setup>
    const props = defineProps({
        dataBlog:Object
    })

</script>
<style scoped>
    .v-card{
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 20px;
    }
    .image-contain{
      width: 100%;
      height: 50%;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    a{
      text-decoration: none;
    }
</style>