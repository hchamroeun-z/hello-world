import SignIn from "./Component/Auth/SignIn.vue";
import SignUp from "./Component/Auth/SignUp.vue";
import Dashboard from "./Component/Pages/Dashboard.vue";

import navbar from "@/Component/include/Nav.vue"
import sidebar from "@/Component/include/Side.vue"
import footor from "@/Component/include/footer.vue"

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
        component: {
            navbar:navbar,
            sidebar:sidebar,
            footor:footor,
            default:Dashboard
        },
    },
    {path: "/:pathMatch(.*)*",redirect:{name: "SignIn"}}
];

const router=createRouter({
    history: createWebHistory(),
    routes:route,
});

export default router;