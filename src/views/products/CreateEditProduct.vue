<template>
  <BaseDialog>
    <template #title>
      Product
    </template>

    <template #content>
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full flex flex-col gap-4"
          label-position="top"
      >
        <el-form-item label="Product Name" prop="product_name"
                      :rules="[{
                        required: true,
                        message: 'Please input product name',
                        trigger: 'blur'
                      }]">
          <el-input
              v-model="form.product_name"
              placeholder="Product name"
              size="large"
          />
        </el-form-item>

        <el-form-item label="Product Description" prop="product_description"
                      :rules="[{
                        required: true,
                        message: 'Please input product description',
                        trigger: 'blur'
                      }]">
          <el-input
              v-model="form.product_description"
              placeholder="Product description"
              size="large"
          />
        </el-form-item>

        <el-form-item label="Product Price" prop="product_price"
                      :rules="[{
                        required: true,
                        message: 'Please input product price',
                        trigger: 'blur'
                      }]">
          <el-input
              v-model="form.product_price"
              placeholder="Product price"
              size="large"
              type="number"
          />
        </el-form-item>

        <el-form-item label="Product Inventory" prop="product_inventory"
                      :rules="[{
                        required: true,
                        message: 'Please input product inventory',
                        trigger: 'blur'
                      }]">
          <el-input
              v-model="form.product_inventory"
              placeholder="Product inventory"
              size="large"
              type="number"
          />
        </el-form-item>



        <el-form-item label="Product Category" prop="product_category"
                      :rules="[{
                        required: true,
                        message: 'Please select product category',
                        trigger: 'change'
                      }]">
          <el-select
              v-model="form.product_category"
              @focus="fetchProducts"
              :loading="categoriesLoading"
              placeholder="Select product category"
              size="large"
          >
            <!-- Example category options, adjust according to your categories -->
            <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
            />
          </el-select>
        </el-form-item>

        <div class="flex w-full">
          <el-button
              :loading="submitLoading"
              class="w-full"
              size="large"
              style="border-radius: 4px"
              type="primary"
              @click="submitForm"
          >
            Submit
          </el-button>
        </div>
      </el-form>
    </template>
  </BaseDialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { FormInstance } from 'element-plus/es/components/form'; // Correct import for FormInstance
import { FormRules } from "element-plus";
import store from "@/store/index";
import router from "@/router/index";
import Swal from "sweetalert2";
import BaseDialog from "@/components/base/BaseDialog.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const submitLoading = ref(false);
const categories = ref([]);

// Use ref for form data
const form = ref({
  product_name: "",
  product_description: "",
  product_price: 0,
  product_inventory: 0,
  product_category: 0
});

const formRef = ref<FormInstance | null>(null); // Use ref for form instance
const rules = reactive<FormRules>({
  product_name: {
    required: true,
    message: "Please input product name",
    trigger: "blur"
  },
  product_description: {
    required: true,
    message: "Please input product description",
    trigger: "blur"
  },
  product_price: {
    required: true,
    message: "Please input product price",
    trigger: "blur"
  },
  product_inventory: {
    required: true,
    message: "Please input product inventory",
    trigger: "blur"
  },
  product_category: {
    required: true,
    message: "Please select a product category",
    trigger: "blur"
  }
});

const imageFileList = ref([]);
const objectFileList = ref([]);
const categoriesLoading = ref(false);


// Submit form logic
const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;


  if (route?.name === "edit-product") {
    store.dispatch("patchData", {
      url: `products`,
      data: form.value,
      id:route.params.id
    }).then(() => {
      submitLoading.value = false;
      router.push({ name: "product" });
    }).catch(() => {
      submitLoading.value = false;
    });
  } else {
    store.dispatch("postData", {
      url: "products",
      data: form.value
    }).then(() => {
      submitLoading.value = false;
      router.push({ name: "product" });
    }).catch(() => {
      submitLoading.value = false;
    });
  }
};

// Fetch product data for editing
const getOnMount = () => {
  if (route?.name === "edit-product") {
    store.dispatch("fetchSingleItem", {
      url: "products",
      id: route.params.id
    }).then((res) => {
      form.value, res?.data
    });
  }
};

const fetchProducts = ()=>{
  categoriesLoading.value = true
  store.dispatch("fetchList", {
    url: "categories"
  }).then((res) => {
    categories.value = res.data?.results
    categoriesLoading.value = false
  })
      .catch(()=>{
        categoriesLoading.value = false
      });
}

onMounted(() => {
  getOnMount();
});
</script>


<style scoped></style>
