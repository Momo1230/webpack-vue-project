<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="miun">-</button>
        <input id="test" class="mui-input-numbox" type="number" v-model="numValue" ref="countInput" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
    </div>
</template>
<script>

    export default {
        data(){
            return{
              numValue:1
            }
        },

        methods:{
            add(){
                this.numValue ++;
                this.$emit("productCount",parseInt(this.numValue));

            },
            miun(){
                if(this.numValue > 1){
                    this.numValue --;
                }
                this.$emit("productCount",parseInt(this.numValue));

            }
        }
    }
</script>
<style lang="less">
    .mui-numbox{
        input,button{outline: none;}
    }
</style>
