import SignIn from "./Component/Auth/SignIn.vue";
import SignUp from "./Component/Auth/SignUp.vue";
import Dashboard from "./Component/Pages/Dashboard.vue";

import { createRouter,createWebHistory } from "vue-router";

const route=[
    {
        path: "/",
        name: "SignIn",
        component: SignIn
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
    },
    {path: "/:pathMatch(.*)*",redirect:{name: "SignIn"}}
];

const router=createRouter({
    history: createWebHistory(),
    routes:route,
});

export default router;