<script setup>
import FurnitureViewer from "@/components/FurnitureViewer.vue";
import {computed, ref} from "vue"

const props = defineProps({
  productObject : {
    type: Object,
    default : {
      product_name:'',
      YOF:'',
      rate:'800',
      avatar:'',
      product_image:'/bg.jpg'
    }
  }
})

const backgroundImageStyle = computed(() => ({
  backgroundImage: `url(${props.productObject.product_image})`,
}));
</script>

<template>
  <div class="flex flex-col gap-4 cursor-pointer w-full md:w-fit hover:p-2 border">
    <div
        :style="backgroundImageStyle"
        class="w-full md:w-[330px] h-[200px] border flex bg-center bg-cover
        flex-col justify-between hover:bg-gray-50 hover:shadow">
      <div
          class="w-full  flex justify-end items-center relative">
        <div
            class="absolute top-0 left-0 flex items-center gap-2 p-1">
          <el-tag v-if="productObject?.product_inventory < 1" type="danger">Out Of Stock</el-tag>
          <el-tag v-else type="success">100 In Stock</el-tag>
        </div>
      </div>

      <div class="flex flex-col gap-2 w-full bg-white opacity-60 p-2">
        <h3 class="text-gray-500">{{productObject?.product_name}}</h3>
        <div class="flex justify-between font-bold">
          <div>KES {{productObject?.product_price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>