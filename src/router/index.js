import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import UserProfile from "@/views/profile/UserProfile.vue";
import Landing from "@/views/Landing.vue";
import CarPopUp from "@/views/car/CarPopUp.vue";


const routes = [
  {
    name:'home',
    path: '/',
    component: Landing,
    requiresAuth: false,
    meta: {
      slug: 'Home',
    },
    children: [
      {
        name:'car',
        path: 'car/:id',
        component: CarPopUp,
        requiresAuth: false,
        meta: {
          slug: 'Detailed View',
        },
      }
    ]
  },{
    name:'register',
    path: '/register',
    component: RegisterView,
    requiresAuth: true,
    roles: ['admin', 'store_owner'],
    meta: {
      slug: 'User Registration',
    },
  },
  {
    name:'login',
    path: '/login',
    component: LoginView,
    meta: {
      slug: 'Login',
    },
  },
  {
    name:'dashboard',
    path:'/dashboard',
    component: TheDashboardView,
    requiresAuth: true,
    meta: {
      slug: 'Dashboard',
    },
    children : [
        {
          name: 'profile',
          path: 'profile',
          component: UserProfile,
          requiresAuth: true,
          meta: {
            slug: 'Profile',
          },
        },
      ]

  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;