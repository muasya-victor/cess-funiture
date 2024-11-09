<script setup lang="ts">
import { ArrowRight, Delete, Download, EditPen, Open } from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import { reactive, ref, watch } from "vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import { FormInstance, FormRules } from "element-plus";
import BaseLoader from "@/components/base/BaseLoader.vue";

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});
const columns = ref([
  {
    title: "Category Name",
    dataIndex: "category_name",
    key: "category_name",
  },
  {
    title: "Description",
    dataIndex: "category_description",
    key: "category_description",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);

const categoryFilter = ref('');
const backendUrl = ref('categories');

watch(categoryFilter, (newFilterValue) => {
  if (newFilterValue) {
    backendUrl.value = `categories?category_name=${newFilterValue}`;
    store.state.refreshData = true;
  } else {
    backendUrl.value = 'categories';
    store.state.refreshData = false;
  }
});

const submitLoading = ref(false);

const submitForm = async (formEl: FormInstance | undefined) => {
  store.state.submitLoading = true;
  console.log(form.value, 'form');

  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      // Handle category submission if needed
      store.state.submitLoading = false;
    } else {
      store.state.submitLoading = false;
    }
  });
};
</script>

<template>
  <div class="h-full w-full">
    <router-view/>

    <div v-if="store.state.submitLoading" class="h-full w-full flex justify-center items-center text-blue-500">
      <BaseLoader/>
    </div>

    <BaseDataTable
        :columns="columns"
        :show-other-items="true"
        :fetch-url="backendUrl"
        v-if="!store.state.submitLoading"
        title="Product Categories">
      <template v-slot:bodyCell="slotProps">
        <template v-if="slotProps.column.key === 'actions'">
          <ElButton type="primary"
                    @click="() => {
                      router.push({ name: 'edit-category', params: { id: slotProps?.text?.id } });
                    }"
                    size="default"
                    plain>
            <template #icon>
              <EditPen class="h-fit"/>
            </template>
            <template #default>Edit</template>
          </ElButton>
        </template>
      </template>
    </BaseDataTable>
  </div>
</template>

<style scoped>
</style>
