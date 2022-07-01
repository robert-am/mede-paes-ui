import Vue from "vue"
import Router from "vue-router";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            component: () => import('@/views/HomePage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/about",
            component: () => import('@/views/AboutPage'),
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
            path: "/survey",
            component: () => import('@/views/AppPage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/survey/surveys",
            component: () => import('@/views/SurveyPage'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/survey/designer",
            component: () => import('@/views/SurveyDesigner'),
            meta: {
                layout: 'AppLayoutHome'
            }
        },
        {
            path: "/survey/users",
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
    mode: "history"
})