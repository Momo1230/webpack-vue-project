<template>
    <!--轮播图片-->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in dataList" :key="item.img">
            <img class="{full:isfull}" :src="item.img" alt="banner">
        </mt-swipe-item>
    </mt-swipe>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        props:["dataList","isfull"]
    }
</script>
<style lang="less" scoped>
    /*轮播图片*/
    .mint-swipe{height: 12.08rem;text-align: center;
        img{width:auto;height: 100%;}
        .fullWidth{width:100%;}
    }
    @media (min-width: 450px) {
        .mint-swipe{height: 24.17rem;}
    }
</style>