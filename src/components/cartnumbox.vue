<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="miun">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="cartNum" ref="countInput" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
    </div>
</template>
<script>

    export default {
        data(){
            return{

            }
        },
        props:["cartNum","productSku"],

        methods:{
            miun(){
                if(this.cartNum >1){
                    var data = {id:this.productSku,count:this.cartNum}
                    this.$store.commit('updateCartCountMinu',data);
                }
            },
            add(){
                var data = {id:this.productSku,count:this.cartNum}
                this.$store.commit('updateCartCountAdd',data);
            }
        }
    }
</script>
<style lang="less">
    .mui-numbox{width:110px;height: 26px;
        input,button{outline: none;font-size: 12px;}
    }
</style>
