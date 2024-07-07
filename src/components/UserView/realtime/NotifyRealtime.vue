<template>
    <div class="notify">
        <v-card
    class="mx-auto my-8 card-notify"
    elevation="16"
    max-width="344"
  >
  <div class="image">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6gxLHGxTFw6vVK9w4HdI88fV1BSYpfIj5Q&s" alt="" class="image-main">
  </div>
  <div class="content">
        <v-card-text>
    <b>{{ props.data.User.name }}</b> vừa đăng kí thành công khoá học <b>{{ props.data.Course.classify }}</b> của Lê Văn Duy
    </v-card-text>
    <v-card-subtitle>
        Vừa xong
      </v-card-subtitle>
  </div>

  </v-card>
    </div>
</template>
<script setup>
const props = defineProps({
    data:Object
})
    console.log(props.data)
</script>
<style scoped>
    .card-notify{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image-main{
        width: 100px;
        height: 100px;
        padding: 10px 10px;
    }
    .v-card-text{
        padding: 0;
    }
    .v-card-subtitle{
        padding: 0;
    }
    .content{
        padding-right: 10px;
    }
</style>