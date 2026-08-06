<template>
    <h1>SignIn</h1>
    <button @click="goToDashboard">Go to Dashboard</button>
    <br>
    <br>
    <br>
    <button @click="goToSignUp">Go to Sign Up</button>

</template>
<script setup>
import { useRouter } from 'vue-router';
const router =useRouter();

function goToDashboard() {
    router.replace('/dashboard')
}

// replace to a named route
function goToSignUp() {
    router.replace({ name: 'SignUp' })
}

</script>