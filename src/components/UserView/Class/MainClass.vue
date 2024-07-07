<template>
    <div>
        <div class="header">
          <Header></Header>  
        </div>
        <div class="content my-10">
            <ContentClass></ContentClass>
        </div>
        <div class="footer">
           <Webfooter></Webfooter>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/UserView/Header/Header.vue'
import Webfooter from '../footer/footer.vue';
import ContentClass from '../Class/ContentClass.vue'
</script>
<style scoped>
    
</style>