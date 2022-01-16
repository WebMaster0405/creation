import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import("./views/Dashboard.vue")
        },
        {
            name: 'PreMatch',
            path: '/preMatch',
            component: () => import("./views/PreMactch.vue")
        },
        {
            name: 'InPlayAlert',
            path: '/inPlayAlert',
            component: () => import("./views/InPlayAlert.vue")
        },
        {
            name: 'Fixtures',
            path: '/fixtures',
            component: () => import("./views/Fixtures.vue")
        },
        {
            name: 'Value',
            path: '/value',
            component: () => import("./views/Dashboard.vue")
        },
        {
            name: 'BettingSystems',
            path: '/bettingSystems',
            component: () => import("./views/Value.vue")
        },
        {
            name: 'BetBuilder',
            path: '/betBuilder',
            component: () => import("./views/BettingSystems.vue")
        }
    ]
});

