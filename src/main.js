import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'


import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus = new Vue()

//图片懒加载
Vue.use(VueLazyload)

//消息确认框的使用，用到elementui
Vue.use(ElementUI);

//解决移动端300ms延迟
Fastclick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
	store
}).$mount('#app')