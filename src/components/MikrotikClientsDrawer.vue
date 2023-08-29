<template>
  <div class="drawer drawer-end sm:overflow-auto md:overflow-auto ">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" v-model="drawerOpen" />

    <div class="drawer-content bg-white my-2 px-4 py-4 border rounded-md flex justify-between">
      <h2 class="font-semibold">Total User : {{ mikrotikClientsData }}{{ shouldShowDetails ? '/' + rowData.length :
        '' }}</h2>
      <div class="flex items-center">
        <span class="mr-4 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill:rgba(61, 255, 0);transform: ;msFilter:;">
            <path
              d="M12 6c3.537 0 6.837 1.353 9.293 3.809l1.414-1.414C19.874 5.561 16.071 4 12 4c-4.071.001-7.874 1.561-10.707 4.395l1.414 1.414C5.163 7.353 8.463 6 12 6zm5.671 8.307c-3.074-3.074-8.268-3.074-11.342 0l1.414 1.414c2.307-2.307 6.207-2.307 8.514 0l1.414-1.414z">
            </path>
            <path
              d="M20.437 11.293c-4.572-4.574-12.301-4.574-16.873 0l1.414 1.414c3.807-3.807 10.238-3.807 14.045 0l1.414-1.414z">
            </path>
            <circle cx="12" cy="18" r="2"></circle>
          </svg>
          <span class="ml-1">{{ onlineRowCount }}</span>
        </span>
        <span class="inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          style="fill: rgba(255, 0, 0);transform: ;msFilter:;">
          <path
            d="m1.293 8.395 1.414 1.414c.504-.504 1.052-.95 1.622-1.359L2.9 7.021c-.56.422-1.104.87-1.607 1.374zM6.474 5.06 3.707 2.293 2.293 3.707l18 18 1.414-1.414-5.012-5.012.976-.975a7.86 7.86 0 0 0-4.099-2.148L11.294 9.88c2.789-.191 5.649.748 7.729 2.827l1.414-1.414c-2.898-2.899-7.061-3.936-10.888-3.158L8.024 6.61A13.366 13.366 0 0 1 12 6c3.537 0 6.837 1.353 9.293 3.809l1.414-1.414C19.874 5.561 16.071 4 12 4a15.198 15.198 0 0 0-5.526 1.06zm-2.911 6.233 1.414 1.414a9.563 9.563 0 0 1 2.058-1.551L5.576 9.697c-.717.451-1.395.979-2.013 1.596zm2.766 3.014 1.414 1.414c.692-.692 1.535-1.151 2.429-1.428l-1.557-1.557a7.76 7.76 0 0 0-2.286 1.571zm7.66 3.803-2.1-2.1a1.996 1.996 0 1 0 2.1 2.1z">
          </path>
        </svg> 
          <span class="ml-1">{{ offlineRowCount }}</span>
        </span>
      </div>
    </div>


    <slot></slot>

    <div class="drawer-side items-center" :class="{ 'active': drawerOpen }">
      <label for="my-drawer-4" class="drawer-overlay" @click="closeDrawer"></label>
      <ul class="flex flex-col justify-center items-end space-y-2 text-base-content">
        <li class="btn btn-square btn-primary font-sans" @click="triggerSendSelectedRows"><a>Send ID</a></li>
        <!-- Other menu items -->
      </ul>
    </div>
  </div>
</template>
    
<script>
import { useDrawerStore } from '../stores/drawer';
import { useNetworkDevicesStore } from '@/stores/mikrotik';

export default {
  props: {
    rowData: Array,
    onlineRowCount: Number,
    offlineRowCount: Number
  },
  computed: {
    drawerOpen() {
      return useDrawerStore().drawerOpen;
    },
    mikrotikClientsData() {
      const networkDevicesStore = useNetworkDevicesStore();
      return networkDevicesStore.usersData.length;
    },
    shouldShowDetails() {
      return this.mikrotikClientsData > 0 && this.rowData.length > 0;
    },
  },
  methods: {
    triggerSendSelectedRows() {
      this.$emit('send-selected-rows');
    },
  },
};
</script>
    
<style>
/* Define your styles here */
.drawer-side {
  transform: translateX(100%);
  /* Other styles for positioning and animation */
}

.drawer-side.active {
  transform: translateX(0);
}

/* Other styles for the overlay and button */
</style>
  