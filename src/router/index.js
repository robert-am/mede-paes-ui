import Vue from "vue"
import Router from "vue-router";
import Home from "@/views/HomePage"
import Login from "@/views/LoginPage"
Vue.use(Router)


export default new Router({
    routes: [
        {path: "/", component: Login},
        {path: "/login", component: Login},
        {
            path: "/paes",
            component: Home,
            children: [
                {path: "/paes/home", component: Home},
            ]
        },
        {
            path:"/:catchAll(.*)",
            component: NotFoundComponent,
            name: "NotFound"
        }
    ],
    mode: "history"
})