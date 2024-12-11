<script setup lang="ts">
import {ArrowRight, Delete, Download, EditPen, Open} from "@element-plus/icons-vue";
import BaseDataTable from "@/components/base/BaseDataTable.vue";
import {reactive, ref, watch} from "vue"
import router from "@/router/index.js";
import store from "@/store/index.js";
import {FormInstance, FormRules} from "element-plus";
import {formatDate} from "@/utility/functions"
import BaseLoader from "@/components/base/BaseLoader.vue";

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules>({});
const columns = ref([
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "actions",
  },
]);




const form = ref({
  invoice_number:1020
})

const invoiceNumberFilter = ref('')
const backendUrl = ref('users')

watch(invoiceNumberFilter, (newFilterValue) => {
  if (newFilterValue) {
    // Ensure no slash before '?'
    backendUrl.value = `invoice-list?invoice_number=${newFilterValue}`;
    store.state.refreshData = true;
  } else {
    backendUrl.value = 'invoice-list';
    store.state.refreshData = false;
  }
});


const showValidatedInvoice = ref(false)
const validatedInvoicePdfUrl = ref('')
const selected_invoice_id = ref(null)
const submitLoading = ref(false);

const handleDialogClose = ()=> {
  showValidatedInvoice.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  store.state.submitLoading = true;
  console.log(form.value, 'form')
  validatedInvoicePdfUrl.value = '';

  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch("postData", {url: 'invoice',
        data:form.value}).then((response) => {
        if (selected_invoice_id.value != null){
          store.dispatch('patchData', {url: 'invoice', id: selected_invoice_id.value,
            data:{is_validated:true, validated_invoice_url: response.download_url}})
        }
        showValidatedInvoice.value = true;
        validatedInvoicePdfUrl.value = response.data?.download_url;
        store.state.submitLoading = false
      }).catch((err)=>{
        store.state.submitLoading = false
      })
    } else {
      store.state.submitLoading = false;
      showValidatedInvoice.value = true;
    }
    store.state.submitLoading = false;
  });
};

const downloadReport = () => {
  try {
    store.dispatch('downloadFirmData', {
      url: 'users/download/report',
    })
        .then((response) => {

        });
  } catch (error) {
    console.error("Error downloading report:", error);
  }
};

const authData = JSON.parse(localStorage.getItem("authData"));
const deleteUser = (id)=>{
  store.dispatch('deleteData',{id: id})
}


</script>

<template>
  <div class=" h-full w-full">
    <router-view/>


    <div v-if="store.state.submitLoading" class="h-full w-full flex justify-center items-center text-blue-500">
      <BaseLoader/>
    </div>


    <BaseDataTable
        :columns="columns"
        :show-other-items="true"
        create-route-name="create-user"
        :fetch-url="backendUrl"
        v-if="!store.state.submitLoading"
        title="Users">
      <template #otherItems>
        <el-button size="large" v-if="authData?.user?.user_type === 'furniture_store_owner'" @click="downloadReport" class="mb-2 mr-2">Download User Report</el-button>
        <el-button size="large" v-if="authData?.user?.user_type === 'admin'" @click="downloadReport" class="mb-2 mr-2">Download User Report</el-button>
      </template>

      <template v-slot:bodyCell="slotProps">

        <template v-if="slotProps.column.key === 'updated_date'">
          {{formatDate(slotProps.text)}}
        </template>

        <template v-if="slotProps.column.key === 'is_active'">
          <el-tag size="large" type="success" v-if="slotProps.text === true" class="capitalize">
            {{slotProps.text}}
          </el-tag>

          <el-tag type="danger" size="large" v-else class="capitalize">
            {{slotProps.text}}
          </el-tag>
        </template>

        <template v-if="slotProps.column.key === 'actions'">
          <ElButton type="primary"
                    @click="()=>{
                      router.push({name: 'edit-user', params:{id: slotProps?.text?.id}})
                    }"
                    size="default"
                    plain>
            <template #icon>
              <EditPen class="h-fit"/>
            </template>
            <template #default>Edit</template>
          </ElButton>

          <ElButton type="danger"
                    @click="deleteUser(slotProps?.text?.id)"
                    size="default"
                    plain>
            <template #default>Delete</template>
          </ElButton>
        </template>
      </template>
    </BaseDataTable>
  </div>

</template>

<style scoped>

</style>