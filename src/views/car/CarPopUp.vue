<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import router from "@/router/index.js";
import {ref} from "vue"
import FurnitureViewer from "@/components/FurnitureViewer.vue";
const attemptSubmit = ()=>{
  router.push({name:'login'})
}

const dateRange = ref('')
</script>

<template>
  <BaseDialog>
    <template #title>
      <div class="flex items-center gap-2">
        <div class="h-full font-bold flex items-center text-center justify-center text-xl">Living Room</div>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4">

        <div class="w-full flex flex-col items-center justify-center gap-6">
<!--          <img class=" h-auto w-96" alt="bugatti" src="/bg1.png">-->
           <FurnitureViewer :image-size="1.1" model-path="/InteriorTest.obj"></FurnitureViewer>
<!--           <FurnitureViewer :image-size="1.1" model-path="/FinalBaseMesh.obj"></FurnitureViewer>-->
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>