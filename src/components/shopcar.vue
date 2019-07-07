<template>
    <div class="cartBox">
        <!--购物车商品-->
        <div class="mui-card" v-for="(item,index) in cartList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="cart_wrap" >
                        <mt-switch v-model="$store.getters.getSelectedFlag[item.id]" @change="selectedChange(item.id,$store.getters.getSelectedFlag[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="current_price">￥{{item.sell_price}}</span>
                                <cartnumbox :cartNum="$store.getters.shopCartCountObj[item.id]" :productSku="item.id"></cartnumbox>
                                <a href="#" @click.stop="removeCartPrd(item.id,index)">删除</a>
                            </p>
                            <!--
                                商品购物车中的数量，需要根据cart中的id对应的数量来展示

                                这里我们可以先新增一个getters里面的属性，循环state.cart中的数据

                                得到一个对象{id：count,id:count},这样我们购物车中的数量就可以直接从这个对象

                                中获取到了
                            -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--结算列表-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="cart_wrap settlement">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getTotalPrice.count}}</span>件，总价<span class="red">￥{{$store.getters.getTotalPrice.amount}}</span></p>
                        </div>
                        <mt-button type="danger" size="small">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cartnumbox from './cartnumbox.vue'
export default {
    data(){
        return{
            cartList:[]
        }
    },
    components:{
        cartnumbox
    },
    created(){
        this.getAllSku()
    },
    methods:{
        getAllSku(){
            var skuArr = [];
            this.$store.state.cart.forEach(item =>{
                skuArr.push(item.id)
            });
            //此处skuArr为添加到购物车内的商品的sku数组，接口需要传递这些数组，然后自己写死的接口不需要，所以没有用到
            this.$http.get('../datamodule/getShopCartList.json').then(res=>{
                if(res.body.ret == 1){
                    this.cartList = res.body.message;
                }
            })
        },
        removeCartPrd(id,index){
            //点击删除购物车列表里面的商品
            this.cartList.splice(index,1);
            this.$store.commit('removeCartList',id);
        },
        //改变选中状态
        selectedChange(id,value){
            //每当点击开关，把最新的开关状态同步到store中去
            //这个插件自带的v-model，以及change的状态下的事件，，当改变状态时，v-model会自动更新，，所以这个value就是更新之后我们需要的状态
            //使用store中的mutations函数来改变存储 selected的值
            console.log(id+'----'+value)
            this.$store.commit('updateSelectedFlag',{id,selected:value});
        }
    }
}
</script>
<style lang="less">
    .cartBox{background: #efefef;padding: 8px;
        .mui-card-content-inner{padding: 10px;}
        .mui-card{margin: 0 0 10px 0;}
        .cart_wrap{margin-bottom: 10px;font-size: 0;
            &>*{display: inline-block;font-size: 12px;vertical-align: middle;}
            label{width:15%;}
            img{width:15%;max-width:46px;height: 46px;}
            .info{width:70%;overflow: hidden;
                .current_price{color: red;font-weight: bold;}
                h1{width:100%;font-size: 13px;color: #666;margin: 0 0 8px 0;text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;}
                p{font-size: 12px;margin: 0;}
                a{color: #26a2ff;}
            }
        }
        .cart_wrap:last-child{margin-bottom: 0;}
        .settlement{display:flex;justify-content: space-between;align-items: center;
            .red{color:red;font-weight: bold;}
        }
    }
</style>