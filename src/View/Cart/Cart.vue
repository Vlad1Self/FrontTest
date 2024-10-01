<template>
  <div class="container mx-auto mt-4 px-4 sm:px-24">
    <h1 class="text-2xl font-bold">Оформление заказа</h1>

    <table class="w-full text-sm text-left mt-4 rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Название товара</th>
        <th scope="col" class="px-6 py-3">Количество</th>
        <th scope="col" class="px-6 py-3">Цена</th>
        <th scope="col" class="px-6 py-3">Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cart" :key="item.id" class="border-b dark:border-gray-700 text-center">
        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.name }}</td>
        <td class="px-6 py-4">{{ item.quantity }}</td>
        <td class="px-6 py-4">{{ item.price }}₽</td>
        <td class="px-6 py-4">
          <button @click="removeFromCart(item.id)" class="bg-red-500 text-white rounded p-2 hover:bg-red-600">
            Удалить
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="mt-4 flex justify-between">
      <h2 class="text-lg font-semibold">Общая стоимость: {{ totalAmount }}₽</h2>
      <button @click="placeOrder" class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
        Оформить заказ
      </button>
    </div>

    <div v-if="orderMessage" class="mt-4 text-green-500">
      {{ orderMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "OrderForm",
  data() {
    return {
      cart: [],
      orderMessage: "",
    };
  },
  computed: {
    totalAmount() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const cartItems = localStorage.getItem('cart');
      this.cart = cartItems ? JSON.parse(cartItems) : [];
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    async placeOrder() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          this.orderMessage = "User ID не найден в localStorage. Пожалуйста, войдите в систему.";
          return;
        }
        const orderData = {
          user_id: userId,
          items: this.cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        };

        await axios.post(`http://localhost:8081/api/orders`, orderData);
        this.orderMessage = "Заказ успешно оформлен!";
        this.cart = [];
        localStorage.removeItem('cart');
      } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
        this.orderMessage = "Произошла ошибка при оформлении заказа.";
      }
    },

  },
};
</script>

<style scoped>

</style>
