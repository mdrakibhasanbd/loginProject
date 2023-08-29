<!-- <template>
    <div class="w-full rounded-lg bg-white p-5 shadow">
        <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            <select selectedPackage
                class="w-full rounded-md border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0">
                <option value="all">All PKG</option>
                <option value="PKG-1">PKG-1</option>
                <option value="PKG-2">PKG-2</option>
                <option value="PKG-3">PKG-3</option>
                <option value="PKG-4">PKG-4</option>
                <option value="PKG-5">PKG-5</option>
                <option value="PKG-6">PKG-6</option>
                <option value="PKG-7">PKG-7</option>
                <option value="PKG-8">PKG-8</option>
                <option value="PKG-9">PKG-9</option>
            </select>

            <select statusFilter
                class="w-full rounded-md border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0">
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
        </div>

        <div class="mt-4 flex items-center justify-between">
            <button @click="resetFilters"
                class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                Reset Filter
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        selectedPackage: String,
        statusFilter: String,
    },
    methods: {
        resetFilters() {
            this.$emit('reset-filters');
        },
    },
};
</script>
   -->


<template>
    <div class="w-full rounded-lg bg-white p-5 shadow">
        <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            <!-- Package filter -->
            <select v-model="localSelectedPackage"
                class="w-full rounded-md border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0">
                <!-- Options here -->
                <option value="">All PKG</option>
                <option value="PKG-1">PKG-1</option>
                <option value="PKG-2">PKG-2</option>
                <option value="PKG-3">PKG-3</option>
                <option value="PKG-4">PKG-4</option>
                <option value="PKG-5">PKG-5</option>
                <option value="PKG-6">PKG-6</option>
                <option value="PKG-7">PKG-7</option>
                <option value="PKG-8">PKG-8</option>
                <option value="PKG-9">PKG-9</option>
            </select>

            <!-- Status filter -->
            <select v-model="localStatusFilter"
                class="w-full rounded-md border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0">
                <!-- Options here -->
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button @click="applyFilter">Filter</button>
        </div>

        <div class="mt-4 flex items-center justify-between">
            <button @click="resetFilters"
                class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                Reset Filter
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        selectedpackage: String,
        statusFilter: String,
    },
    data() {
        return {
            localSelectedPackage:'',
            localStatusFilter: '',
        };
    },
    methods: {
        resetFilters() {
            this.localSelectedPackage = this.selectedpackage;
            // this.localSelectedPackage = '';
            this.localStatusFilter = '';
            this.$emit('reset-filters');
        },

        applyFilter() {
            console.log("Click Filter");
            this.$emit('filter-data');

        }
    },
};
</script>
  