<script setup>
import BaseDialog from "@/components/base/BaseDialog.vue";
import { ref, onMounted } from "vue";
import FurnitureViewer from "@/components/FurnitureViewer.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const productObj = ref(null);
const modelUrl = ref(null); // URL for the 3D model Blob
const loading = ref(true);

const getProduct = async () => {
  try {
    const res = await store.dispatch("fetchSingleItem", {
      url: "products",
      id: route?.params?.furnitureId,
    });

    productObj.value = res?.data;

    // Fetch the 3D model as a Blob if `product_3D_object` exists
    if (productObj.value?.product_3D_object) {
      const response = await fetch(productObj.value.product_3D_object);
      const modelBlob = await response.blob();
      modelUrl.value = URL.createObjectURL(modelBlob); // Create a Blob URL
    }

    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch product or model:", error);
  }
};

onMounted(() => {
  getProduct();
});
</script>

<template>
  <BaseDialog>
    <template #title>
      <div class="flex items-center gap-2">
        <div class="h-full font-bold flex items-center text-center justify-center text-xl">
          Living Room
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4">
        <div class="w-full flex flex-col items-center justify-center gap-6">
          <!-- Render FurnitureViewer only when loading is complete and modelUrl is ready -->
          <FurnitureViewer
              :product-object="productObj"
              :image-size="1.1"
              :model-path="modelUrl"
          />
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>
</style>
