<template>
    <div class="main-blog">
        <div class="header">
            <Header></Header>
        </div>
        <div class="content my-8">
            <ViewBlog></ViewBlog>
        </div>
        <div class="footer">
            <footerWeb></footerWeb>
        </div>
    </div>
</template>
<script setup>
import Header from "@/components/UserView/Header/Header.vue";
import ViewBlog from "@/components/UserView/Blog/ViewBlog.vue";
import footerWeb from "../footer/footer.vue";
</script>
<style scoped>
    
    

</style>