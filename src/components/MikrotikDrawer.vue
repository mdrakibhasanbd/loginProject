<template>
    <div class="drawer drawer-end sm:overflow-auto md:overflow-hidden">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" v-model="drawerOpen" />
      <div class="drawer-content bg-red-700  my-2 px-4 py-4  border rounded-md ">
        <h2 class=" font-semibold">Details for Row ID: {{ mikrotikDataLength }}{{ shouldShowDetails ? '/' + rowData.length : '' }}</h2>
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
    },
    computed: {
      drawerOpen() {
        return useDrawerStore().drawerOpen;
      },
      mikrotikDataLength() {
        const networkDevicesStore = useNetworkDevicesStore();
        return networkDevicesStore.mikrotikData.length;
      },
      shouldShowDetails() {
        return this.mikrotikDataLength > 0 && this.rowData.length > 0;
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
  