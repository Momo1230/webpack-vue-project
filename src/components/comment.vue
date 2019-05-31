<template>
    <div class="comment_c">
        <h3 class="comment_tt">发表评论</h3>
        <hr>
        <textarea placeholder="最多120个字符" maxlength="120" v-model="textComment"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in commentList" :key="item.addTime">
                <div class="cmt-title">
                    第{{index+1}}楼 用户：{{item.user}} 发表时间：{{item.addTime | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.comment}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain="" @click="showMore" v-if="moreFlag">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default{
    data(){
        return{
            commentList:[],
            pageIndex:1,
            moreFlag:true,
            textComment:''  //  绑定评论内容
        }
    },
    props:["artId"],
    created(){
        this.getCommentList();
    },
    methods:{
        getCommentList(){
            if(this.pageIndex>=3){
                return false;
            }
            //这是从父组件传值给子组件的方法，用props接收
            //因为我的数据是假的，自己写死的，所以不需要这个参数，但在实际开发中需要传文章id过去，用来确定是那个文章的评论
            console.log(this.artId);
            this.$http.get('./datamodule/comment'+this.pageIndex+'.json').then(res=>{
                if(res.body.ret == 0){
                    this.commentList = this.commentList.concat(res.body.message);
                }else{
                    Toast('Upload Fail !');
                }
            })

        },
        //获取更多
        showMore(){
            //此时的判断条件应该为总页码数，因为我是写死的，所以就直接写为2
            this.pageIndex++;
            if(this.pageIndex>=2){
                this.moreFlag = false;
            }
            this.getCommentList();
        },
        //点击发表评论
        addComment(){
            if(this.textComment.trim().length<=0){
                return Toast('评论不能为空 !');
            }
            //没有提交评论的接口，随便凑一个，讲道理是post请求才对，然后要设置为表单提交
            //Vue.http.options.emulateJSON = true;
            //原接口需要传参  content
            this.$http.get('./datamodule/newsinfo'+this.artId+'.json',{content:this.textComment.trim()}).then(res=>{
                if(res.body.ret == 0){
                    this.commentList.unshift({
                        "user": "匿名用户",
                        "addTime": new Date(),
                        "comment": this.textComment
                    })
                }
            })
        }
    }
}
</script>
<style lang="less">
.comment_c{margin-top: 20px;
    .comment_tt{font-size: 16px;font-weight: bold;color:#333;}
    textarea{font-size: 14px;height:85px;margin: 0;padding: 6px;}
    .mint-button{font-size: 14px;}
    .cmt-list{margin:6px 0;
        .cmt-item{font-size: 12px;
            .cmt-title{background: #ccc;line-height: 30px;}
            .cmt-body{line-height: 36px;text-indent:2em;}
        }
    }
}
</style>