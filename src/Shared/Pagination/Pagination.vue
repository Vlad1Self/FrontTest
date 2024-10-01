<template>
  <nav v-if="pagination.last_page > 1" aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px h-10 text-base">


      <li v-if="pagination.current_page !== 1">
        <a @click.prevent="getData(pagination.current_page - 1, per_page)" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span class="sr-only">Previous</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
        </a>
      </li>

      <li v-for="link in pagination.links">
        <template v-if="Number(link.label) && (pagination.current_page - link.label <= 2 && pagination.current_page - link.label >= -2) || Number(link.label) === 1 || Number(link.label) === pagination.last_page">
          <a @click.prevent="getData(link.label, per_page)" class="flex items-center justify-center px-5 h-10 leading-tight"
             :class="link.active ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'">
            <p class="select-none">
              {{ link.label }}
            </p>
          </a>
        </template>
      </li>

      <li v-if="pagination.current_page !== pagination.last_page">
        <a @click.prevent="getData(pagination.current_page + 1, per_page)" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span class="sr-only">Next</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </li>


    </ul>
  </nav>

</template>

<script>
export default {
  name: "Pagination",

  props: {
    pagination : {
      type: Object,
      required: true,
    },
    getData: {
      type: Function,
      required: true
    },
    per_page: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>