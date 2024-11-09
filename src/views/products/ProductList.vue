<script setup lang="ts">
import { ArrowRight, Delete, Download, EditPen, Open } from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import { reactive, ref, watch } from "vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import { FormInstance, FormRules } from "element-plus";
import BaseLoader from "@/components/base/BaseLoader.vue";

const authData = JSON.parse(localStorage.getItem("authData")) || {}

const columns = ref([
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Description",
    dataIndex: "product_description",
    key: "product_description",
  },
  {
    title: "Price (Ksh)",
    dataIndex: "product_price",
    key: "product_price",
  },
  {
    title: "Inventory",
    dataIndex: "product_inventory",
    key: "product_inventory",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const backendUrl = ref('products');

const deleteProduct = (id)=>{
  store.dispatch('deleteData', {
    url: `products`,
    id:id
  })
}

</script>

<template>
  <div class="h-full w-full">
    <router-view/>

    <div v-if="store.state.submitLoading" class="h-full w-full flex justify-center items-center text-blue-500">
      <BaseLoader/>
    </div>


    <BaseDataTable
        :columns="columns"
        show-other-items
        :fetch-url="backendUrl"
        title="Products">
      <template v-if="authData?.user?.user_type === 'admin'" #otherItems>
        <router-link :to="{name:'create-product'}">
          <el-button size="large" type="primary" plain>+</el-button>
        </router-link>
      </template>
      <template v-slot:bodyCell="slotProps">
        <template v-if="slotProps.column.key === 'product_price'">
          Ksh {{ slotProps?.text?.toLocaleString() || 'N/A' }}
        </template>

        <template v-if="slotProps.column.key === 'product_inventory'">
          <el-tag size="large" type="info" v-if="slotProps?.text > 0">
            {{ slotProps?.text }} in stock
          </el-tag>
          <el-tag type="danger" size="large" v-else>
            Out of stock
          </el-tag>
        </template>
        <template v-if="slotProps.column.key === 'actions' && authData?.user?.user_type === 'admin'">
          <ElButton
              type="primary"
              @click="() => {
        router.push({ name: 'edit-product', params: { id: slotProps?.text?.id } });
      }"
              size="default"
              plain
          >
            <template #icon>
              <EditPen class="h-fit" />
            </template>
            <template #default>Edit</template>
          </ElButton>
          <ElButton
              type="danger"
              @click="deleteProduct(slotProps?.text?.id) "
              size="default"
              plain
          >
            <template #icon>
              <delete class="h-fit" />
            </template>
            <template #default>Delete</template>
          </ElButton>
        </template>
      </template>

    </BaseDataTable>
  </div>
</template>

<style scoped>
</style>
