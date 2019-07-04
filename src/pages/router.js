import Vuerouter from 'vue-router'
import home from '../components/home.vue'
import member from '../components/member.vue'
import shopcar from '../components/shopcar.vue'
import search from '../components/search.vue'
import newslist from '../components/newslist.vue'
import newsinfo from '../components/newsinfo.vue'
import photolist from '../components/photolist.vue'
import photoinfo from '../components/photoinfo.vue'
import goodslist from '../components/goodslist.vue'
import productinfo from '../components/productinfo.vue'
import goodsDesc from '../components/goodsDesc.vue'
import goodsComment from '../components/goodsComment.vue'

var router = new Vuerouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newslist/:id',component:newsinfo},
        {path:'/home/photolist',component:photolist},
        {path:'/home/photoinfo/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path: '/home/goodsinfo/:cpath(p[-_][a-zA-Z0-9-]+).html',component: productinfo},
        {path:'/home/goodsdesc/:id',component: goodsDesc,name:'goodsDesc'},
        {path:'/home/goodscomment/:id',component: goodsComment,name:'goodsComment'},
    ],
    linkActiveClass:'mui-active'
})
export default router