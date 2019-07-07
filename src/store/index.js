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
        //添加购物车
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
        },
        updateCartCountAdd(state,data){
            // {id: "p-n5", count: 6}
            state.cart.some(item=>{
                if(data.id == item.id){
                    item.count = data.count + 1;
                    return true;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        updateCartCountMinu(state,data){
            // {id: "p-n5", count: 6}
            state.cart.some(item=>{
                if(data.id == item.id){
                    item.count = data.count - 1;
                    return true;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        //删除购物车列表商品
        removeCartList(state,id){
            state.cart.some((item,index) =>{
                if(item.id == id){
                    state.cart.splice(index,1)
                    return true;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        //更新商品选中状态的值,并存储
        updateSelectedFlag(state,data){
            state.cart.some(item=>{
                if(item.id == data.id){
                    item.selected = data.selected;
                    return true;
                }
            })
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
        },
        getSelectedFlag(state){
            var obj = {};
            state.cart.forEach(item=>{
                obj[item.id] = item.selected
            })
            return obj;
        },
        getTotalPrice(state){
            var obj = {
                count:0,//选中商品个数
                amount:0,//选中总价
            };
            state.cart.forEach(item=>{
                if(item.selected){//若当前商品为选中商品
                    var unitPrice = item.price.match(/[\d]+/g)[0];
                    console.log(unitPrice)
                    obj.count += item.count;
                    obj.amount += item.count * unitPrice;
                }
            })
            console.log(obj);
            return obj;
        }
    }
});
export default store