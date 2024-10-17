<script setup>

import {ArrowLeft, ArrowRight, ShoppingTrolley} from "@element-plus/icons-vue";
import CarCard from "@/views/car/CarCard.vue";
import router from "@/router/index.js";
import {ref, onMounted} from "vue"
import store from "@/store/index.js";

const viewCar = (id=1)=>{
  router.push({name:'car',params:{id:id}});
}

const filters = ref(['all'])

const getProducts = ()=>{
  store.dispatch('fetchList', {url:'products'})
      .then((res)=>{
        console.log(res.data, 'products')
      })
}

onMounted(()=>{
  getProducts()
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">

    <router-view/>

    <div class="h-[300px] md:h-[400px]  xl:h-[650px] flex flex-col items-start justify-center
     bg-cover bg-no-repeat bg-top bg-[url('/bg.jpg')] bg-opacity-80
      w-full bg-transparent relative">

      <div class=" h-fit w-full bg-transparent py-2 px-4 flex justify-between items-center">
        <div class="font-extrabold text-xl hidden md:flex w-[200px]">Cess Furniture</div>
        <div class="flex gap-4 h-fit items-center justify-between md:justify-end w-full">
          <span>Home</span>
          <span>Shop</span>
          <el-button type="primary" circle size="large" class="relative w-fit">
            <shopping-trolley class="h-6 w-6"/>
            <el-button type="warning" class="absolute -top-1 -right-3 cursor-text" circle size="small">0</el-button>
          </el-button>

          <el-button type="warning" plain round size="large">
            Sign In
          </el-button>
        </div>
      </div>

      <div class="mt-10 md:mt-0 w-full h-full text-gray-600 flex flex-col items-center justify-center
      ">
        <h3 class="text-4xl md:text-7xl font-extrabold text-orange-600 w-full text-center">
          Your Dream Furniture Store
        </h3>

        <p class="text-md text-black bg-gray-100 p-2 rounded">
          Office , Home & Kitchen funiture available
        </p>

        <el-button round type="warning" size="large" :icon="ShoppingTrolley">
          Shop
        </el-button>

      </div>
    </div>

    <div class="flex gap-2 px-2 flex-wrap justify-center items-center w-fit">
      <el-checkbox-group v-model="filters">
        <el-checkbox label="All" value="all" />
        <el-checkbox label="Living Room" value="Value A" />
        <el-checkbox label="Dining Room" value="Value A" />
        <el-checkbox label="Kitchen" value="Value B" />
        <el-checkbox label="Office" value="Value C" />
      </el-checkbox-group>

    </div>


    <!--    cards-->
    <div class="flex gap-2 flex-wrap items-center justify-start px-4">
      <car-card @click="viewCar" v-for="item in 5"/>
    </div>

    <div class="py-4 px-16 bg-gray-100 rounded-lg flex items-center justify-center w-fit text-center hidden">
      <div class="text-4xl font-extrabold text-orange-400">Your Dream Funiture</div>
    </div>

    <div class="p-4 w-full bg-gray-50 text-blue-500 flex items-center justify-between">
      <div class="font-extrabold text-xl text-orange-600">Cess Funiture</div>
      <div>Cess@2024</div>
    </div>

  </div>
</template>

<style scoped>

</style>