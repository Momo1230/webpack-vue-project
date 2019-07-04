import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import app from './pages/app.vue'
import moment from "moment";
//样式文件
import './assets/module.less'
// import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
// 导入 MUI 的样式
import './lib/mui/css/mui.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'
//路由
import router from './pages/router.js'
import store from './store/index.js'
import MintUI from 'mint-ui'


Vue.use(MintUI)
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(Lazyload);


Vue.http.options.emulateJSON = true;
//时间过滤器
Vue.filter('dataFormat',function (dataStr,pattern="YYYY-MM-DD hh:mm:ss") {
    //采用moment插件
    return moment(dataStr).format(pattern);
});

new Vue({
    el:"#app",
    render:c => c(app),
    router:router,
    // 5、将vuex创建的实例store，挂载到vm实例上
    store:store
});