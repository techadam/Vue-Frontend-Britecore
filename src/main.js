import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAlertify from 'vue-alertify';
import {store} from './store';

import App from './App.vue';
import './App.css';

import Risks from './components/Risks.vue';
import RiskDetail from './components/RiskDetail.vue';
import RiskForm from './components/RiskForm.vue';
import About from './components/About.vue';

Vue.use(VueRouter)
Vue.use(VueAlertify)

Vue.config.productionTip = false

const router = new VueRouter({
   mode: 'history',
   base: __dirname,
   routes: [
      {path: '/', component: Risks},
      {path: '/risk/:id', name:'riskdetail', component: RiskDetail},
      {path: '/risk/:id/form', name: 'riskform', component: RiskForm},
      {path: '/about', component: About},
   ]
})

new Vue({
   store: store,
   router: router,
   render: h => h(App),
}).$mount('#app')
