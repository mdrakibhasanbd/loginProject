<template>
  <div class="flex md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 ">
    <div class="w-full md:w-1/2 pb-2 sm:mt-2 ">
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
          <input type="text" id="simple-search" v-model="searchQuery" @input="handleInput"
            class="bg-gray-50 border input-sm  input-primary input-bordered text-black text-sm rounded-lg block w-full pl-10"
            placeholder="Search" required="">
        </div>
      </form>
    </div>

    <!-- <div>

    </div> -->



    <div
      class="w-full flex flex-col space-y-2 items-stretch justify-end flex-shrink-0 sm:w-auto sm:flex sm:justify-end sm:space-y-0 sm:items-center sm:space-x-3">
      <div class="flex items-center w-full md:w-auto">

        <!-- Drawer Button Start -->
        <!-- <div v-if="shouldShowDrawerButton" > -->

        <!-- </div> -->

        <!-- Drawer Button End -->



        <div v-if="ShowUserAddButton" class="dropdown dropdown-end">
          <label tabindex="0" @click="openModal"
            class="btn btn-md btn-circle m-1 w-full sm:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              style="fill: #14b8a6;transform: ;msFilter:;">
              <path
                d="M4.5 8.552c0 1.995 1.505 3.5 3.5 3.5s3.5-1.505 3.5-3.5-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5zM19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2z">
              </path>
            </svg>
          </label>
        </div>

        <div v-if="ShowDeviceAddButton" class="dropdown dropdown-end">
          <label tabindex="0" @click="openModal"
            class="btn btn-md btn-circle m-1 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              style="fill: #14b8a6;transform: ;msFilter:;">
              <path
                d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z">
              </path>
            </svg>
          </label>
        </div>


        <slot></slot>
        
        <div class="dropdown dropdown-end">
          <label tabindex="0" @click="handleToggleFilters"
            class="btn btn-md btn-circle m-1 w-full sm:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              style="fill: #14b8a6; transform: ;msFilter:;">
              <path
                d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z">
              </path>
            </svg>
          </label>
        </div>

        <div class="dropdown dropdown-end">
          <label tabindex="0"
            class="btn btn-md m-1 w-full sm:w-auto flex items-center justify-center text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              style="fill: #14b8a6;transform: ;msFilter:;">
              <path
                d="M18 22a2 2 0 0 0 2-2v-5l-5 4v-3H8v-2h7v-3l5 4V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4z">
              </path>
            </svg>
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

    <!-- <button @click="openModal">Open Modal</button> -->
    <TableUserAddModal v-if="ShowUserAddButton" :isOpen="isModalOpen" @close="closeModal" />
    <TableAddMikrotikModal v-if="ShowDeviceAddButton" :isOpen="isModalOpen" @close="closeModal" />
    <!-- <Devices :isOpen="isModalOpen" @close="closeModal" /> -->



  </div>
</template>
  

<script>
import TableUserAddModal from '../../Modal/TableUserAddModal.vue';
import TableAddMikrotikModal from '../../Modal/TableAddMikrotikModal.vue';
// import DrawerVue from '../../Drawer.vue';
import { useDrawerStore } from '../../../stores/drawer';
import { useFilterStore } from '../../../stores/filter';



export default {
  components: {
    TableUserAddModal,
    TableAddMikrotikModal,
    // DrawerVue,


  },

  props: {
    value: String,
    // rowData: Array
  },

  data() {
    return {
      searchQuery: this.value,
      isModalOpen: false,
    };
  },

  computed: {
    // Computed property to determine if the div should be shown
    ShowUserAddButton() {
      return this.$route.path === '/table';
    },
    ShowUserAddButton() {
      return this.$route.path === '/users';
    },
    ShowDeviceAddButton() {
      return this.$route.path === '/devices';
    },

    toggleFilters() {
      useFilterStore().toggleFilters();
    },
    shouldShowDrawerButton() {
      return useDrawerStore().selectedRows.length > 0;
      // return this.selectedRows.length > 0;
    },

    drawerOpen: {
      get() {
        return useDrawerStore().drawerOpen;
      },
      set(value) {
        useDrawerStore().toggleDrawer();
      },
    },


  },
  mounted() {
    // console.log(this.$router.currentRoute.to.path);
    
    console.log("Current route path:", this.$route.path);
    // console.log("Row Data:", this.rowData);

  },

  methods: {
    handleInput() {
      this.$emit('search', this.searchQuery);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    handleToggleFilters() {
      useFilterStore().toggleFilters();
    },
  },
};
</script>

  