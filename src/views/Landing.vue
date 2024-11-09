<script setup>

import {ShoppingTrolley} from "@element-plus/icons-vue";
import CarCard from "@/views/car/CarCard.vue";
import router from "@/router/index.js";
import {ref, onMounted} from "vue"
import store from "@/store/index.js";

const viewCar = (id)=>{
  router.push({name:'furniture',params:{furnitureId:id}});
}

const filters = ref(['all'])

const products = ref([])

const getProducts = ()=>{
  store.dispatch('fetchList', {url:'products'})
      .then((res)=>{
        products.value = res?.data?.results
      })
}

const addToCart = (product)=>{
  localStorage.setItem("cartData", product);
}

onMounted(()=>{
  getProducts()
})
</script>

<template>
  <div class="flex h-screen flex-col items-center gap-6 bg-gray-50">

    <router-view/>

    <div class="h-[300px] md:h-[400px]  xl:h-[650px] flex flex-col items-start justify-center
     bg-cover bg-no-repeat bg-top bg-[url('/bg.jpg')] bg-opacity-80
      w-full bg-transparent relative">

      <div class="bg-yellow-200  h-fit w-full py-2 px-4 flex justify-between items-center">
        <div class="font-extrabold text-xl hidden md:flex w-[200px]">Cess Furniture</div>
        <div class="flex gap-4 h-fit items-center justify-between md:justify-end w-full">
          <router-link to="/">Home</router-link>
          <router-link to="/contact">Contact Us</router-link>
          <el-button type="primary" circle size="large" class="relative w-fit">
            <shopping-trolley class="h-6 w-6"/>
            <el-button type="warning" class="absolute -top-1 -right-3 cursor-text" circle size="small">0</el-button>
          </el-button>

          <router-link to="/login">
            <el-button type="warning" plain round size="large">
              Sign In
            </el-button>
          </router-link>

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

      </div>
    </div>

    <!--    cards-->
    <div class="flex flex-1 gap-2 flex-wrap items-start justify-start px-4 w-full">
      <car-card @click="viewCar(product?.id)" v-for="product in products" :product-object="product" />
    </div>

    <div class="p-4 w-full bg-yellow-200 text-blue-500 flex items-center justify-between">
      <div class="font-extrabold text-xl text-orange-600">Cess Funiture</div>
      <div>Cess@2024</div>
    </div>

  </div>
</template>

<style scoped>

</style>