<template>
  <div class="container mx-auto mt-4 px-4 sm:px-24">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Список заказов</h1>
    </div>

    <table class="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Номер заказа</th>
        <th scope="col" class="px-6 py-3">Дата заказа</th>
        <th scope="col" class="px-6 py-3">Товары</th>
        <th scope="col" class="px-6 py-3">Общая стоимость</th>
        <th scope="col" class="px-6 py-3">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="orders.length === 0">
        <td colspan="5" class="text-center py-4">Нет заказов</td>
      </tr>
      <template v-for="(group, index) in groupedOrders" :key="index">
        <tr class="border-b dark:border-gray-700 text-center">
          <td class="px-6 py-4" rowspan="1">{{ group.order_uuid }}</td>
          <td class="px-6 py-4" rowspan="1">{{ formatDate(group.order_created_at) }}</td>
          <td class="px-6 py-4">{{ group.products.map(product => product.product_name).join(', ') }}</td>
          <td class="px-6 py-4">{{ calculateTotalPrice(group) }}₽</td>
          <td class="px-6 py-4">
            <button @click="deleteOrder(group.order_uuid)" class="text-red-600 hover:underline">
              Удалить
            </button>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <div class="flex justify-end mt-4">
      <h2 class="text-xl font-bold">Итоговая стоимость всех заказов: {{ totalOrdersAmount }}₽</h2>
    </div>

    <div v-if="pagination" class="flex justify-center mt-4">
      <pagination
        :pagination="pagination"
        :get-data="loadOrders"
        :per_page="pagination.per_page"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from "@/Shared/Pagination/Pagination.vue";

export default {
  name: "OrderList",
  components: {
    Pagination
  },
  data() {
    return {
      orders: [],
      pagination: null,
      totalOrdersAmount: 0,
    };
  },
  computed: {
    groupedOrders() {
      const groups = {};
      this.orders.forEach(order => {
        const { order_uuid, order_created_at, product_name, quantity, total_price } = order;
        if (!groups[order_uuid]) {
          groups[order_uuid] = {
            order_uuid,
            order_created_at,
            products: []
          };
        }
        groups[order_uuid].products.push({ product_name, quantity, total_price });
      });
      return Object.values(groups);
    },
  },
  methods: {
    async loadOrders(page = 1) {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error("userId не найден в localStorage");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8081/api/orders/index/${userId}/${page}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Ответ API по заказам:', response.data);
        this.orders = response.data.data;
        this.pagination = response.data.meta;

        const totalSumResponse = await axios.get(`http://localhost:8081/api/orders/total-sum/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Общая сумма всех заказов:', totalSumResponse.data.total_order_sum);
        this.totalOrdersAmount = totalSumResponse.data.total_order_sum;
      } catch (error) {
        console.error("Ошибка при загрузке заказов или суммы:", error);
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    },

    calculateTotalPrice(group) {
      return group.products.reduce((total, product) => {
        return total + parseFloat(product.total_price);
      }, 0);
    },

    async deleteOrder(orderId) {
      try {
        const response = await axios.delete(`http://localhost:8081/api/orders/delete/${orderId}`);
        console.log(`Заказ с номером ${orderId} удален:`, response.data);
        this.orders = this.orders.filter(order => order.order_uuid !== orderId);

        this.loadOrders();
      } catch (error) {
        console.error(`Ошибка при удалении заказа с номером ${orderId}:`, error);
      }
    },
  },
  mounted() {
    this.loadOrders();
    console.log('Заказы после загрузки:', this.orders);
  },
};
</script>

<style scoped>

</style>
