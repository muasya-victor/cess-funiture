<script setup>

import BaseDialog from "@/components/base/BaseDialog.vue";
import {ref,onMounted} from "vue"
import FurnitureViewer from "@/components/FurnitureViewer.vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";

const router = useRouter()
const route = useRoute()
const store = useStore()

const productObj = ref(null)

const getProduct = ()=>{
  store.dispatch("fetchSingleItem", {url:'products', id:route?.params?.furnitureId})
      .then((res)=>{
        productObj.value = res?.data
      });
}

onMounted(()=>{
  getProduct()
})

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
           <FurnitureViewer :product-object="productObj" :image-size="1.1" model-path="/InteriorTest.obj">
           </FurnitureViewer>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>