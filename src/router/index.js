import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/login_v2',
    name: 'Login_v2',
    component: () => import('../views/LoginViewV2.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('../views/admin/IndexView.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/admin/ProductsView.vue'),
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/admin/CouponView.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/admin/OrdersView.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/UsersView.vue'),
      },
      {
        path: 'user-checkout/:orderId',
        name: 'UserCheckout',
        component: () => import('../views/UserCheckout.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
