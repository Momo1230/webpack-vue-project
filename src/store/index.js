import Vue from 'vue'
// 1、安装vuex的包
// npm install vuex -S
// 2 导入vuex
import Vuex from 'vuex'
// 3、注册vuex到vue中
Vue.use(Vuex);
// 4、创建vuex.store实例,得到一个数据仓储对象

var cartValue =JSON.parse(localStorage.getItem('cart')) || [];

const store = new Vuex.Store({
    //state相当于组件中的data，用来存储数据
    state:{
        //将购物车中的数据设计为一个数组
        //id:商品的id,count:要购买的数量,price:商品的单价,selected:false
        cart:cartValue

    },
    //相当于组件中的methods，存储方法
    mutations:{
        addToCart(state,goodsinfo){
            let flag = false;
            //点击加入购物车，把信息保存到store中的state的cart中
            state.cart.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = item.count + goodsinfo.count;
                    flag = true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goodsinfo)
            }
            localStorage.setItem('cart',JSON.stringify(state.cart));
        }
    },
    getters:{
        getCartCount(state){
            var count = 0;
            state.cart.forEach(item => {
                count += item.count;
            })
            return count;
        },
        shopCartCountObj(state){
            var obj = {};
            state.cart.forEach(item =>{
                obj[item.id] = item.count
            })
            return obj;
        }
    }
});
export default store