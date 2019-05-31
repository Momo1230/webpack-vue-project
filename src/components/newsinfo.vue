<template>
    <div class="newsInfo">
        <h3 class="tt">{{newsinfo.title}}</h3>
        <p class="sub_tt">
            <span>发表时间:{{newsinfo.addTime | dataFormat}}</span>
            <span>点击：{{newsinfo.clickNum}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <comment-box :artId="this.id"></comment-box>
    </div>

</template>
<script>
import {Toast} from 'mint-ui'
import comment from './comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){
            this.$http.get('./datamodule/newsinfo'+this.id+'.json').then(res=>{
                if(res.body.ret == 0){
                    this.newsinfo = res.body.message[0]
                }else{
                    Toast('Upload Fail !');
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>
<style lang="less">
.newsInfo{padding: 0 4px;
    .tt{line-height: 1.3;font-size: 16px;text-align: center;margin:15px 0;color: red;}
    .sub_tt{font-size: 13px;color: #226aff;display: flex;justify-content: space-between;}
    .content{
        img{width:100%;}
    }
}
</style>