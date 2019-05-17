import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import app from './pages/app.vue'

//样式文件
import './assets/module.less'
import { Header, Swipe, SwipeItem } from 'mint-ui';
// 导入 MUI 的样式
import './lib/mui/css/mui.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

//路由
import router from './pages/router.js'

Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(VueRouter);
Vue.use(VueResource);

new Vue({
    el:"#app",
    render:c => c(app),
    router:router
})