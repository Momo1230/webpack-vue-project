<template>
    <div class="app">
        <!--header-->
        <mt-header fixed title="Vue+webpack项目">
            <span @click="goBack()" slot="left" v-if="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <!--中间路由router-view-->
        <transition>
            <router-view></router-view>
        </transition>
        <!--footer-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="cart-badge">{{$store.getters.getCartCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                flag:false
            }
        },
        created(){
            this.flag = this.$route.path == '/home' ? false : true;
        },
        watch:{
            "$route.path":function (newvalue) {
                if(newvalue == '/home'){
                    this.flag = false;
                }else{
                    this.flag = true;
                }
            }
        },
        methods:{
            goBack(){
                //点击后退方法
                this.$router.go(-1);
            }
        }
    }

</script>
<style lang="less" scoped>
    .v-enter{opacity: 0;transform: translateX(100%);}
    .v-leave-to{opacity: 0;transform: translateX(-100%);position: absolute;}
    .v-enter-active,.v-leave-active{transition: all 0.4s ease;}
    .app{padding: 40px 0 51px;overflow-x: hidden;}
</style>