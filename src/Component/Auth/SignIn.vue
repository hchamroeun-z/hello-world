<template>
     <div class="login-page">
        <div class="login-box">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <RouterLink to="/" class="h1"><b>Admin</b>LTE</RouterLink>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Sign in to start your session</p>
                    <form>
                        <div class="input-group mb-3">
                            <input type="email" v-model="user.email" class="form-control" placeholder="Email"
                            :class="{ 'is-invalid':!!userError.email}" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">
                            {{ userError.email }}
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" v-model="user.password" class="form-control" placeholder="Password" autocomplete
                            :class="{'is-invalid':!!userError.password}" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">
                            {{ userError.password }}
                        </div>
                        <div class="row">
                            <div class="col-8"></div>
                            <div class="col-4">
                                <button @click="signIn()" type="button" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </div>
                    </form>
                    <p class="mb-0">
                        <RouterLink :to="{ name: 'SignUp' }" class="text-center">Register a new
                            membership</RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {reactive} from "vue"
import { useRouter } from "vue-router";
import { LoadingModal,MessageModal,CloseModal } from "@/functions/swal";
import { apiSignin } from "@/functions/api/auth";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const user=reactive({
    email: "",
    password:""
});

const userError=reactive({
    email: "",
    password:""
});

const router =useRouter();
const defaultUser=JSON.parse(JSON.stringify(user));
const defaultErr=JSON.parse(JSON.stringify(userError));

function resetState(){
    Object.assign(user,defaultUser);
    Object.assign(userError,defaultErr);
}

async function signIn() {
    try{
        LoadingModal("Signing in");
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
        const response = await apiSignin(user);
        const { data } = response;

        userStore.setState(data.user);
        userStore.setSanctumToken(data.token);

        resetState();
        router.replace({name:"Dashboard"});
        // console.log("hello")
        return CloseModal();
    }catch(error){
        const {response}=error;
        if(!response){
            return MessageModal({icon:"error",title:"Error",text:error.mesage});
        }
        const { status, data } = response;
        if (status === 422) {
            Object.keys(userError).forEach((key) => {
                userError[key] = data.errors[key]
                    ? data.errors[key][0]
                    : "";
                    //  console.log(data.errors);
            });
            return CloseModal();
        }
        return MessageModal({ icon: "error", title: "Error", text: data.message });
    }
    
}
</script>