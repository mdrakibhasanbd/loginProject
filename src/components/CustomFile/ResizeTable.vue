<template>
    <div class="w-full">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              @click="expandCol(header.field, $event)"
              :class="{ 'cursor-pointer': header.expandable }"
              :style="header.width ? { width: header.width } : {}"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.id">
            <td v-if="visibleColumns[header.field]" v-for="header in headers" :key="header.field">
              {{ row[header.field] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        headers: [
          { field: 'id', label: 'ID', width: '14.5em', expandable: false },
          { field: 'name', label: 'Name', width: '72.8125px', expandable: true },
          { field: 'position', label: 'Position', width: '120px', expandable: true },
          // Add more columns as needed
        ],
        data: [
          { id: 1, name: 'John Doe', position: 'Developer' },
          { id: 2, name: 'Jane Smith', position: 'Designer' },
          // Add more data rows as needed
        ],
        visibleColumns: {
          id: true,
          name: true,
          position: true,
          // Initialize other columns to true or false based on your requirements
        },
        expanding: '',
        lastExpanded: null,
        maxLenOfCols: {
          id: 14.5,
          name: 72.8125,
          position: 120,
          // Provide the maximum width for each column, if required
        },
        showMenu: false, // Modify this based on your actual requirement
      };
    },
    methods: {
      expandCol(attribute, event) {
        if (this.showMenu) return;
        const isClickedHeader = event.target.classList.contains('header');
        const isClickedSame = this.expanding === attribute;
        const isExpandable = this.headers.find((header) => header.field === attribute)?.expandable;
  
        // Collapsing when click the same one's header or not an expandable one
        if ((isClickedSame && isClickedHeader) || !isExpandable) {
          this.expanding = '';
          this.lastExpanded && this.lastExpanded.reverse();
        }
  
        // Expanding when click not the same expandable one
        if (isExpandable && !isClickedSame) {
          this.expanding = attribute;
          this.lastExpanded && this.lastExpanded.reverse();
  
          const col = document.getElementsByClassName('header--' + attribute)[0];
          const targetWidth = (this.maxLenOfCols[attribute] || 100) / 2 + 1; // 1 for cell padding
  
          this.lastExpanded = TweenMax.to(col, 0.2, {
            width: `${targetWidth}em`,
            ease: Linear.easeNone,
          });
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  .cursor-pointer {
    cursor: pointer;
    text-decoration: underline;
  }
  </style>
  