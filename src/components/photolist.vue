<template>
    <div>
        <div class="slider">
            <ul>
                <li><a href="#">111</a></li>
                <li><a href="#">222</a></li>
                <li><a href="#">333</a></li>
                <li><a href="#">444</a></li>
                <li><a href="#">555</a></li>
                <li><a href="#">666</a></li>
                <li><a href="#">777</a></li>
                <li><a href="#">888</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        mounted() {
            //插件初始化代码写在这里，因为得让DOM结构渲染了，才能获取到DOM元素初始化
        },
        methods:{

        }
    }
</script>
<style lang="less">
.slider{height: 38px;overflow-y: hidden;
    ul{overflow-x: scroll;padding: 0 0 10px;margin: 0;-webkit-overflow-scrolling: touch;
        li{display: table-cell;padding: 10px 14px;}
    }
}
</style>