<template>
    <!-- Your component's template code here -->
    <!-- ... -->
    <div class="input-group mb-3">
      <span class="input-group-text">Search</span>
      <input type="text" class="form-control" v-model="search" @input="performSearch" />
    </div>
    <table class="table table-bordered table-striped">
      <thead>
        <!-- ... -->
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredEntries" :key="index">
          <td>

          </td>
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
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="500">500</option>
          <option :value="500">500</option>
          <option :value="1000">1000</option>
          <option :value="3000">3000</option>
        </select>
        <div class="ms-2">from {{ pageInfo.from }} to {{ pageInfo.to }} of {{ pageInfo.of }} entries</div>
      </div>
    </div>
      <!-- Export buttons -->

  <!-- Add the export buttons -->
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
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
    const response = await api.get('/tableData');
    console.log(response);
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

// const filter = reactive({
//   name: '',
//   position: '',
//   office: '',
//   extension: '',
//   startdate: '',
//   salary: ''
// });


const search = ref('');
const limitPerPage = ref(10);
const currentPage = ref(0);

// const filteredEntries = computed(() => {
//   const filtered = entries.filter((entry) => {
//     return Object.values(entry).some((value) =>
//       value.toString().toLowerCase().includes(search.value.toLowerCase())
//     );
//   });

//   // Get the current page's entries from the filtered array
//   const startIndex = currentPage.value * limitPerPage.value;
//   const endIndex = startIndex + limitPerPage.value;
//   return filtered.slice(startIndex, endIndex);
// });


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
  // Add your currency formatting logic here
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
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
  