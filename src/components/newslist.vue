<template>
    <div class="newsList">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newslist/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.imgUrl">
                    <div class="mui-media-body">
                        <h3>{{item.title}}</h3>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.addTime | dataFormat('YY-MM-DD hh:mm:ss')}}</span>
                            <span>点击:{{item.clickNum}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                newsList:[]
            }
        },
        created(){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                this.$http.get('./newslist.json').then(res=>{
                    if(res.body.ret == 0){
                        this.newsList = res.body.message
                    }else{
                        Toast('Upload Fail !');
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.newsList{
    .mui-table-view-cell{
        &:after{left: 0;}
    }
    .mui-media-body{
        h3{font-size: 14px;color: #666;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;}
        .mui-ellipsis{font-size: 12px;color: #226aff;display: flex;justify-content: space-between;}
    }
}
</style>