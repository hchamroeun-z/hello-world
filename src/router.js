import SignIn from "./Component/Auth/SignIn.vue";
import SignUp from "./Component/Auth/SignUp.vue";
import SignOut from "./Component/Auth/SignOut.vue";
import Dashboard from "./Component/Pages/Dashboard.vue";
import Profile from "./Component/Auth/Profile.vue";
import Test from "./Component/Pages/test.vue";

import navbar from "@/Component/include/Nav.vue"
import sidebar from "@/Component/include/Side.vue"
import footor from "@/Component/include/footer.vue"

import { createRouter,createWebHistory } from "vue-router";

const route=[
    {
        path: "/",
        name: "SignIn",
        component: SignIn,
        meta: { guarded: false }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        meta: { guarded: false }
    },
    {
        path: '/signout',
        name: 'SignOut',
        component: SignOut,
        // This route has no guarded meta because it use for both authenticated and unauthenticated users.
        // The authentication state will be handled in the SignOut component.
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        components: {
            navbar:navbar,
            sidebar:sidebar,
            footor:footor,
            default:Dashboard
            
        },meta: { guarded: true }
    },
    {
        path: "/profile",
        name: "Profile",
        components: {
            navbar:navbar,
            sidebar:sidebar,
            footor:footor,
            default:Profile
        },
        meta:{guarded:true}
    },
    {
        path: "/test",
        name: "Test",
        components: {
            navbar:navbar,
            sidebar:sidebar,
            footor:footor,
            default:Test
        },
        meta:{guarded:true}
    },
    {path: "/:pathMatch(.*)*",redirect:{name: "SignIn"}}
];

const router=createRouter({
    history: createWebHistory(),
    routes:route,
});

export default router;