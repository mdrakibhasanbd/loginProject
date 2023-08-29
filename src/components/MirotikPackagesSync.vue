<template>
    <Sidebar>
        <Navbar :pageTitle="pageTitle" />

        <!-- <div class="md:px-8 sm:px-2 xl:px-2 "> -->
        <TableBodyLayout>
            <SearchComponent v-model="searchQuery" @search="handleSearch">

                <!-- Drawer Button -->
                <input id="my-drawer-4" type="checkbox" class="drawer-toggle" v-model="drawerOpen" />
                <label tabindex="0" for="my-drawer-4" v-if="showDrawerButton"
                    class="btn btn-md btn-circle m-1 w-full sm:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: #14b8a6;transform: ;msFilter:;">
                        <path
                            d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z">
                        </path>
                        <path
                            d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z">
                        </path>
                    </svg>
                </label>
            </SearchComponent>
            <span v-if="searchQuery" class="text-red-500">Search Count: {{ totalFilteredEntries }}</span>

            <div v-if="isFilterVisible" class="w-full rounded-lg bg-white p-5 shadow">
                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">

                    <select v-model="package" class="select select-bordered w-full max-w-xs">

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
                        <option value="PKG-10">PKG-10</option>
                    </select>

                </div>

                <div class="mt-4 flex items-center justify-between">
                    <button @click="resetFilters"
                        class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                        Reset Filter
                    </button>
                </div>
            </div>


            <!-- <div class=" bg-red-700 my-2 px-4 py-4 border rounded-md">
                <h2 class="font-semibold">
                    Details for Row ID: {{ syncPackageDataLength }}
                </h2>
            </div> -->

            <MirotikPackagesSyncDrawer :rowData="selectedRows" :itemsPerPage="itemsPerPage"
                @send-selected-rows="sendSelectedRowsDrawer">
                <table class="table rounded-2xl sm:table-sm">
                    <!-- Table headers here -->
                    <thead class="table-fixed">
                        <tr class="uppercase bg-gray-300 context-row">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox checkbox-primary"
                                        v-model="isHeaderCheckboxChecked" @click="selectAllRows" />
                                </label>
                            </th>

                            <th v-if="id">
                                <span @click="sortTable('id')">
                                    ID
                                    <span v-if="isSortedAscending('id')" class="sort-icon inline-block ml-1">
                                        <SortedAscendingSvg />
                                    </span>
                                    <span v-else-if="isSortedDescending('id')" class="sort-icon inline-block ml-1">
                                        <SortedDescendingSvg />
                                    </span>
                                </span>
                            </th>

                            <th v-if="package">
                                <span @click="sortTable('package')">
                                    PPPOE Package
                                    <span v-if="isSortedAscending('package')" class="sort-icon inline-block ml-1">
                                        <SortedAscendingSvg />
                                    </span>
                                    <span v-else-if="isSortedDescending('package')" class="sort-icon inline-block ml-1">
                                        <SortedDescendingSvg />
                                    </span>
                                </span>
                            </th>

                            <th v-if="name">
                                <span @click="sortTable('name')">
                                    Alias Name
                                    <span v-if="isSortedAscending('name')" class="sort-icon inline-block ml-1">
                                        <SortedAscendingSvg />
                                    </span>
                                    <span v-else-if="isSortedDescending('name')" class="sort-icon inline-block ml-1">
                                        <SortedDescendingSvg />
                                    </span>
                                </span>
                            </th>

                            <th v-if="rate">
                                <span @click="sortTable('rate')">
                                    rate
                                    <span v-if="isSortedAscending('rate')" class="sort-icon inline-block ml-1">
                                        <SortedAscendingSvg />
                                    </span>
                                    <span v-else-if="isSortedDescending('rate')" class="sort-icon inline-block ml-1">
                                        <SortedDescendingSvg />
                                    </span>
                                </span>
                            </th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(row, index) in rowsData" :key="row.id" class="hover">
                            <tr class="hover">
                                <td>
                                    <label>
                                        <input type="checkbox" class="top-0 bg-white checkbox checkbox-primary"
                                            :value="row.id" v-model="selectedRows" @click.stop />
                                    </label>
                                </td>
                                <td>{{ index + 1 }}</td>
                                <!-- <td>{{ row.id }}</td> -->
                                <td>{{ row.package }}</td>
                                <td v-if="name">{{ row.Name || "-" }}</td>
                                <td>{{ row.rate }}</td>

                                <td class="px-6 py-1 text-center">
                                    <!-- <div class="flex items-center w-auto md:w-auto"> -->



                                        <div class="dropdown dropdown-left">
                                            <label tabindex="0" class="btn btn-sm btn-ghost btn-circle">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24"
                                                    style="fill: rgb(20 184 166); transform: ; msfilter: ">
                                                    <path
                                                        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                                                    </path>
                                                </svg>
                                            </label>

                                            <ul tabindex="0"
                                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li>
                                                    <a href="#" @click.prevent="editPackage(row._id)">Edit</a>
                                                </li>                                            <li>
                                                    <!-- Use a button within an anchor tag for the "Remove" action -->
                                                    <a href="#" @click.prevent="removePackage(row._id)"
                                                        class="text-red-600">Remove</a>
                                                </li>
                                            </ul>
                                        </div>
                                    <!-- </div> -->
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <div class=" my-1 flex flex-row gap-2">
                    <div class="flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 lg:mt-0">
                        <select class="select select-info w-full max-w-xs" v-model="itemsPerPage"
                            @change="handleItemsPerPageChange">
                            <option v-for="option in perPageOptions" :key="option" :value="option" class="text-base">
                                {{ option }}
                            </option>
                        </select>
                    </div>

                    <TablePagination :filteredData="filteredData" :currentPage="currentPage" :itemsPerPage="itemsPerPage"
                        @page-change="changePage" />
                </div>
            </MirotikPackagesSyncDrawer>
        </TableBodyLayout>
        <!-- </div> -->
        <MikrotikPackageEditModal :isOpen="isEditModalOpen" :editPackageData="editPackageData" @close="closeModal" />

    </Sidebar>
</template>

<script>
import { useDrawerStore } from "../stores/drawer";
import { useFilterStore } from "../stores/filter";
import { useNetworkDevicesStore } from "@/stores/mikrotik";
import Sidebar from "./Sidebar.vue";
import TableBodyLayout from "./TableBodyLayout.vue";
import SearchComponent from "./Table/Template/SearchComponent.vue";
import Drawer from "./Drawer.vue";
import MirotikPackagesSyncDrawer from "./MirotikPackagesSyncDrawer.vue";
import MikrotikPackageEditModal from "../components/Modal/MikrotikPackageEditModal.vue"
import Navbar from "./Navbar.vue";
import Filter from "./Filter.vue"
import TablePagination from "./Table/Template/TablePagination.vue";
import SortedAscendingSvg from "./Table/Template/SortedAscendingSvg.vue";
import SortedDescendingSvg from "./Table/Template/SortedDescendingSvg.vue";
export default {
    components: {
        Sidebar,
        Navbar,
        TableBodyLayout,
        SearchComponent,
        MirotikPackagesSyncDrawer,
        Filter,
        MikrotikPackageEditModal,
        SortedAscendingSvg,
        SortedDescendingSvg,
        TablePagination,
    },

    data() {
        return {
            id: true,
            package: true,
            name: true,
            rate: true,

            // status:true,

            pageTitle: "Package Sync",
            selectedRows: [], // Selected rows data
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 20,
            perPageOptions: [100, 250, 500, 3000],
            editedPackageId: "",
            editPackageData: {
                Name: "",
                package: "",
                rate: "",
            },

            sortColumn: null,
            sortAscending: true,

            routerId: this.$route.params._id, // Initialize routerId with the value from route parameters
            isHeaderCheckboxChecked: false,
            isEditModalOpen: false,

            package: "all", // Default value for package filter
            statusFilter: "", // Default value for status filter
            showFilters: false, // Controls the visibility of the filter div
        };
    },
    computed: {
        // Reference the store and networkDevicesData directly
        networkDevicesStore() {
            return useNetworkDevicesStore();
        },

        isFilterVisible() {
            return useFilterStore().isFilterVisible;
        },


        filteredData() {
            const query = this.searchQuery.toLowerCase();
            const filteredRows = this.networkDevicesStore.syncPackageData.filter(
                (row) => {
                    const columnsToSearch = ["id", "package", "name", "rate"];
                    const matchesQuery = columnsToSearch.some((column) => {
                        const columnValue = row[column]?.toString().toLowerCase();
                        return columnValue?.includes(query);
                    });

                    const matchesPackage =
                        this.package === "all" ||
                        row.package === this.package;
                    const matchesStatus =
                        !this.statusFilter || row.status === this.statusFilter;

                    return matchesQuery && matchesPackage && matchesStatus;
                }
            );

            return filteredRows;
        },

        sortedData() {
            const dataCopy = [...this.filteredData]; // Create a copy to avoid modifying the original array
            if (this.sortColumn) {
                dataCopy.sort((a, b) => {
                    const valueA = a[this.sortColumn];
                    const valueB = b[this.sortColumn];

                    if (typeof valueA === "string" && typeof valueB === "string") {
                        return valueA.localeCompare(valueB) * (this.sortAscending ? 1 : -1);
                    } else {
                        return (valueA - valueB) * (this.sortAscending ? 1 : -1);
                    }
                });
            }
            return dataCopy;
        },


        rowsData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.sortedData.slice(startIndex, endIndex);
        },

        totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage);
        },
        totalFilteredEntries() {
            return this.filteredData.length;
        },
        selectedRowsCount() {
            useDrawerStore().updateSelectedRows(this.selectedRows);

            console.log(this.selectedRows);
            return this.selectedRows.length;
        },

        syncPackageDataLength() {
            const networkDevicesStore = useNetworkDevicesStore();
            return networkDevicesStore.syncPackageData.length;
        },
        showDrawerButton() {
            return this.selectedRows.length > 0;
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
    methods: {
        async sendSelectedRows() {
            try {
                const dataToSend = this.selectedRows.map((rowId) => {
                    const row = this.networkDevicesStore.syncPackageData.find(
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

        async syncPackage(routerId) {
            try {
                await this.networkDevicesStore.syncPackage(this.routerId);
            } catch (error) {
                console.error("Error syncing client:", error);
            }
        },
        async editPackage(deviceId) {
            // Handle the edit action here or perform any necessary actions
            console.log("Edit device with ID:", deviceId);
            // Find the device data based on the deviceId
            const device = this.networkDevicesStore.syncPackageData.find(
                (device) => device._id === deviceId
            );
            console.log(device);
            if (device) {
                this.editPackageData = {
                    editedPackageId: device._id,
                    Name: device.Name,
                    package: device.package,
                    rate: device.rate,
                    routerId:this.routerId
                };
                // Set the editedPackageId property
                this.editedPackageId = deviceId;
                // Open the modal
                this.isEditModalOpen = true;
            }
        },
        async removePackage(packageId) {
            try {
                await this.networkDevicesStore.removeSyncPackage(packageId); // Call the store action
            } catch (error) {
                console.error("Error removing device:", error);
            }
        },
        sortTable(columnKey) {
            if (this.sortColumn === columnKey) {
                this.sortAscending = !this.sortAscending;
            } else {
                this.sortColumn = columnKey;
                this.sortAscending = true;
            }

            this.filteredData.sort((a, b) => {
                const valueA = a[columnKey];
                const valueB = b[columnKey];
                // console.log(valueA, valueB);

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return valueA.localeCompare(valueB) * (this.sortAscending ? 1 : -1);
                } else {
                    return (valueA - valueB) * (this.sortAscending ? 1 : -1);
                }
            });
        },

        selectAllRows(event) {
            this.selectedRows;
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
            console.log("Modal clicked");
            this.isEditModalOpen = false;
            // this.isMikrotikPackagesSyncOpen = false;
            // this.isMikrotikClientsSyncOpen = false;
        },

        resetFilters() {
            console.log("call reset");
            this.package = "all";
            this.statusFilter = "";
        },
    },
    mounted() {
        this.syncPackage();
        // console.log(this.$route.params._id);
        console.log(this.networkDevicesStore.syncPackageData);

        console.log(this.rowsData.length);
    },
};
</script>
