<template>
   <div class="login-page">
        <div class="login-box">
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <RouterLink to="/" class="h1"><b>Admin</b>LTE</RouterLink>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Sign up for a new membership</p>
                    <form>
                        <div class="input-group mb-3">
                            <input type="text" v-model="user.name" class="form-control" placeholder="Name"
                            :class="{'is-invalid':!!userErr.name}" />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">
                                {{ userErr.name }}
                        </div>
                        <div class="input-group mb-3">
                            <input type="email" v-model="user.email" class="form-control" placeholder="Email" 
                            :class="{'is-invalid':!!userErr.email}"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">
                                {{ userErr.email }}
                        </div>
                        
                        <div class="input-group mb-3">
                            <input type="password" v-model="user.password" class="form-control" placeholder="Password" autocomplete 
                            :class="{'is-invalid':!!userErr.password}"/>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">
                                {{ userErr.password }}
                        </div>
                        
                        <div class="input-group mb-3">
                            <input type="password" v-model="user.password_confirmation" class="form-control" placeholder="Confirm Password" autocomplete />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                       
                        <div class="row">
                            <div class="col-8"></div>
                            <div class="col-4">
                                <button @click="signUp()" type="button" class="btn btn-primary btn-block">Sign up</button>
                            </div>
                        </div>
                    </form>
                    <p class="mb-1">
                        <RouterLink :to="{ name: 'SignIn' }" class="text-center">I already have an
                            account</RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import { LoadingModal,MessageModal,CloseModal } from "@/functions/swal";
import { apiSignup } from '@/functions/api/auth';

let user = reactive({
    name:"",
    email:"",
    password:"",
    password_confirmation:""
})

let userErr=reactive({
     name:"",
    email:"",
    password:""
})

const route =useRouter();
const defaultUser=JSON.parse(JSON.stringify(user));
const defaultErr=JSON.parse(JSON.stringify(userErr));

function resetState(){
    Object.assign(user,defaultUser);
    Object.assign(userErr,defaultErr);
}

async function signUp() {
    try{
        LoadingModal("Signing Up");
        // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
        const response = await apiSignup(user);
        const { data } = response;
        resetState();
        
        return MessageModal({
            icon:"success",
            title:"Success",
            text:data.message
        },
        ()=>{
            route.replace({name:"SignIn"});
        }
    );
    }catch(error){
        const {response}=error;
        if(!response){
            return MessageModal({icon:"error",title:"Error",text: error.mesage});
        }
        const { status, data } = response;
        if (status === 422) {
            Object.keys(userErr).forEach((key) => {
                userErr[key] = data.errors[key]
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