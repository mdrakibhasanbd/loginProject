<template>
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text">Search</span>
        <input type="text" class="form-control" v-model="search" @input="performSearch" />
      </div>
      <table class="table table-bordered table-striped">
        <thead>
          <!-- Table headers here -->
          <tr>
            <th>#</th>
            <th v-for="(column, ind) in columns" :key="ind">{{ column.text }}</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(entry, index) in filteredEntries" :key="index">
              <td>{{ index + 1 }}</td> <!-- Add index number -->
              <td v-for="(column, ind) in columns" :key="ind">
                {{ column.name === 'salary' ? formatCurrency(entry.salary) : entry[column.name] }}
              </td>
            </tr>
          </tbody>
        <tfoot>
          <tr>
            <th colspan="6">Total amount of salaries per page</th>
            <th>{{ formatCurrency(totalSalaryPerPage) }}</th>
          </tr>
          <tr>
            <th colspan="6">Total of all salaries from entries</th>
            <th>{{ formatCurrency(totalAllSalaries) }}</th>
          </tr>
        </tfoot>
      </table>
  
      <div class="d-flex justify-content-between align-items-stretch">
        <div class="d-flex align-items-center" style="margin-top: -17px;">
          <div class="me-2">Show</div>
          <select class="form-select" v-model="limitPerPage" style="width: 80px" @change="updateLimitPerPage">
            <option :value="100">100</option>
            <option :value="250">250</option>
            <option :value="500">500</option>
            <option :value="1000">1000</option>
            <option :value="2000">2000</option>
            <option :value="3000">3000</option>
          </select>
          <div class="ms-2">from {{ pageInfo.from }} to {{ pageInfo.to }} of {{ pageInfo.of }} entries</div>
        </div>
      </div>
  
      <!-- Export buttons -->
      <div class="mt-3">
        <button class="btn btn-primary me-2" @click="exportToCSV">Export to CSV</button>
        <button class="btn btn-primary me-2" @click="exportToXLSX">Export to XLSX</button>
        <button class="btn btn-primary me-2" @click="exportToJSON">Export to JSON</button>
        <button class="btn btn-primary" @click="printDocument">Print</button>
      </div>
  
      <div id="page-navigation">
        <button @click="movePages(-1)">Back</button>
        <p>{{ currentPage + 1 }} out of {{ totalPages }}</p>
        <button @click="movePages(1)">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, reactive, onMounted } from 'vue';
  import * as exportFile from '../export';
  import axios from 'axios'; 
  import api from '../main';
  
  // Declare the 'entries' ref here
  const entries = ref([]);

  const columns = [
  { name: 'name', text: 'Name' },
  { name: 'position', text: 'Position' },
  { name: 'office', text: 'Office' },
  { name: 'extension', text: 'Extension' },
  { name: 'startdate', text: 'Start Date' },
  { name: 'salary', text: 'Salary' }
];
  const fetchDataFromApi = async () => {
    try {
      const response = await api.get('/tableData');
      entries.value = response.data; // Assuming the API response contains the data in the same format as your 'entries' array
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };
  
  // Fetch data from API when the component is mounted
  onMounted(() => {
    fetchDataFromApi();
  });
  
  const pageActive = ref(1);
  const pageInfo = reactive({});
  
  const filter = reactive({
    name: '',
    position: '',
    office: '',
    extension: '',
    startdate: '',
    salary: ''
  });
  
  const search = ref('');
  const limitPerPage = ref(10);
  const currentPage = ref(0);
  
  const filteredEntries = computed(() => {
    const filtered = entries.value.filter((entry) => {
      return Object.values(entry).some((value) =>
        value.toString().toLowerCase().includes(search.value.toLowerCase())
      );
    });
  
    // Get the current page's entries from the filtered array
    const startIndex = currentPage.value * limitPerPage.value;
    const endIndex = startIndex + limitPerPage.value;
    return filtered.slice(startIndex, endIndex);
  });
  
  const totalFilteredEntries = ref(filteredEntries.value.length);
  const totalPages = computed(() => Math.ceil(totalFilteredEntries.value / limitPerPage.value));
  
  const performSearch = () => {
    currentPage.value = 0; // Reset the currentPage to the first page
  };
  
  watch([search, currentPage], () => {
    // Update the total number of filtered entries and total pages whenever search or currentPage changes
    totalFilteredEntries.value = filteredEntries.value.length;
  });
  
  const movePages = (step) => {
    currentPage.value += step;
  
    // Ensure the currentPage remains within the valid range
    if (currentPage.value < 0) {
      currentPage.value = 0;
    } else if (currentPage.value >= totalPages.value) {
      currentPage.value = totalPages.value - 1;
    }
  };
  

const formatCurrency = (value) => {
  // Check if value is a number or a string representation of a number
  const numValue = typeof value === 'number' ? value : parseFloat(value);

  // Convert the number to a string and check if it has cents
  const formattedValue = numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: numValue % 1 === 0 ? 0 : 2,
  });

  // Remove trailing '.00' if present (for whole numbers)
  return formattedValue.replace('.00', '');
};

  const totalSalaryPerPage = computed(() => {
    return filteredEntries.value.reduce((total, entry) => total + entry.salary, 0);
  });
  
  const totalAllSalaries = computed(() => {
    return entries.value.reduce((total, entry) => total + entry.salary, 0);
  });
  
  const updateLimitPerPage = () => {
    currentPage.value = 0;
  };
  
  const exportToCSV = () => {
    const data = filteredEntries.value.map((entry) => Object.values(entry));
    const fileName = 'exported_data';
    exportFile.exportToCSV(data, fileName); // Call the export function from the import
  };
  
  const exportToXLSX = () => {
    const data = filteredEntries.value;
    const sheetName = 'Sheet1';
    const fileName = 'exported_data';
    exportFile.exportToXLSX(data, sheetName, fileName); // Call the export function from the import
  };
  
  const exportToJSON = () => {
    const data = filteredEntries.value;
    const fileName = 'exported_data';
    exportFile.exportToJSON(data, fileName); // Call the export function from the import
  };
  
  const printDocument = () => {
    exportFile.printDocument(); // Call the export function from the import
  };
  </script>
  

  <style>
.header--expandable {
  cursor: pointer;
}

.header--expandable::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  border-style: solid;
  border-width: 0 0 8px 8px; /* Change the 8px value to adjust the arrow size */
  border-color: transparent transparent #007bff transparent; /* Adjust the color if needed */
}

</style>