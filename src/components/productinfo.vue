<template>
    <div class="goodInfo">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" id="ball" v-show="flag"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--轮播图片-->
                    <swipeBanner :dataList="prdImgList" :isfull="false"></swipeBanner>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">
                Anycast M2 Plus无线WiFi显示加密狗接收器电视棒
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>￥2399</del>&nbsp;&nbsp;销售价: <span class="current_price" ref="current_price">￥2199</span>
                    </p>
                    <p>
                        购买数量:
                        <!--数量加减组件-->
                        <numBox @productCount="getCount"></numBox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCart()">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:</p>
                    <p>库存情况:</p>
                    <p>上架时间:</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain="plain" @click="getPrdDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain="plain" @click="getComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import swipeBanner from './swipeBanner.vue'
    import numBox from './numbox.vue'
    export default {
        data(){
            return{
                prdImgList:[],
                id:this.$route.params.cpath,
                flag:false,
                count:1
            }
        },
        created(){
            this.getPrdImg();
        },
        mounted(){
            const topDist = document.getElementById('test').getBoundingClientRect().top+document.documentElement.scrollTop-25;
            const leftDist = document.getElementById('test').getBoundingClientRect().left;

            var el = document.getElementById('ball');
            console.log(topDist,leftDist);
            el.style.top = topDist+'px';
            el.style.left = leftDist+'px';
        },
        methods:{
            getPrdImg(){
                this.$http.get('../datamodule/photoInfo.json').then(resolve=>{
                    if(resolve.body.ret == 0){
                        this.prdImgList = resolve.body.message;
                    }else{
                        Toast('Upload Fail !');
                    }
                })
            },
            getPrdDesc(id){
                this.$router.push({name:'goodsDesc',params:{id:id}})
            },
            getComment(id){
                this.$router.push({name:'goodsComment',params:{id:id}})
            },
            //动画钩子函数
            beforeEnter(el){

                el.style.transform = 'translate(0,0)';
            },
            enter(el,done){
                el.offsetWidth;
                //这里的translate是写死的，所以不能适应不同的分辨率，需要计算不同分辨率下的
                //购物车图标与起始点的位移差才决定translate的值
                //domObject.getBoundingClientRect()

                const startPosition = el.getBoundingClientRect();
                const endPosition = document.getElementById('cart-badge').getBoundingClientRect();
                const xDist = endPosition.left - startPosition.left;
                const yDist = endPosition.top - startPosition.top;
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = 'all 0.5s ease-out';
                done();
            },
            afterEnter(el){
                this.flag = !this.flag;
            },
            //向子组件传递方法，获取子组件的值
            getCount(count){
                console.log('父组件拿到的值为：'+ count);
                this.count = count;
            },
            addToCart(){
                this.flag = !this.flag;
                //id:商品的id,count:要购买的数量,price:商品的单价,selected:false
                let goodsInfo = {id:this.id,count:this.count,price:this.$refs.current_price.innerHTML,selected:true}
                this.$store.commit('addToCart',goodsInfo)
            }
        },
        components:{
            swipeBanner,
            numBox
        }
    }
</script>
<style lang="less">
    .goodInfo{position:relative;background: #efefef;padding: 10px;
        //小球
        .ball{position:absolute;width:15px;height: 15px;border-radius: 50%;background: red;z-index: 99;}
        .mui-card{margin: 0 0 10px 0;}
        .mui-card-content-inner,.mui-card-header,.mui-card-footer{padding: 6px 10px;}
        .mui-card-header{font-size: 13px;}
        .price{font-size: 13px;}
        .current_price{font-size: 16px;color: #cf2d28;font-weight: bold;}
        .mui-card-footer{display: block;padding: 14px;
            button{display: block;margin-bottom: 14px;}
        }
    }
</style>