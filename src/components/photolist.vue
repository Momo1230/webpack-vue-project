<template>
    <div>
        <div class="slider">
            <ul>
                <li :class="activeClassFlag == index ? 'active' : ''" v-for="(item,index) in cates" :key="item.id" @click="getActive(index)">
                    <a href="javascript:void(0)" @click="getPhotoList(item.id)">{{item.cate}}</a>
                </li>
            </ul>
        </div>
        <ul class="photoList">
            <router-link v-for="item in photoList" :key="item.id" :to="'photoinfo/'+item.id" tag="li">
                <img v-lazy="item.imgUrl">
                <div class="photoListInfo">
                    <h4>{{item.title}}</h4>
                    <p>{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                cates:[],
                activeClassFlag : 0,
                photoList:[]    //获取图片列表
            }
        },
        created(){
            this.getAllCategory();
            this.getPhotoList(0);
        },
        mounted() {
            //插件初始化代码写在这里，因为得让DOM结构渲染了，才能获取到DOM元素初始化
        },
        methods:{
            getAllCategory(){
                this.$http.get('./datamodule/photoCategory.json').then(res=>{
                    if(res.body.ret == 0){
                        res.body.message.unshift({"id": 0,"cate": "全部"});
                        this.cates = res.body.message;
                    }
                })
            },
            getActive(index){
                this.activeClassFlag = index;
            },
            getPhotoList(cateId){
                this.$http.get('./datamodule/photoList'+cateId+'.json').then(res=>{
                    if(res.body.ret == 0){
                        this.photoList = res.body.message;
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.slider{height: 38px;overflow-y: hidden;
    ul{overflow-x: scroll;padding: 0 0 10px;margin: 0;-webkit-overflow-scrolling: touch;
        li{display: table-cell;white-space: nowrap;padding: 10px 14px;}
        li.active{a{color: #226aff;font-weight: 400;}}
    }
}
.photoList{padding: 0 6px;margin: 0;
    li{list-style-type: none;font-size: 0;margin-bottom:6px;box-shadow: 3px 3px 6px #999;position: relative;
        img{width:100%;}
        img[lazy=loading] {display:block;width: 40px;height: 300px;margin: auto;}
        .photoListInfo{position: absolute;bottom:0;left:0;width:100%;overflow: hidden;background: rgba(0,0,0,0.4);color: #fff;padding:4px;max-height: 84px;line-height: 1.5;
            h4{font-size: 14px;}
            p{font-size: 12px;color: #fff;}
        }
    }
}
</style>