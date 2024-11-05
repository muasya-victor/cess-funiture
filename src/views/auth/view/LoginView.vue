<script setup>

import AuthWrapper from "@/views/auth/ui/AuthWrapper.vue"
import LoginForm from "@/views/auth/forms/LoginForm.vue"

const googleCallback = ()=>{

}
</script>

<template>
<!--  <AuthWrapper>-->
<!--  </AuthWrapper>-->
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="w-full md:w-1/2">
      <LoginForm/>
    </div>

  </div>

</template>

<style scoped>

</style>