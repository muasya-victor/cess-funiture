<script setup>
const props = defineProps({
  carObject : {
    type: Object,
    default : {
      name:'',
      YOF:'',
      rate:'800',
      avatar:''
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 cursor-pointer ">
    <div class="w-[330px] h-[200px] border rounded-lg flex flex-col justify-between p-4 hover:bg-gray-50 hover:shadow">
      <div class="w-full flex justify-end items-center relative">
        <div class="absolute top-0 left-0 flex items-center gap-2 p-1">
          <el-tag type="warning">New</el-tag>
          <el-tag type="success">Available</el-tag>
        </div>
        <img class="absolute -top-8 -right-6 h-auto w-72" alt="bugatti" src="/bg1.png">
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-gray-500">Bugatti Chevron</h3>
        <div class="flex justify-between font-bold">
          <div>Chevron,2021</div>
          <div>KES 800/hour</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>