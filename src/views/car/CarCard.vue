<script setup>
import FurnitureViewer from "@/components/FurnitureViewer.vue";
import {computed, ref} from "vue"

const props = defineProps({
  carObject : {
    type: Object,
    default : {
      name:'',
      YOF:'',
      rate:'800',
      avatar:'',
      bgUrl:'/bg.jpg'
    }
  }
})

const backgroundImageStyle = computed(() => ({
  backgroundImage: `url(${props.carObject.bgUrl})`,
}));
</script>

<template>
  <div class="flex flex-col gap-4 cursor-pointer w-full md:w-fit">
    <div
        :style="backgroundImageStyle"
        class="w-full md:w-[330px] h-[200px] border rounded-lg flex bg-center bg-cover
        flex-col justify-between hover:bg-gray-50 hover:shadow">
      <div
          class="w-full  flex justify-end items-center relative">
        <div
            class="absolute top-0 left-0 flex items-center gap-2 p-1">
          <el-tag type="danger">Out Of Stock</el-tag>
          <el-tag type="success">100 In Stock</el-tag>
        </div>
      </div>

      <div class="flex flex-col gap-2 w-full bg-white opacity-60 p-2">
        <h3 class="text-gray-500">2 Seater Sofa</h3>
        <div class="flex justify-between font-bold">
          <div>KES 3,000</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>