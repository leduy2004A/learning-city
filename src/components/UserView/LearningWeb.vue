<template>
    <div>
        <div class="header">
            <Header></Header>
        </div>
        <div class="main-content">
            <ViewLearning></ViewLearning>
            <TabsLearning></TabsLearning>
        </div>
        <div class="footer mt-10">
            <footerWeb></footerWeb>
        </div>
    </div>
</template>
<script setup>
import Header from "@/components/UserView/Header/Header.vue";
import footerWeb from "@/components/UserView/footer/footer.vue";
import ViewLearning from "./Content/ViewLearning.vue";
import TabsLearning from "./Content/TabsLearning.vue";

</script>

<style lang="">
    
</style>