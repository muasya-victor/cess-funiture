<template>
  <div class="grid grid-cols-1 md:grid-cols-2 w-screen h-screen">
    <!-- Left side with welcome message, becomes a header on small screens -->
    <div class="flex flex-col justify-center items-center bg-yellow-400 w-full md:p-26 lg:p-32">
      <h1 class="text-3xl lg:text-4xl font-bold mb-4 text-yellow-900 w-full">Welcome to CESS Furniture</h1>
      <p class=" text-md lg:text-lg mb-4 px-4 lg:px-0">
        Discover high-quality furniture crafted to perfection. Our commitment to style and durability means you can enjoy your furniture for years to come.
      </p>
      <p class=" text-md lg:text-lg px-4 lg:px-0">
        Join us today and start exploring our wide range of products tailored to suit your lifestyle. Need an account? Register now!
      </p>
    </div>

    <!-- Right side with login form, centered and responsive -->
    <div class="flex items-center justify-center w-full  bg-primary-light p-4 lg:p-0">
      <el-form
          ref="ruleFormRef"
          :model="form"
          :rules="rules"
          class="w-full max-w-md p-6 "
          label-position="top"
      >
        <div class="font-extrabold text-2xl lg:text-3xl text-primary-dark mb-6">CESS FURNITURE</div>

        <el-form-item label="Username" prop="username">
          <el-input
              v-model="form.username"
              :prefix-icon="UserIcon"
              placeholder="Enter your email"
              size="large"
              class="rounded-md"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
              v-model="form.password"
              :prefix-icon="LockClosedIcon"
              placeholder="Enter your password"
              show-password
              size="large"
              type="password"
              class="rounded-md"
          />
        </el-form-item>

        <div class="flex w-full mt-6">
          <el-button
              :loading="loginLoading"
              class="w-full bg-primary hover:bg-primary-dark text-white font-semibold"
              size="large"
              style="border-radius: 4px"
              type="primary"
              @click="submitForm(ruleFormRef)"
          >
            Sign In
          </el-button>
        </div>

        <div class="text-sm mt-6">
          <span class="text-gray-500">Don’t have an account?</span>
          <router-link to="/register" class="text-accent hover:underline ml-1">Register</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { ElNotification, FormInstance, FormRules } from "element-plus";
import store from "@/store/index";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const form = reactive({
  username: "",
  password: ""
});
const loading = ref(false);
const loginLoading = ref(false);

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: {
    required: true,
    message: "Please enter your username",
    trigger: "blur"
  },
  password: {
    required: true,
    message: "Please enter your password",
    trigger: "blur"
  }
});

const submitForm = async (formEl: FormInstance | undefined) => {
  loginLoading.value = true;
  const cart = JSON.parse(localStorage.getItem("cart"));

  console.log('here')

  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      store
          .dispatch("postData", {
            url: "token/request",
            data: form
          })
          .then((resp) => {
            localStorage.setItem("authData", JSON.stringify(resp.data));
            loginLoading.value = false;
            if (!cart) {
              router.push({ name: "users" });
            }else {
              console.log("cart", cart);
              router.push({ name: "checkout" });
            }
          })
          .catch((err) => {
            loginLoading.value = false;
          });
    } else {
      loginLoading.value = false;
      Swal.fire({
        icon: "error",
        title: "Error",
        html: '<p class="text-red-400">Fill all required fields</p>',
        timer: 4000
      });
    }
    loading.value = false;
  });
};
</script>

<style scoped>
.bg-primary-light {
  background-color: #f0f4f8;
}
.text-primary-dark {
  color: #334e68;
}
.bg-primary {
  background-color: #007bff;
}
.bg-primary-dark {
  background-color: #0056b3;
}
.text-accent {
  color: #4a90e2;
}
.bg-yellow-400 {
  background-color: #fbbf24;
}
.text-yellow-900 {
  color: #92400e;
}
</style>
