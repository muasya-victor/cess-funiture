import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/view/LoginView.vue"
import RegisterView from "@/views/auth/view/RegisterView.vue"
import TheDashboardView from "@/components/TheDashboardView.vue";
import UserProfile from "@/views/profile/UserProfile.vue";
import Landing from "@/views/Landing.vue";
import CarPopUp from "@/views/car/CarPopUp.vue";
import CheckoutPage from "@/views/checkout/CheckoutPage.vue";
import BrowseCars from "@/views/car/BrowseCars.vue";
import RegisterForm from "@/views/auth/forms/RegisterForm.vue";
import CustomerList from "@/views/users/CustomerList.vue";
import ContactUs from "@/components/ContactUs.vue";
import LoginForm from "@/views/auth/forms/LoginForm.vue";
import ProductList from "@/views/products/ProductList.vue";
import ProductCategoryList from "@/views/products/ProductCategoryList.vue";
import CreateEditCategory from "@/views/products/CreateEditCategory.vue";
import CreateEditProduct from "@/views/products/CreateEditProduct.vue";


const routes = [
  {
    name:'landing',
    path: '/',
    component: Landing,
    requiresAuth: false,
    meta: {
      slug: 'Landing',
    },
    children: [
      {
        name:'furniture',
        path: 'furniture/:furnitureId',
        component: CarPopUp,
        requiresAuth: false,
        meta: {
          slug: 'Detailed View',
        },
      },
    ]
  },

  {
    name:'home',
    path: '/dashboard',
    component: TheDashboardView,
    requiresAuth: false,
    meta: {
      slug: 'Home',
    },
    children: [

      {
        name:'checkout',
        path: 'checkout',
        component: CheckoutPage,
        requiresAuth: false,
        meta: {
          slug: 'Detailed View',
        },
      }
    ]
  },
  {
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
    component: LoginForm,
    meta: {
      slug: 'Login',
    },
  },
  {
    name:'contact',
    path: '/contact',
    component: ContactUs,
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
        {
          name: 'users',
          path: 'users',
          component: CustomerList,
          requiresAuth: true,
          meta: {
            slug: 'Users',
          },
          children: [
            {
              name:'create-user',
              path: 'register',
              component: RegisterForm,
              requiresAuth: true,
              roles: ['admin', 'store_owner'],
              meta: {
                slug: 'User Registration',
              },
            },
          ]
        },
        {
          name: 'checkout',
          path: 'checkout',
          component: CheckoutPage,
          requiresAuth: true,
          meta: {
            slug: 'Checkout',
          },
        },
        {
          name: 'register-car',
          path: 'register-car',
          component: CheckoutPage,
          requiresAuth: true,
          meta: {
            slug: 'Checkout',
          },
        },
        {
          name: 'register-user',
          path: 'register-user',
          component: RegisterForm,
          requiresAuth: true,
          meta: {
            slug: 'Checkout',
          },
        },
        {
          name: 'cars',
          path: 'cars',
          component: BrowseCars,
          requiresAuth: true,
          meta: {
            slug: 'Browse Cars',
          },
          children: [
            {
              name:'rent-car',
              path: 'rent-car/:id',
              component: CarPopUp,
              requiresAuth: false,
              meta: {
                slug: 'Rent Car',
              },
            }
          ]
        },
        {
          name: 'products',
          path: 'products',
          component: ProductList,
          requiresAuth: true,
          meta: {
            slug: 'Products',
          },
          children: [
            {
              name: 'create-product',
              path: 'create-product',
              component: CreateEditProduct
            },
            {
              name: 'edit-product',
              path: 'edit-product/:id',
              component: CreateEditProduct
            }
          ]
        },
        {
          name: 'product-category',
          path: 'product-category',
          component: ProductCategoryList,
          requiresAuth: true,
          meta: {
            slug: 'Categories',
          },
          children: [
            {
              name: 'edit-category',
              path: 'edit-category/:id',
              component: CreateEditCategory,
            },
            {
              name: 'create-category',
              path: 'create-category',
              component: CreateEditCategory,
            },
          ]
        },
      ]

  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;