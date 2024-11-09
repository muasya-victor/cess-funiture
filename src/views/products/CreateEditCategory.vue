<template>
  <BaseDialog>
    <template #title>
      Product Category
    </template>

    <template #content>
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full flex flex-col gap-4"
          label-position="top"
      >
        <el-form-item label="Category Name" prop="category_name"
                      :rules="[{
                        required: true,
                        message: 'Please input category name',
                        trigger: 'blur'
                      }]"
        >
          <el-input
              v-model="form.category_name"
              placeholder="Category name"
              size="large"
          />
        </el-form-item>
        <el-form-item label="Description" prop="category_description"
                      :rules="[{
                        required: true,
                        message: 'Please input category description',
                        trigger: 'blur'
                      }]"
        >
          <el-input
              v-model="form.category_description"
              placeholder="Description"
              size="large"
          />
        </el-form-item>

        <div class="flex w-full">
          <el-button
              :loading="submitLoading"
              class="w-full"
              size="large"
              style="border-radius: 4px"
              type="primary"
              @click="submitForm(ruleFormRef)"
          >
            Submit
          </el-button>
        </div>
      </el-form>
    </template>

  </BaseDialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import store from "@/store/index";
import router from "@/router/index";
import Swal from "sweetalert2";
import BaseDialog from "@/components/base/BaseDialog.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const submitLoading = ref(false);

const form = reactive({
  category_name: "",
  category_description: ""
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  category_name: {
    required: true,
    message: "Please input category name",
    trigger: "blur"
  },
  category_description: {
    required: true,
    message: "Please input category description",
    trigger: "blur"
  }
});

const submitForm = async (formEl: FormInstance | undefined) => {
  submitLoading.value = true;
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      if (route?.name === "edit-category") {
        // Edit existing category
        store
            .dispatch("patchData", {
              url: "categories",
              data: form,
              id: route.params.id
            })
            .then(() => {
              submitLoading.value = false;
              router.push({ name: "product-category" });
            })
            .catch(() => {
              submitLoading.value = false;
            });
      } else {
        // Create new category
        store
            .dispatch("postData", {
              url: "categories",
              data: form
            })
            .then(() => {
              submitLoading.value = false;
              router.push({ name: "product-category" });
            })
            .catch(() => {
              submitLoading.value = false;
            });
      }
    } else {
      submitLoading.value = false;
      Swal.fire({
        icon: "error",
        title: "Error",
        html: '<p class="text-red-400">Fill All required Fields</p>',
        timer: 4000
      });
    }
  });
};

// Fetch category data if in edit mode
const getOnMount = () => {
  if (route?.name === "edit-category") {
    store.dispatch("fetchSingleItem", {
      url: "categories",
      id: route.params.id
    }).then((res) => {
      Object.assign(form, res?.data);
    });
  }
};

onMounted(() => {
  getOnMount();
});
</script>

<style scoped></style>
