import Vue from "vue"
import Router from "vue-router";
import checkAuth from "@/middlewares/checkAuth";

Vue.use(Router)


const router = new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import('@/views/HomePage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/about",
            name: "about",
            component: () => import('@/views/AboutPage'),
            meta: {
                layout: 'AppLayoutAbout'
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import('@/views/LoginPage'),
            meta: {
                layout: 'AppLayoutLogin'
            }
        },
        {
            path: "/survey",
            name: "survey",
            component: () => import('@/views/AppPage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/survey/surveys",
            name: "surveys",
            component: () => import('@/views/SurveyPage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/survey/designer",
            name: "designer",
            component: () => import('@/views/SurveyDesigner'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/survey/users",
            name: "users",
            component: () => import('@/views/UserPage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },

        {
            path: "/:catchAll(.*)",
            component: () => import ('@/common/components/NotFoundComponent'),
            name: "NotFound"
        }
    ],
    mode: "history",
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && checkAuth() !== true) {
        next({
            path: 'login',
            replace: true
        })
    } else {
        next()
    }
})

export default router