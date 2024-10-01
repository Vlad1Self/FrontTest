<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isAuthenticated = ref(!!localStorage.getItem('token'));

const updateAuthStatus = () => {
  isAuthenticated.value = !!localStorage.getItem('token');
};

const logout = () => {
  localStorage.removeItem('token');
  updateAuthStatus();
  router.push('/login');
};

let intervalId;

onMounted(() => {
  updateAuthStatus();

  intervalId = setInterval(updateAuthStatus, 100);
});

onUnmounted(() => {

  clearInterval(intervalId);
});
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div class="w-full md:block md:w-auto">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <RouterLink to="/products" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                Каталог
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cart" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                Корзина
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/orders" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                Мои заказы
              </RouterLink>
            </li>

            <li v-if="!isAuthenticated">
              <RouterLink to="/login" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                Авторизация
              </RouterLink>
            </li>
            <li v-if="!isAuthenticated">
              <RouterLink to="/register" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                Регистрация
              </RouterLink>
            </li>

            <li v-if="isAuthenticated">
              <button @click="logout" class="block py-2 px-3 text-white bg-red-500 rounded md:bg-transparent md:text-red-500 md:p-0 dark:text-white">
                Выйти
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView/>
</template>

<style scoped>
</style>
