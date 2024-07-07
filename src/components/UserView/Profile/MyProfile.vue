<template>
    <div class="my-profile">
        <div class="header">
            <Header></Header>
        </div>
        <div class="main-content">
            <MainProfile></MainProfile>
        </div>
        <div class="footer">
            <Footer></Footer>
        </div>
    </div>
</template>
<script setup>
import Header from '../Header/Header.vue';
import Footer from '../footer/footer.vue';
import MainProfile from '@/components/UserView/Profile/MainProfile.vue'
</script>
<style scoped>
    
</style>