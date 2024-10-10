<script setup>

</script>

<template>
  <div class="h-full flex flex-col items-center justify-start gap-8">
    <div class="w-full flex flex-col items-center justify-center gap-6">
      <img class=" h-auto w-full md:w-[30%]" alt="bugatti" src="/bg1.png">
    </div>

    <div class="flex flex-col md:grid md:grid-cols-2 w-full items-start justify-between gap-4 h-fit">
      <div class="flex flex-col items-center gap-2 border p-4 rounded-lg">
        <span class="font-bold text-2xl text-gray-500">Rent Cost</span>
        <span>KES 4,000</span>
      </div>

      <div class="flex flex-col items-center gap-2 border p-4 rounded-lg">
        <span class="font-bold text-2xl text-gray-500">Rent Period</span>
        <span>KES 4,000</span>
      </div>
    </div>

    <div class="flex flex-col items-center gap-2 w-full md:w-1/2">
      <span class="font-bold text-3xl text-blue-500">Payment Details</span>
      <span class="font-bold">Method : Mpesa</span>
      <el-input-number style="width: 100%;" size="large" placeholder="amount"></el-input-number>
      <el-input size="large" placeholder="mpesa reference number"></el-input>
      <el-button class="w-full" type="primary" size="large" round>Complete Payment</el-button>
    </div>

  </div>

</template>

<style scoped>

</style>