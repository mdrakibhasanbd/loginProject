import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: false,
    selectedRows: [], // Initialize selectedRows state
  }),
  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    updateSelectedRows(rows) {
      this.selectedRows = rows; // Update the selected rows
      console.log(this.selectedRows);
    },

    hideDrawer(){
      this.drawerOpen = false
    }
  },
});
