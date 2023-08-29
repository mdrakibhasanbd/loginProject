<template>
    <div>
      <vue-data-grid :columns="columns" :data="data" :options="options" />
    </div>
  </template>
  
  <script>
//   import VueDataGrid from './components/vue-data-grid/VueDataGrid.vue';
  
  export default {
    components: {
    //   VueDataGrid,
    },
    data() {
      return {
        columns: [
          { label: 'ID', field: 'id' },
          { label: 'Name', field: 'name' },
          { label: 'Age', field: 'age' },
          { label: 'Email', field: 'email' },
        ],
        data: [
          { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
          // Add more data here
        ],
        options: {
          // Add any options you want to customize the grid (e.g., sorting, filtering, pagination)
        },
      };
    },
  };
  </script>
  
  <style>
  /* Add any additional styling here if needed */
  </style>
  