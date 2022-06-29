import Vue from "vue"
import Router from "vue-router";
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            component: () => import('@/views/HomePage'),
            meta:{
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/about",
            component:() => import('@/views/AboutPage'),
            meta: {
                layout: 'AppLayoutAbout'
            }
        },
        {
            path: "/login",
            component: () => import('@/views/LoginPage'),
            meta: {
                layout: 'AppLayoutLogin'
            }
        },
        {
            path: "/paes",
            component: () => import('@/views/AppPage'),
            meta:{
                layout: 'AppLayoutHome'
            },
            children: [
                {path: "/paes/encuesta", component: import('@/views/HomePage') },
            ]
        },
        {
            path:"/:catchAll(.*)",
            component: () => import ('@/common/components/NotFoundComponent'),
            name: "NotFound"
        }
    ],
    mode: "history"
})