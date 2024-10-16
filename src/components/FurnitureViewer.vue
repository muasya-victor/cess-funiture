<template>
  <div class="flex items-center justify-start gap-8 w-full flex-wrap md:flex-nowrap h-fit">
    <div class="flex flex-col w-full items-center md:w-fit gap-4 border border-gray-200 rounded-lg p-2">
      <div ref="mountRef" class="model-viewer w-fit"></div>

      <div class="flex flex-row items-center justify-between gap-4 w-full">
        <el-button size="large" class="w-fit m-0" @click="zoomIn">
          <span class="pr-2">zoom</span>
          <plus class="h-4 w-4"/>
        </el-button>

        <el-button class="w-fit m-0" size="large" @click="zoomOut">
          <span class="pr-2">zoom</span>
          <minus class="h-4 w-4"/>
        </el-button>
      </div>
    </div>

    <div class="flex flex-col-reverse gap-8 h-full justify-between items-between">

      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold text-blue-400">Add To Cart</h1>

        <el-input-number class="w-full" size="large" placeholder="1"/>
      </div>

      <div class="flex flex-col  gap-2">
        <span class="text-xl font-bold text-blue-400">Description</span>
        <span>
          The living room is a cozy yet elegant space designed for relaxation
          and social interaction, featuring a plush sectional sofa adorned with
          colorful throw pillows, a chic coffee table, and a soft area rug that anchors
          the seating arrangement. Large windows allow natural light to flood the room,
          highlighting the tasteful decor, including framed artwork and indoor plants that add a touch of greenery.
          A stylish entertainment center houses a flat-screen TV, while warm lighting fixtures create a welcoming
          ambiance for gatherings or quiet evenings. Overall, the living room blends comfort
          and style, making it the perfect spot for family gatherings or intimate conversations with friends
        </span>
      </div>
    </div>

  </div>



</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {Minus, Plus} from "@element-plus/icons-vue";

export default {
  components: {Minus, Plus},
  props: {
    modelPath: {
      type: String,
      required: true,
    },
    imageSize: {
      type: Number,
      required: true,
      default: 0.8,
    },
  },
  mounted() {
    this.initThreeJS();
  },
  beforeDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
  data() {
    return {
      camera: null, // Store camera instance
      zoomFactor: 1, // Factor to adjust zoom levels
    };
  },
  methods: {
    zoomIn() {
      this.zoomFactor += 0.1; // Increase zoom factor
      this.updateCameraZoom();
    },
    zoomOut() {
      this.zoomFactor = Math.max(0.1, this.zoomFactor - 0.1); // Decrease zoom factor, preventing negative zoom
      this.updateCameraZoom();
    },
    updateCameraZoom() {
      if (this.camera) {
        this.camera.position.z = 10 / this.zoomFactor; // Adjust camera position based on zoom factor
        this.camera.updateProjectionMatrix(); // Update camera projection
      }
    },
    initThreeJS() {
      const scene = new THREE.Scene();
      // Set the background color (white) using hexadecimal notation
      scene.background = new THREE.Color(0xffffff); // Use 0xffffff for white background

      this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      this.camera.position.set(0, 0, 10); // Initial camera position

      // Set up the renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      // Check window size and set renderer size accordingly
      const isLargeScreen = window.innerWidth > 768; // Adjust this breakpoint as needed
      if (isLargeScreen) {
        this.renderer.setSize(400, 450);
      } else {
        this.renderer.setSize(250, 200);
      }

      this.$refs.mountRef.appendChild(this.renderer.domElement);

      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
      hemisphereLight.position.set(0, 20, 0);
      scene.add(hemisphereLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      scene.add(directionalLight);

      // Load the .obj model using hardcoded values
      const loader = new OBJLoader();
      loader.load(
          this.modelPath,
          (object) => {
            object.scale.set(this.imageSize, this.imageSize, this.imageSize); // Use imageSize directly
            object.position.set(0, -2.5, 0);
            scene.add(object);
          },
          undefined,
          (error) => {
            console.error('An error happened while loading the model', error);
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
      window.addEventListener('resize', () => {
        // Re-check screen size on resize and set renderer size accordingly
        const isLargeScreen = window.innerWidth > 768; // Adjust this breakpoint as needed
        if (isLargeScreen) {
          this.renderer.setSize(400, 450);
        } else {
          this.renderer.setSize(250, 200);
        }

        // Update camera aspect ratio and projection matrix
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
      });
    }

  },
};
</script>

<style scoped>

</style>
