import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './pages/app.vue'

//样式文件
import './assets/module.less'
import { Header } from 'mint-ui';
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'
// 导入 MUI 的样式
import './lib/mui/css/mui.css'


Vue.component(Header.name,Header);
Vue.use(VueRouter);


new Vue({
    el:"#app",
    render:c => c(app)
})