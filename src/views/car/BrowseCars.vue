<script setup lang="ts">
import { ref } from 'vue'
import CarCard from "@/views/car/CarCard.vue";
import {useRouter} from "vue-router";
const checkAll = ref(false)
const showFilters = ref(false)

const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Toyota', 'Mercedes', 'Tesla']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

const router = useRouter()

const rentCar = (id)=>{
  router.push({name: 'rent-car', params: {id: 1 }})
}
</script>

<template>
  <div class="md:p-4 py-4 h-full w-full flex flex-col md:flex-row gap-4">

    <router-view/>

    <div class="flex flex-col gap-2 h-full w-full md:w-[300px] pb-2 md:border-r md:pr-2">
      <div class="font-semibold text-lg">Filters</div>

      <div class="text-blue-500 mt-2">By Make</div>
      <div class=" w-full">
        <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
            {{ city }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="text-blue-500 mt-2">By Year</div>
      <div class=" w-full">
        <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
            {{ city }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="text-blue-500 mt-2">By Name</div>
      <el-input placeholder="search by name" size="large"/>
    </div>

    <div class="h-fit w-full flex flex-wrap items-start justify-start gap-4 gap-y-4">
      <CarCard @click="rentCar" v-for="item in 10" :key="item"/>
    </div>
  </div>

</template>

<style scoped>

</style>