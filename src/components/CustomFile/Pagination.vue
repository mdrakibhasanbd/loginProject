<template>
    <div class="pagination">
      <button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span v-for="pageNumber in totalPages" :key="pageNumber">
        <button @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">{{ pageNumber }}</button>
      </span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Pagination",
    props: {
      data: {
        type: Array,
        required: true,
      },
      perPage: {
        type: Number,
        default: 10,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.data.length / this.perPage);
      },
    },
    methods: {
      goToPage(pageNumber) {
        if (pageNumber > 0 && pageNumber <= this.totalPages) {
          this.$emit("pagination-change", pageNumber);
        }
      },
    },
  };
  </script>
  