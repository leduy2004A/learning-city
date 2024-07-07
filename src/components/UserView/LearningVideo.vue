<template>
    <div class="learning-video">
        <div class="nav">
            <NavsVideo></NavsVideo>
        </div>
        <div class="main-content">
            <MainVideo></MainVideo>
        </div>
    </div>
</template>
<script>
import NavsVideo from "@/components/UserView/Content/NavsVideo.vue"
import MainVideo from "@/components/UserView/Content/MainVideo.vue"
export default {
    components:{
        NavsVideo,
        MainVideo
    }
}
</script>
<style scoped>
    .learning-video{
        display: flex;
    }
    .main-content{
        width: 500px;
        flex: 1;
        /* position: relative; */
        margin-left: 420px;
    }
    .nav{
        position: fixed;
        width: 500px;
        flex: 1;

        
    }
</style>