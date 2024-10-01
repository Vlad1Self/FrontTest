<template>
  <div class="container mx-auto mt-4 px-4 sm:px-24">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Каталог товаров</h1>
    </div>

    <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <div v-for="product in products" :key="product.id" class="border rounded-lg p-4 shadow-md">
        <h2 class="text-xl font-semibold">{{ product.name }}</h2>
        <p class="text-gray-700">Цена: {{ product.price }}₽</p>
        <div class="flex items-center mt-2">
          <input
            type="number"
            v-model="product.quantity"
            min="1"
            class="border rounded p-1 w-16"
            placeholder="Кол-во"
          />
          <button
            @click="addToCart(product)"
            class="ml-2 bg-blue-500 text-white rounded p-1 hover:bg-blue-600"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>

    <div v-if="pagination" class="flex flex-col justify-center items-center mt-10">
      <pagination :pagination="pagination" :get-data="getProducts" :per_page="pagination.per_page"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/Shared/Pagination/Pagination.vue";
import axios from 'axios';

export default {
  name: "ProductCatalog",

  data() {
    return {
      products: [],
      pagination: null,
    };
  },

  components: {
    Pagination,
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts(page = 1) {
      try {
        const res = await axios.get(`http://localhost:8081/api/products/${page}`);
        this.products = res.data.data.map(item => ({
          ...item,
          quantity: 1,
        }));
        this.pagination = res.data.meta;
      } catch (e) {
        console.error('Ошибка при получении продуктов:', e);
      }
    },

    addToCart(product) {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];

      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push({ ...product });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      console.log(`Товар ${product.name} добавлен в корзину, количество: ${product.quantity}`);
      product.quantity = 1;
    },
  },
};
</script>

<style scoped>

</style>
