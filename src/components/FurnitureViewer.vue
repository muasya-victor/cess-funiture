<template>
  <div class="flex items-center justify-start gap-8 w-full flex-wrap md:flex-nowrap h-fit p-4">
    <!-- Model Display Section -->
    <div class="flex flex-col w-full items-center md:w-fit gap-4 border border-gray-200 rounded-lg p-2">
      <div ref="mountRef" class="model-viewer w-fit"></div>

      <div class="flex flex-row items-center justify-between gap-4 w-full">
        <el-button size="large" class="w-fit m-0" @click="zoomIn">
          <span class="pr-2">zoom</span>
          <plus class="h-4 w-4"/>
        </el-button>
        <el-button size="large" class="w-fit m-0" @click="zoomOut">
          <span class="pr-2">zoom</span>
          <minus class="h-4 w-4"/>
        </el-button>
      </div>
    </div>

    <!-- Details Section -->
    <div class="flex flex-col-reverse gap-8 h-full justify-between items-between">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold text-blue-400">Add To Cart</h1>
        <el-input-number v-model="quantity" style="width: 100%" class="w-full" size="large" :min="1" placeholder="1"/>

        <el-button type="warning" size="large" @click="addToCart">Proceed To Purchase</el-button>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold text-blue-400">Description</span>
        <span>
          The living room is a cozy yet elegant space designed for relaxation and social interaction, featuring a plush sectional sofa adorned with colorful throw pillows, a chic coffee table, and a soft area rug that anchors the seating arrangement. Large windows allow natural light to flood the room, highlighting the tasteful decor, including framed artwork and indoor plants that add a touch of greenery.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Minus, Plus } from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

export default {
  components: { Minus, Plus },
  props: {
    modelPath: {
      type: String,
      required: true,
    },
    imageSize: {
      type: Number,
      default: 0.8,
    },
    productObject : {
      type:Object,
      required: true
    }
  },
  data() {
    return {
      camera: null,
      zoomFactor: 1,
      quantity: 1,  // Used for the 'Add to Cart' section
      router: useRouter()
    };
  },
  mounted() {
    this.initThreeJS();
  },
  beforeDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
  methods: {
    zoomIn() {
      this.zoomFactor += 0.1;
      this.updateCameraZoom();
    },
    zoomOut() {
      this.zoomFactor = Math.max(0.1, this.zoomFactor - 0.1);
      this.updateCameraZoom();
    },
    updateCameraZoom() {
      if (this.camera) {
        this.camera.position.z = 10 / this.zoomFactor;
        this.camera.updateProjectionMatrix();
      }
    },
    initThreeJS() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      // Initialize camera
      this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      this.camera.position.set(0, 0, 10);

      // Set up renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.setRendererSize();
      this.$refs.mountRef.appendChild(this.renderer.domElement);

      // Lighting setup
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
      hemisphereLight.position.set(0, 20, 0);
      scene.add(hemisphereLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      scene.add(directionalLight);

      // Load .obj model
      const loader = new OBJLoader();
      loader.load(
          '/InteriorTest.obj',
          (object) => {
            object.scale.set(this.imageSize, this.imageSize, this.imageSize);
            object.position.set(0, -2.5, 0);
            scene.add(object);
          },
          undefined,
          (error) => {
            console.error('An error occurred while loading the model:', error);
          }
      );

      // Set up orbit controls
      const controls = new OrbitControls(this.camera, this.renderer.domElement);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        this.renderer.render(scene, this.camera);
      };
      animate();

      // Handle window resize
      window.addEventListener('resize', this.setRendererSize);
    },
    setRendererSize() {
      const isLargeScreen = window.innerWidth > 768;
      const width = isLargeScreen ? 400 : 250;
      const height = isLargeScreen ? 450 : 200;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    },
    addToCart() {
      // Get existing cart from localStorage or initialize it
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      console.log('product:', this.productObject);

      // Find the index of the product in the cart by its id
      const existingProductIndex = cart.findIndex(item => item.product.id === this.productObject.id);

      if (existingProductIndex !== -1) {
        // If the product already exists, update the quantity
        cart[existingProductIndex].quantity = this.quantity;
      } else {
        // If the product doesn't exist, create a new product object
        const newProduct = {
          product: this.productObject,
          quantity: this.quantity,
        };

        // Add the new product to the cart
        cart.push(newProduct);
      }

      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Check for authentication data in localStorage
      const authData = JSON.parse(localStorage.getItem("authData"));

      // Redirect based on authentication status
      if (!authData) {
        this.router.push({ name: 'login' });
      } else {
        this.router.push({ name: 'checkout', params: { checkoutId: this.productObject?.id } });
      }

      console.log('Product added to cart:', cart);
    },

  },
};
</script>

<style scoped>
/* Scoped styling for model viewer and buttons */
</style>
