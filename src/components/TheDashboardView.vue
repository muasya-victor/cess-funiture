<script setup>

import {ref} from "vue"
import TheSideNav from "@/components/TheSideNav.vue";
import {PriceTag, Tools, User, UserFilled, WalletFilled} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {deleteLocalStorageInformation} from "@/utility/functions.js";
import {useRouter, useRoute} from "vue-router";
const store = useStore()
const router = useRouter()
import {watch, computed} from "vue"

const breadcrumbStyle = computed(() => {
  return {
    'separator-color': store.getters.getLightMode ? '#ffd04b' : '#ffd04b'
  };
});

const routerViewStyle = computed(() => {
  return {
    // Add dynamic styles based on the theme
    color: store.getters.getLightMode ? 'gray' : 'white',
    backgroundColor: store.getters.getLightMode ? 'white' : 'gray',
    // Add any other styles you want to apply
  };
});

const authoriseQuickBooks = async () => {
  store.dispatch('fetchList', {url:'get-url'}).then(res=>{
    router.push({product_name:'authorise-quickbooks'})
  })
};

const logout = ()=>{
  deleteLocalStorageInformation()
  router.replace({name:'login'})
}
const authData = JSON.parse(localStorage.getItem("authData")) || {}

const route = useRoute();
const breadcrumbs = ref([]);

const updateBreadcrumbs = () => {
  breadcrumbs.value = route.matched.map(route => ({
    path: route.path,
    label: route.meta.slug || route.name
  }));
};

watch(route, updateBreadcrumbs, { immediate: true });

</script>

<template>
  <div class=" flex flex-col  min-w-full  h-screen items-center">
    <div class="w-full flex border-b items-center
     justify-between gap-4 py-2 px-4 ">

      <div class="hidden h-fit w-[150px]  md:flex items-center  text-center text-xl font-bold text-orange-600">
        Cess Furniture
      </div>

      <div class="w-full flex items-center justify-start h-fit p-0">

        <div class="w-full flex items-center gap-4 h-fit p-0">

          <router-link class="flex items-center gap-2 text-blue-600" :to="{name: 'users'}">Users <user-filled class="h-4 w-4"/> </router-link>
          <router-link class="flex items-center gap-2 " :to="{name: 'landing'}">Shop<tools class="h-4 w-4"/> </router-link>
          <router-link v-if="authData?.user?.user_type === 'admin'" class="flex items-center gap-2 " :to="{name: 'products'}">
            Products<price-tag class="h-4 w-4"/> </router-link>
          <router-link v-if="authData?.user?.user_type === 'admin'" class="flex items-center gap-2 " :to="{name: 'product-category'}">
            Product Categories
            <wallet-filled class="h-4 w-4"/> </router-link>
        </div>



        <el-popover
            placement="bottom"
            title="Profile"
            :width="200"
            trigger="click"
            content="this is content, this is content, this is content"
        >
          <template #reference>
            <!--            <div size="default" class="cursor-pointer font-extrabold flex gap-2 h-12 px-2  w-fit rounded text-white items-center justify-center"  >-->
            <!--              <span>{{authData?.user?.first_name[0]}}</span> <span>{{authData?.user?.last_name[0]}}</span>-->
            <!--            </div>-->
            <div class="font-bold rounded-md border border-gray-200 shadow-sm hover:shadow-lg h-[30px] w-[30px] md:w-fit md:h-fit p-0 md:p-2 flex items-center justify-center cursor-pointer">
              <div class="flex p-0 items-center w-full h-fit text-center justify-center">
                <span class="capitalize" v-if="authData && authData.user">{{authData.user.email[0]}}</span>
                <span v-else>User</span>
              </div>
            </div>

          </template>

          <template #default>
            <div class="w-full border-t flex flex-col gap-2 py-2">
              <div class="flex flex-col p-2 bg-gray-100 capitalize items-center justify-center hover:bg-gray-200 cursor-pointer rounded-md">
                <p class="w-full">
                  {{authData?.user?.first_name}} {{authData?.user?.last_name}}

                </p>
                <p class="w-full" >
                  {{authData?.user?.phone_country_code}}
                  {{authData?.user?.phone_local_number}}
                </p>
              </div>
<!--              <el-button type="primary"-->
<!--                         size="large"-->
<!--                  @click="authoriseQuickBooks"-->
<!--                  class="w-full">-->
<!--                Authorise Quickbooks-->

<!--                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">-->
<!--                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />-->
<!--                </svg>-->
<!--              </el-button>-->

              <button
                  @click="logout"
                  class="w-full p-3 h-10 rounded-md flex items-center justify-center gap-2 hover:text-lg bg-red-500 text-white">
                logout

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          </template>
        </el-popover>
      </div>


      <div class="sm:flex items-center border-b md:hidden ">
        <el-button class="w-[40px] bg-amber-600" size="large"
                   @click="store.state.ShowMobileMenu = !store.state.ShowMobileMenu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </el-button>
      </div>

    </div>
    <!--    end top nav-->

    <div class="flex flex-1 w-full pr-2 overflow-y-auto">
<!--      <div class="hidden md:block z-50">-->
<!--        <TheSideNav/>-->
<!--      </div>-->

      <div :style="routerViewStyle" class="flex-1 p-2 md:pt-0 bg-gray-50
        overflow-x-hidden ">

        <div class="bg-gray-50 h-full w-full">
          <router-view :style="routerViewStyle"/>
        </div>

      </div>

    </div>

    <div class="py-2 border w-full text-center text-xs bg-gray-200 text-gray-500">
      system by
      <a href="mailto:vicmwe184@gmail.com?subject=Interested%20in%20System%20Development&body=Hello%20Victor,%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20the%20possibility%20of%20you%20developing%20a%20system%20for%20my%20business.%20Please%20let%20me%20know%20how%20we%20can%20move%20forward.%0D%0A%0D%0ABest%20regards,"
         target="_blank">Muasya</a>

    </div>
  </div>
  <TheSideNav v-if="store.state.ShowMobileMenu"/>

</template>

<style scoped>

</style>