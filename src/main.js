import './assets/main.css';

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import store from './store/index.js'

import Expense from './components/Expense.vue'
import Income from './components/Income.vue'
import Statistic from './components/Statistic.vue'

let routes = [
    { path: '/', component: Expense},
    { path: '/expenses', component: Expense},
    { path: '/incomes', component: Income},
    { path: '/statistic', component: Statistic},
]

let router = createRouter({
    history: createWebHashHistory(),
    routes,
})

let app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
