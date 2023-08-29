<template>
  <div class="sm:px-3 w-full mb-2 ">

    <div class="bg-white md:py-3 md:px-8 xl:px-2 rounded-2xl ">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 ">
        <div class="w-full md:w-1/2">
          <form class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative ">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 white:text-gray-400" fill="red" viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input type="text" id="simple-search" v-model="search" @input="performSearch"
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                placeholder="Search" required="">
            </div>
          </form>
        </div>

        <div
          class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <div class="flex items-center space-x-3 w-full md:w-auto">
            <div class="dropdown dropdown-end">
              <label tabindex="0"
                class="btn btn-md m-1 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
                Export
              </label>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>

            <div class="dropdown dropdown-end">
              <label tabindex="0"
                class="btn m-2 w-full md:w-auto flex items-center justify-center text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
                Export
              </label>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a @click="exportToPDF">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgb(255, 0, 0);transform: ;msFilter:;">
                      <path
                        d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z">
                      </path>
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z">
                      </path>
                    </svg>
                    PDF</a></li>
                <li><a @click="exportToCSV">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgb(255, 238, 0);transform: ;msFilter:;">
                      <path
                        d="M19.903 8.586a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.952.952 0 0 0-.051-.259c-.01-.032-.019-.063-.033-.093zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z">
                      </path>
                      <path d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z"></path>
                    </svg>
                    CSV</a></li>
                <li><a @click="exportToJSON">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgb(60, 255, 0);transform: ;msFilter:;">
                      <path
                        d="M12.823 15.122c-.517 0-.816.491-.816 1.146 0 .661.311 1.126.82 1.126.517 0 .812-.49.812-1.146 0-.604-.291-1.126-.816-1.126z">
                      </path>
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM8.022 16.704c0 .961-.461 1.296-1.2 1.296-.176 0-.406-.029-.557-.08l.086-.615c.104.035.239.06.391.06.319 0 .52-.145.52-.67v-2.122h.761v2.131zm1.459 1.291c-.385 0-.766-.1-.955-.205l.155-.631c.204.105.521.211.846.211.35 0 .534-.146.534-.365 0-.211-.159-.331-.564-.476-.562-.195-.927-.506-.927-.996 0-.576.481-1.017 1.277-1.017.38 0 .659.08.861.171l-.172.615c-.135-.065-.375-.16-.705-.16s-.491.15-.491.325c0 .215.19.311.627.476.596.22.876.53.876 1.006.001.566-.436 1.046-1.362 1.046zm3.306.005c-1.001 0-1.586-.755-1.586-1.716 0-1.012.646-1.768 1.642-1.768 1.035 0 1.601.776 1.601 1.707C14.443 17.33 13.773 18 12.787 18zm4.947-.055h-.802l-.721-1.302a12.64 12.64 0 0 1-.585-1.19l-.016.005c.021.445.031.921.031 1.472v1.016h-.701v-3.373h.891l.701 1.236c.2.354.4.775.552 1.155h.014c-.05-.445-.065-.9-.065-1.406v-.985h.702v3.372zM14 9h-1V4l5 5h-4z">
                      </path>
                    </svg>
                    JSON</a></li>
                <li><a @click="exportToXLSX">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      style="fill: rgb(0, 255, 128);transform: ;msFilter:;">
                      <path
                        d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zm7 2h8v2h-8V7zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2zM6 7h2v2H6V7zm0 4h2v2H6v-2zm0 4h2v2H6v-2z">
                      </path>
                    </svg>
                    XLSX</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <table class="w-full whitespace-nowrap overflow-auto max-h-60 " id="export-pdf-element ">
        <tbody>
          <div class="overflow-x-auto py-1">
            <table class="table">
              <thead>
                <tr>
                  <th class="px-1">
                    <label>
                      <input type="checkbox" class="checkbox checkbox-primary" />
                    </label>
                  </th>
                  <th class="px-1 py-1 text-center">SN</th>
                  <th class="px-2 py-1 " v-for="(column, ind) in columns" :key="ind">
                    <span @click="sortTable(ind)">
                      {{ column.text }}
                      <!-- Add the sort icon based on the sort order -->
                      <span class="sort-icon inline-block ml-1">
                        <svg v-if="isSortedAscending(ind)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                          width="1em" height="1em" fill="currentColor"
                          class="arrowDown sorting-data  false text-red-600  ">
                          <path fill-rule="evenodd"
                            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z">
                          </path>
                        </svg>
                        <svg v-else-if="isSortedDescending(ind)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                          width="1em" height="1em" fill="currentColor" class="arrowUp sorting-data false text-teal-600  ">
                          <path fill-rule="evenodd"
                            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z">
                          </path>
                        </svg>

                      </span>
                    </span>
                  </th>


                  <th class="px-1 py-1">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in filteredEntries" :key="index" class="white:border-gray-700">
                  <th class="px-1">
                    <label>
                      <input type="checkbox" class="checkbox checkbox-primary" />
                    </label>
                  </th>
                  <td class="px-1 py-1 text-center">{{ index + 1 }}</td>
                  <td v-for="(column, ind) in columns" :key="ind"
                    class="px-1 py-1 font-normal text-black white:text-white">
                    {{ column.name === 'salary' ? formatCurrency(entry.salary) : entry[column.name]
                    }}
                  </td>
                  <td class="px-6 py-1 text-center">
                    <div class="dropdown dropdown-left">
                      <label tabindex="0" class=" btn btn-sm btn-ghost btn-circle ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                          style="fill: rgb(20 184 166);transform: ;msFilter:;">
                          <path
                            d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                          </path>
                        </svg>

                      </label>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </tbody>
      </table>
      <nav class="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 white:text-gray-400">
          Showing
          <select class="form-select bg-white-600 text-black" v-model="limitPerPage" style="width: 80px"
            @change="updateLimitPerPage">
            <option :value="100" class="font-semibold text-gray-900 white:text-white">100</option>
            <option :value="500" class="font-semibold text-gray-900 white:text-white">500</option>
            <option :value="1000" class="font-semibold text-gray-900 white:text-white">1000</option>
            <option :value="1500" class="font-semibold text-gray-900 white:text-white">1500</option>
            <option :value="3000" class="font-semibold text-gray-900 white:text-white">3000</option>
          </select>
        </span>

      </nav>
      <nav aria-label="Pagination" class="flex justify-center items-center space-x-2 text-gray-600 mt-8 lg:mt-0">


        <!-- <div class="pagination">
          <button class="prev-btn" onclick="{{gotoPage}}">«</button>
          <span class="page-number">{{ totalPages }}</span>
          <button class="next-btn" onclick="goToNextPage()">»</button>
        </div> -->


        <!-- Pagination controls -->
        <ul class="pagination">
          <li>
            <a class="page-link" role="button" tabindex="0" @click="goToFirstPage"
              :class="{ disabled: currentPage === 1 }" href="#">
              <span aria-hidden="true">«</span>
              <span class="visually-hidden">First</span>
            </a>
          </li>
          <li>
            <a class="page-link" role="button" tabindex="0" @click="changePage(-1)"
              :class="{ disabled: currentPage === 1 }" href="#">
              <span class="visually-hidden">Previous</span>
              <span aria-hidden="true">‹</span>
            </a>
          </li>
          <li class="page-item active">
            <span class="page-link">
              {{ currentPage }} of {{ totalPages }}
            </span>
          </li>
          <li>
            <a class="page-link" role="button" tabindex="0" @click="changePage(1)"
              :class="{ disabled: currentPage === totalPages }" href="#">
              <span aria-hidden="true">›</span>
              <span class="visually-hidden">Next</span>
            </a>
          </li>
          <li>
            <a class="page-link" role="button" tabindex="0" @click="goToLastPage"
              :class="{ disabled: currentPage === totalPages }" href="#">
              <span aria-hidden="true">»</span>
              <span class="visually-hidden">Last</span>
            </a>
          </li>
        </ul>
      </nav>



    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue';
import * as exportFile from '../export';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../main';

// Declare the 'entries' ref here
const entries = ref([]);
const itemsPerPage = 100; // Number of items to display per page

const columns = [
  { name: 'id', text: 'id' },
  { name: 'name', text: 'Name' },
  { name: 'position', text: 'Position' },
  { name: 'office', text: 'Office' },
  { name: 'extension', text: 'Extension' },
  { name: 'startdate', text: 'Start Date' },
  { name: 'salary', text: 'Salary' },
  // { name: 'Action', text: 'Action' }
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
// onMounted(() => {
//   fetchDataFromApi();
// });

onMounted(fetchDataFromApi)

// const state = reactive({
//   list: [],
//   prePage: 5,
//   currentPage: 1,
// });

// const changePage = (num) => {
//   state.currentPage += num;
// };

// const filteredList = computed(() => {
//   const start = (state.currentPage - 1) * state.prePage;
//   const end = state.currentPage * state.prePage;
//   return state.list.slice(start, end);
// });

// Computed property for paginated data
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return entries.value.slice(startIndex, endIndex);
});

// Computed property for total pages
const pagiTotalPages = computed(() => Math.ceil(entries.value.length / itemsPerPage));

// Method to set the current page
const setCurrentPage = (page) => {
  currentPage.value = page;
};


// const pageActive = ref(1);
// const pageInfo = reactive({});

// const filter = reactive({
//   name: '',
//   position: '',
//   office: '',
//   extension: '',
//   startdate: '',
//   salary: ''
// });

const search = ref('');
const limitPerPage = ref(50);
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

const performSearch = () => {
  currentPage.value = 0; // Reset the currentPage to the first page
};

watch([search, currentPage], () => {
  // Update the total number of filtered entries and total pages whenever search or currentPage changes
  totalFilteredEntries.value = filteredEntries.value.length;
});

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


///File Export ///////


const exportToCSV = () => {
  const data = filteredEntries.value.map((entry) => Object.values(entry));
  const fileName = 'exported_data';
  exportFile.exportToCSV(data, fileName); // Call the export function from the import
};

const exportToPDF = () => {
  // Get the element to export as PDF
  const element = document.getElementById('export-pdf-element');

  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Set the DPI (dots per inch) for higher resolution
  const dpi = 300; // You can adjust this value to suit your needs

  // Calculate the width and height of the canvas based on the element's size and DPI
  const width = element.offsetWidth * (dpi / 96);
  const height = element.offsetHeight * (dpi / 96);

  // Create a new canvas with the higher DPI
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.scale(dpi / 96, dpi / 96);

  // Render the element to the canvas with the higher DPI
  html2canvas(element, { canvas: canvas }).then((canvas) => {
    // Get the canvas as an image data URL
    const imageData = canvas.toDataURL('image/png');

    // Add the image to the PDF
    pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

    // Save the PDF file
    pdf.save('exported_file.pdf');
  });
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


/////// Sorting ///////

// Add computed property to get the total number of filtered entries
const totalFilteredEntries = computed(() => filteredEntries.value.length);

// // Add computed property to get the total number of pages
const totalPages = computed(() => Math.ceil(totalFilteredEntries.value / limitPerPage.value));

const sortColumn = ref(null);
const sortAscending = ref(true);

const isSortedAscending = (columnIndex) => {
  return sortColumn.value === columnIndex && sortAscending.value;
};

const isSortedDescending = (columnIndex) => {
  return sortColumn.value === columnIndex && !sortAscending.value;
};

const sortTable = (columnIndex) => {
  // Update the sortColumn and sortAscending variables
  sortColumn.value = columnIndex;
  sortAscending.value = !sortAscending.value;

  // Perform the sorting logic here
  const columnKey = columns[columnIndex].name;
  const order = sortAscending.value ? 1 : -1;

  filteredEntries.value.sort((a, b) => {
    const valueA = a[columnKey];
    const valueB = b[columnKey];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * order;
    } else {
      return (valueA - valueB) * order;
    }
  });
};



const goToFirstPage = () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
  }
};

const goToLastPage = () => {
  if (currentPage.value !== totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

const changePage = (num) => {
  currentPage.value += num;
  // Ensure the currentPage is within valid bounds
  if (currentPage.value < 1) {
    currentPage.value = 1;
  } else if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};


</script>


<style>
.sort-icon {
  position: relative;
  top: 2px;
  /* Adjust this value to adjust the vertical positioning of the icon */
}

.pagination {
  display: flex;
  align-items: center;
}

.prev-btn,
.next-btn,
.page-number {
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 3px;
}

.page-number {
  font-weight: bold;
}

.prev-btn:hover,
.next-btn:hover,
.page-number:hover {
  background-color: #f0f0f0;
}
</style>


