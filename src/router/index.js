import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import('../views//Home'),
        meta: {title: 'Home'}
    },
    {
        path: "/blogs",
        name: "Blogs",
        component: () => import('../views//Blogs'),
        meta: {title: 'Blogs'}
    },
    {
        path: "/register",
        name: "Register",
        component: () => import('../views//Register'),
        meta: {title: 'Register'}
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('../views//Login'),
        meta: {title: 'Login'}
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import('../views//ForgotPassword'),
        meta: {title: 'Forgot Password'}
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | VueBlog` ?? 'VueBlog';
    next();
});
export default router;
