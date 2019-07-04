<template>
    <div>
        <!--轮播图片-->
        <swipeBanner :dataList="bannerList" :isfull="true"></swipeBanner>
        <!--图标按钮-->
        <ul class="m_grid-view">
            <li>
                <router-link to="home/newslist">
                    <img src="../img/menu1.png" alt="">
                    <div class="grid-tt">新闻资讯</div>
                </router-link>
            </li>
            <li>
                <router-link to="home/photolist">
                    <img src="../img/menu2.png" alt="">
                    <div class="grid-tt">图片分享</div>
                </router-link>
            </li>
            <li>
                <router-link to="home/goodslist">
                    <img src="../img/menu3.png" alt="">
                    <div class="grid-tt">商品购买</div>
                </router-link>
            </li>
            <li>
                <a href="#">
                    <img src="../img/menu4.png" alt="">
                    <div class="grid-tt">留言反馈</div>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../img/menu5.png" alt="">
                    <div class="grid-tt">视频专区</div>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="../img/menu6.png" alt="">
                    <div class="grid-tt">联系我们</div>
                </a>
            </li>
        </ul>

    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import swipeBanner from './swipeBanner.vue'
    export default {
        data(){
            return{
                bannerList:[]
            }
        },
        created(){
          this.getBanner();
        },
        methods:{
            getBanner(){//获取轮播图数据
                this.$http.get('./banner.json').then(res=>{
                    if(res.body.ret == 0){
                        this.bannerList = res.body.message;
                    }else{
                        Toast('Upload Fail !');
                    }
                })
            }
        },
        components:{
            swipeBanner
        }
    }

</script>
<style lang="less">

</style>