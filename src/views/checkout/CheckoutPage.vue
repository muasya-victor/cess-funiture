<script setup>
import {ref, onMounted} from "vue";
import store from "@/store"
import router from "@/router/index.js";

const cartProducts = ref([])
const formData = ref([])
const authData = JSON.parse(localStorage.getItem("authData"));

const attemptSubmit = () => {
  console.log('start')
  store.dispatch('postData', {
    url: 'carts',
    data: {
      items: cartProducts.value.map((item) => ({
        product: item.product.id,
        quantity: item.quantity
      })),
      customer: authData.user?.id
    }
  })
      .then((res) => {
        store.dispatch('postData', {
          url: 'payments', data: {
            customer: authData.user?.id,
            cart: res?.data?.id,
            amount: formData.value.amount,
            payment_method: "cash",
          }
        })
      })
      .then((resp) => {
        localStorage.removeItem("cart");
        router.push('/')
      })
};


const getCartProducts = ()=>{
  cartProducts.value = JSON.parse(localStorage.getItem('cart')) || [];
}

function formatCurrency(amount, currency = 'KES', locale = 'en-US', decimalPlaces = 2) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
}

function calculateTotalCost() {
  // Initialize total value to 0
  let value = 0;

  // Check if there are products in the cart
  if (cartProducts.value.length < 1) {
    return value;
  }

  // Calculate total by iterating through cartProducts
  return cartProducts.value.reduce((total, product) => {
    const price = product.product?.product_price || 0;
    const quantity = product.quantity || 1;
    return total + price * quantity;
  }, 0);
}

onMounted(()=>{
  getCartProducts()
})
</script>

<template>
  <div class="h-full flex flex-col md:flex-row items-center justify-start gap-8 p-2">

    <div class="flex flex-col border-r h-full
     items-center justify-start gap-8 flex-1 p-2">
      <div class="border flex items-center justify-between gap-2 p-4 w-full rounded" v-for="product in cartProducts" :key="product.product.id">
        <span class="capitalize font-bold text-lg">{{product.product?.product_name}}</span>

        <span>{{formatCurrency(product.product?.product_price)}}</span>

        <el-input-number v-model="product.quantity"></el-input-number>
      </div>
    </div>

    <div class="flex w-1/2 flex-col h-full gap-8 py-8">
      <span class="font-bold text-2xl">Mpesa</span>

      <span class="font-bold">Total Cost : {{formatCurrency(calculateTotalCost())}}</span>

      <el-input-number style="width: 100%;" v-model="formData.amount" size="large" placeholder="amount"></el-input-number>
      <el-button class="w-full" type="warning" html-type="submit" @click="attemptSubmit" size="large">Complete Payment</el-button>
    </div>

  </div>

</template>

<style scoped>

</style>