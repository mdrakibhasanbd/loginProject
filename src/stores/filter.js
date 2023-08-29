// store/filter.js
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
    state: () => ({
        showFilters: false,
    }),
    actions: {
        toggleFilters() {
            this.showFilters = !this.showFilters;
            console.log("filter Click");
        },
    },
    getters: {
        isFilterVisible() {
            return this.showFilters;
        },
    },
});
