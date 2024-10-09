import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import UserProfile from "@/views/profile/UserProfile.vue";


const routes = [
  {
    name:'home',
    path: '/',
    component: RegisterView,
    requiresAuth: false,
    meta: {
      slug: 'Home',
    },
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