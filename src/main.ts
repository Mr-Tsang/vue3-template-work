import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "@/assets/css/index.scss"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import filtersInstall from './utils/filters/install'
import { userStore } from "@/store/user";
import { createPinia } from 'pinia';

const pinia = createPinia()
const app = createApp(App);

app.use(filtersInstall).use(ElementPlus, { locale: zhCn }).use(pinia).use(router).mount('#app')

const store = userStore();
//登录信息装填
// router.beforeEach((to, from, next) => {
//     let promises: Array<Promise<any>> = [];
//     if (!store.isLogin) {
//         //pinia若中丢失个人信息，及时获取
//         promises.push(store.getUserInfo());
//     }
//     Promise.all(promises).then((result: Array<number>) => {
//         if ('/' === to.path) {
//             //根路由自动寻找第一个菜单跳转
//             next({ name: store.menu[0].routeName || store.menu[0].children[0].routeName })
//             return;
//         }
//         next();
//     }).catch(() => {
//         // 跳转登陆页面
//         location.href = ``;
//     })
// })