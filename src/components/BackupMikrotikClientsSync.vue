<template>
    <Sidebar>
        <Navbar :pageTitle="pageTitle" />


        <div class="md:px-8 sm:px-2 xl:px-2 rounded-2xl sm:overflow-auto">
            <SearchComponent v-model="searchQuery" @search="handleSearch" />
            <span v-if="searchQuery" class=" text-red-500">Search Count: {{ totalFilteredEntries }}</span>


            <div class="flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 lg:mt-0">
                <select class="select select-info w-full max-w-xs" v-model="selectedFilter" @change="applyCustomFilter">
                    <option value="all">All</option>
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
            </div>
            
            <div class="flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 lg:mt-0">
                <select class="select select-info w-full max-w-xs" v-model="selectedFilter2" @change="applyCustomFilter">
                    <option value="all">All</option>
                    <option value="Option-1">Option-1</option>
                    <option value="Option-2">Option-2</option>
                    <!-- Add more filter options if needed -->
                </select>
            </div>
            
            <button class="btn btn-primary" @click="applyCustomFilter">Apply Filter</button>
            
            <Drawer :rowData="selectedRows" @send-selected-rows="sendSelectedRowsDrawer">


                <table class="table rounded-2xl">
                    <!-- Table headers here -->
                    <thead class="table-fixed">
                        <tr class="uppercase bg-gray-300 context-row" @contextmenu.prevent="showContextMenuAt($event, -1)">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox checkbox-primary"
                                        v-model="isHeaderCheckboxChecked" @click="selectAllRows" />
                                </label>
                            </th>
                            <th>ID</th>
                            <th>PPPOE Name</th>
                            <th>PPPOE PASSWORD</th>
                            <th>PPPOE PACKAGE</th>
                            <th>Router</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loop through rowsData and display rows -->
                        <template v-for="(row, index) in rowsData" :key="row.id">
                            <tr class="hover">
                                <td>
                                    <label>
                                        <input type="checkbox" class="top-0 bg-white checkbox checkbox-primary"
                                            :value="row.id" v-model="selectedRows" @click.stop />
                                    </label>
                                </td>
                                <td v-if="id">{{ row.id }}</td>
                                <td>{{ row.id }}</td>
                                <td>{{ row.pppoeUserName }}</td>
                                <td>{{ row.pppoePassword }}</td>
                                <td>{{ row.selectPackage }}</td>
                                <td>{{ row.routerName[0].mikrotikName }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>


                <div class=" sm:py-2 sm:px-5 mt-2 pr-2 mb-2 flex flex-row gap-5">
                    <div class=" flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 lg:mt-0 ">
                        <select class="select select-info w-full max-w-xs" v-model="itemsPerPage"
                            @change="handleItemsPerPageChange">
                            <option v-for="option in perPageOptions" :key="option" :value="option" class=" text-base">{{
                                option
                            }}</option>
                        </select>

                    </div>

                    <TablePagination :filteredData="filteredData" :currentPage="currentPage" :itemsPerPage="itemsPerPage"
                        @page-change="changePage" />

                </div>
            </Drawer>
        </div>
    </Sidebar>
</template>

<script>
import { useDrawerStore } from '../stores/drawer';
import { useNetworkDevicesStore } from "@/stores/mikrotik";
import Sidebar from "./Sidebar.vue";
import SearchComponent from "./Table/Template/SearchComponent.vue";
import Drawer from "./Drawer.vue";
import Navbar from './Navbar.vue';
import TablePagination from './Table/Template/TablePagination.vue';
export default {
    components: {
        Sidebar,
        Navbar,
        SearchComponent,
        Drawer,
        TablePagination,
    },

    data() {
        return {
            id: false,
            pageTitle: "Client Sync",
            selectedRows: [], // Selected rows data
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 20,
            perPageOptions: [100, 250, 500, 3000],

            routerId: this.$route.params._id, // Initialize routerId with the value from route parameters
            isHeaderCheckboxChecked: false,

            customFilteredData: [], // Rename the computed property to avoid conflict
            selectedFilter: 'all', // Initialize with default filter
            selectedFilter2: 'all'

        };
    },
    computed: {
        // Reference the store and networkDevicesData directly
        networkDevicesStore() {
            return useNetworkDevicesStore();
        },

        filteredData() {
            let data = this.networkDevicesStore.syncClientData;

            // Apply package filtering if a package filter is selected
            if (this.selectedFilter !== 'all') {
                data = data.filter(row => row.selectPackage === this.selectedFilter);
            }

            // Apply search filtering if a search query is entered
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                data = data.filter(row => {
                    const columnsToSearch = [
                        // "id",
                        "pppoeUserName",
                        "pppoePassword",
                    ];
                    return columnsToSearch.some(column => {
                        const columnValue = row[column]?.toString().toLowerCase();
                        return columnValue?.includes(query);
                    });
                });
            }

            return data;
        },


        rowsData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredData.slice(startIndex, endIndex);
        },

        totalFilteredEntries() {
            return this.filteredData.length;
        },

    },
    methods: {
        async sendSelectedRows() {
            try {
                const dataToSend = this.selectedRows.map((rowId) => {
                    const row = this.networkDevicesStore.syncClientData.find(
                        (item) => item.id === rowId
                    );
                    return {
                        id: row.id,
                    };
                });

                const idsOnly = dataToSend.map((item) => item.id);
                console.log(idsOnly);
                this.selectedRows = [];
                this.isHeaderCheckboxChecked = false;
            } catch (error) {
                console.error("Error sending selected rows:", error);
            }
        },

        sendSelectedRowsDrawer() {
            console.log("Call Drawer");
            this.sendSelectedRows(); // Call the existing sendSelectedRows method

        },

        async syncClient(routerId) {
            try {
                await this.networkDevicesStore.syncClient(this.routerId);

            } catch (error) {
                console.error("Error syncing client:", error);
            }
        },


        selectAllRows(event) {
            this.selectedRows
            const checkboxes = event.target.checked;
            this.selectedRows = checkboxes
                ? [...this.selectedRows, ...this.rowsData.map((row) => row.id)]
                : this.selectedRows.filter(
                    (rowId) => !this.rowsData.some((row) => row.id === rowId)
                );

            this.isHeaderCheckboxChecked =
                this.selectedRows.length === this.rowsData.length &&
                this.selectedRows.every((rowId) =>
                    this.rowsData.some((row) => row.id === rowId)
                );
        },

        isSortedAscending(columnIndex) {
            return this.sortColumn === columnIndex && this.sortAscending;
        },
        isSortedDescending(columnIndex) {
            return this.sortColumn === columnIndex && !this.sortAscending;
        },
        handleItemsPerPageChange() {
            this.currentPage = 1;
        },
        handleHeaderCheckboxClick() {
            this.isHeaderCheckboxChecked = !this.isHeaderCheckboxChecked;

            if (this.isHeaderCheckboxChecked) {
                this.selectedRows = this.tableData.map((row) => row.id);
            } else {
                this.selectedRows = [];
            }
        },


        handleSearch(query) {
            this.searchQuery = query;
            // Update the filtered data here
        },
        // Handle the emitted page-change event
        changePage(newPage) {
            this.currentPage = newPage;
            this.isHeaderCheckboxChecked = false;

        },
        openModal() {
            this.isEditModalOpen = true;
        },
        closeModal() {
            this.isEditModalOpen = false;
            this.isMikrotikPackagesSyncOpen = false;
            this.isMikrotikClientsSyncOpen = false;

            if (event.target.tagName === "DIALOG") {
                this.isEditModalOpen = false;
            }
        },



        // applyCustomFilter() {
        //     console.log("call filter");
        //     console.log(this.customFilteredData); // Add this line
        //     console.log("Selected filter:", this.selectedFilter);

        //     if (this.selectedFilter === 'PKG-1') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-1');
        //     } else if (this.selectedFilter === 'PKG-2') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-2');
        //     } else if (this.selectedFilter === 'PKG-3') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-3');
        //     } else if (this.selectedFilter === 'PKG-4') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-4');
        //     } else if (this.selectedFilter === 'PKG-5') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-5');
        //     } else if (this.selectedFilter === 'PKG-6') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-6');
        //     } else if (this.selectedFilter === 'PKG-7') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-7');
        //     } else if (this.selectedFilter === 'PKG-8') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-8');
        //     } else if (this.selectedFilter === 'PKG-9') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === 'PKG-9');
        //     } else {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData;
        //     }

        //     this.currentPage = 1;
        // },


        // applyCustomFilter() {
        //     console.log("Applying custom filter...");
        //     console.log("Selected filter:", this.selectedFilter);

        //     if (this.selectedFilter === 'all') {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData;
        //     } else {
        //         this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row => row.selectPackage === this.selectedFilter);
        //     }

        //     console.log("Filtered data:", this.customFilteredData); // Log the filtered data

        //     this.currentPage = 1;
        // },


        applyCustomFilter() {
    console.log("Applying custom filters...");
    console.log("Selected filter 1:", this.selectedFilter);
    console.log("Selected filter 2:", this.selectedFilter2);

    // Filter based on both selected filters
    if (this.selectedFilter === 'all' && this.selectedFilter2 === 'all') {
        this.customFilteredData = this.networkDevicesStore.syncClientData;
    } else {
        this.customFilteredData = this.networkDevicesStore.syncClientData.filter(row =>
            (this.selectedFilter === 'all' || row.selectPackage === this.selectedFilter) &&
            (this.selectedFilter2 === 'all' || row.selectPackage === this.selectedFilter2)
        );
    }

    console.log("Filtered data:", this.customFilteredData);

    this.currentPage = 1;
},

    },
    mounted() {
        this.syncClient();
        // console.log(this.$route.params._id);
        console.log(this.networkDevicesStore.syncClientData);

        // console.log(this.tableData);
    },
};
</script>
