<template>
    <div>
        <!--轮播图片-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in bannerList" :key="item.img">
                <img :src="item.img" alt="banner">
            </mt-swipe-item>
        </mt-swipe>

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
                <a href="#">
                    <img src="../img/menu3.png" alt="">
                    <div class="grid-tt">商品购买</div>
                </a>
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
        }
    }

</script>
<style lang="less" scoped>
/*轮播图片*/
.mint-swipe{height: 12.08rem;
    img{width:100%;height: 100%;}
}
@media (min-width: 450px) {
    .mint-swipe{height: 24.17rem;}
}
</style>