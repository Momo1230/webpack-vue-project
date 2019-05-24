import Vuerouter from 'vue-router'
import home from '../components/home.vue'
import member from '../components/member.vue'
import shopcar from '../components/shopcar.vue'
import search from '../components/search.vue'
import newslist from '../components/newslist.vue'
import newsinfo from '../components/newsinfo.vue'

var router = new Vuerouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newslist/:id',component:newsinfo}
    ],
    linkActiveClass:'mui-active'
})
export default router