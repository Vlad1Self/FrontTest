import {createRouter, createWebHistory} from 'vue-router'
import Products from "@/View/Products/Products.vue";
import Cart from "@/View/Cart/Cart.vue";
import Orders from "@/View/Orders/Orders.vue";
import Login from '@/View/Auth/Login.vue'
import Register from '@/View/Auth/Register.vue'

const router  = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
});

export default router
