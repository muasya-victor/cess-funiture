<script setup>

</script>

<template>
  <div class="h-full flex flex-col md:flex-row items-center justify-start gap-8 p-2">

    <div class="flex flex-col border h-full
     items-center justify-start gap-8 flex-1">
      product
    </div>

    <div class="flex w-1/2 flex-col h-full gap-8 py-8">
      <span class="font-bold">Method : Mpesa</span>
      <el-input-number style="width: 100%;" size="large" placeholder="amount"></el-input-number>
      <el-input size="large" placeholder="mpesa reference number"></el-input>
      <el-button class="w-full" type="warning" size="large">Complete Payment</el-button>
    </div>

  </div>

</template>

<style scoped>

</style>