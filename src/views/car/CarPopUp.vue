<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import router from "@/router/index.js";

const attemptSubmit = ()=>{
  router.push({name:'login'})
}
</script>

<template>
  <BaseDialog>
    <template #title>
      <div class="flex items-center gap-2">
        <div class="h-full font-bold flex items-center text-center justify-center text-xl">Bugatti Chevron</div>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4">

        <div class="w-full flex flex-col items-center justify-center gap-6">
          <img class=" h-auto w-96" alt="bugatti" src="/bg1.png">
        </div>

        <div class="flex flex-col gap-2 border-b">
          <span class="font-bold text-lg text-gray-500">About This Car</span>
          <span>4 Seater</span>
        </div>

        <div class="flex flex-col gap-2 border-b">
          <span class="font-bold text-lg text-gray-500">Capacity</span>
          <span>4 Seater</span>
        </div>

        <div class="flex flex-col gap-2 border-b">
          <span class="font-bold text-lg text-gray-500">Fuel Consumption</span>
          <span>2000cc</span>
        </div>

        <el-button size="large" type="success" plain class="" round @click="attemptSubmit">Rent This Car</el-button>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>