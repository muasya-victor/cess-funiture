<script setup>

import {ArrowLeft, ArrowRight} from "@element-plus/icons-vue";
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="h-[300px] md:h-[400px]  xl:h-[650px] flex flex-col items-start justify-center
     bg-cover bg-no-repeat bg-top bg-[url('/bg4.jpg')]
      w-full bg-blue-500 relative">

      <div class="absolute shadow top-0 md:top-10 left-1/2 transform -translate-x-1/2 w-full md:w-[90%] h-fit
       ms:rounded-full bg-gray-100 py-2 px-4 flex justify-between items-center">
        <div class="font-extrabold text-xlx  text-gray-800">MACAR</div>
        <div class="flex gap-4 h-fit items-center">
          <span>Home</span>
          <span>Pricing</span>
          <el-button type="primary" round size="large">Get Started</el-button>
        </div>
      </div>

      <div class="mt-10 md:mt-0 w-full h-full text-gray-600 flex flex-col items-center justify-center bg-white bg-opacity-80">
        <h3 class="text-4xl md:text-7xl font-extrabold text-gray-900 w-full text-center">The Best Platform for Car Rental</h3>

        <p class="text-md">Experience Luxury</p>

        <el-button round type="primary" size="large" :icon="ArrowRight">
          Explore Our Garage
        </el-button>

      </div>
    </div>

    <div class="flex gap-2 px-2 flex-wrap justify-center items-center w-fit">
<!--      <div class="h-12 w-fit px-4 border border-gray-100 rounded-lg flex items-center justify-center">-->
<!--        Toyota-->
<!--      </div>-->

      <el-button size="large">Toyota</el-button>
      <el-button size="large">Subaru</el-button>
      <el-button size="large">BMW</el-button>
      <el-button size="large">Kia</el-button>
      <el-button size="large">RollsRoys</el-button>

    </div>


    <!--    cards-->
    <div class="flex gap-2 flex-wrap items-center justify-start px-4">
      <div v-for="item in 10"
          class="flex flex-col gap-4 px-4">
        <div class="w-[330px] h-[200px] border rounded-lg flex flex-col justify-between p-4">
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
    </div>

    <!--    cards-->

    <el-button type="info" round size="large" :icon="ArrowRight">Explore Our Garage</el-button>

    <div class="py-4 px-16 bg-gray-100 rounded-lg flex items-center justify-center w-fit text-center hidden">
      <div class="text-4xl font-extrabold text-orange-400">Best Car Dealers / Renters in Kenya</div>
    </div>

    <div class="p-4 w-full bg-black text-white flex items-center justify-between">
      <div class="font-extrabold text-xlx">MACAR</div>
      <div>Gacheru Limited</div>
    </div>

  </div>
</template>

<style scoped>

</style>