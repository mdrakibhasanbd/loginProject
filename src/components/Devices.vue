<template>
    <Sidebar>
        <Navbar :pageTitle="pageTitle" />

            <TableBodyLayout>
                <SearchComponent v-model="searchQuery" @search="handleSearch">
                </SearchComponent>
                <span v-if="searchQuery" class="text-red-500">Search Count: {{ totalFilteredEntries }}</span>

                <!-- <div class=" bg-red-700 my-2 px-4 py-4 border rounded-md">
                    <h2 class="font-semibold">
                        Details for Row ID: {{ networkDevicesDataLength
                        }}
                    </h2>
                </div> -->
                <DeviceDrawer>

                    <table class="table rounded-2xl md:table-md sm:table-sm">
                        <!-- Table headers here -->
                        <thead class="table-fixed">
                            <tr class="uppercase bg-gray-300 context-row"
                                @contextmenu.prevent="showContextMenuAt($event, -1)">
                                <th>
                                    <label>
                                        <input type="checkbox" class="checkbox checkbox-primary" />
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

                                <th v-if="mikrotikName">
                                    <span @click="sortTable('mikrotikName')">
                                        mikrotikName
                                        <span v-if="isSortedAscending('mikrotikName')" class="sort-icon inline-block ml-1">
                                            <SortedAscendingSvg />
                                        </span>
                                        <span v-else-if="isSortedDescending('mikrotikName')" class="sort-icon inline-block ml-1">
                                            <SortedDescendingSvg />
                                        </span>
                                    </span>
                                </th>

                                <th v-if="mikrotikIp">
                                    <span @click="sortTable('mikrotikIp')">
                                        mikrotikIp
                                        <span v-if="isSortedAscending('mikrotikIp')" class="sort-icon inline-block ml-1">
                                            <SortedAscendingSvg />
                                        </span>
                                        <span v-else-if="isSortedDescending('mikrotikIp')" class="sort-icon inline-block ml-1">
                                            <SortedDescendingSvg />
                                        </span>
                                    </span>
                                </th>

                                <th v-if="mikrotikPort">
                                    <span @click="sortTable('mikrotikPort')">
                                        mikrotikPort
                                        <span v-if="isSortedAscending('mikrotikPort')" class="sort-icon inline-block ml-1">
                                            <SortedAscendingSvg />
                                        </span>
                                        <span v-else-if="isSortedDescending('mikrotikPort')" class="sort-icon inline-block ml-1">
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
                                    <td>{{ row.mikrotikName }}</td>
                                    <td>{{ row.mikrotikIp }}</td>
                                    <td>{{ row.mikrotikPort }}</td>

                                    <td class="px-6 py-1 text-center">
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
                                                    <a @click.prevent="mikrotikClientsSync(row._id)">Client Sync</a>
                                                </li>
                                                <li>
                                                    <a @click.prevent="mikrotikPackagesSync(row._id)">Packages Sync</a>
                                                </li>
                                                <li>
                                                    <a href="#" @click.prevent="editDevice(row._id)">Edit</a>
                                                </li>
                                                <li>
                                                    <!-- Use a button within an anchor tag for the "Remove" action -->
                                                    <a href="#" @click.prevent="removeDevice(row._id)"
                                                        class="text-red-600">Remove</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div class="my-1 flex flex-row gap-2">
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
                </DeviceDrawer>
            </TableBodyLayout>


        <!-- <TableEditMikrotikModal :isOpen="isEditModalOpen" @close="closeModal" /> -->
        <TableEditMikrotikModal :isOpen="isEditModalOpen" :editedDeviceData="editedDeviceData" @close="closeModal" />
        <MikrotikClientsSync :isOpen="isMikrotikClientsSyncOpen" :mikrotikClientsSyncData="mikrotikClientsSyncData"
            @close="closeModal" />
        <MikrotikPackageSync :isOpen="isMikrotikPackagesSyncOpen" :mikrotikPackagesSyncData="mikrotikPackagesSyncData"
            @close="closeModal" />
    </Sidebar>
</template>

<script>
import TableEditMikrotikModal from "./Modal/TableEditMikrotikModal.vue";
import MikrotikClientsSync from "./Modal/MikrotikClientsSync.vue";
import MikrotikPackageSync from "./Modal/MikrotikPackageSync.vue";
import { useNetworkDevicesStore } from "@/stores/mikrotik";
import Sidebar from "./Sidebar.vue";
import SearchComponent from "./Table/Template/SearchComponent.vue";
import { useDrawerStore } from "../stores/drawer";
import { useFilterStore } from "../stores/filter";

import Drawer from "./Drawer.vue";
import DeviceDrawer from "./DeviceDrawer.vue"
import Navbar from "./Navbar.vue";
import Filter from "./Filter.vue";
import TablePagination from "./Table/Template/TablePagination.vue";
import TableBodyLayout from "./TableBodyLayout.vue";
import SortedAscendingSvg from "./Table/Template/SortedAscendingSvg.vue";
import SortedDescendingSvg from "./Table/Template/SortedDescendingSvg.vue";

export default {
    components: {
        Sidebar,
        Navbar,
        Drawer,
        DeviceDrawer,
        SearchComponent,
        TableEditMikrotikModal,
        MikrotikClientsSync,
        MikrotikPackageSync,
        TablePagination,
        TableBodyLayout,
        SortedAscendingSvg,
        SortedDescendingSvg,
    },
    data() {
        return {
            pageTitle: "Mikrotik",
            id:true,
            mikrotikName:true,
            mikrotikIp:true,
            mikrotikPort:true,

            selectedRows: [], // Selected rows data
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 20,
            perPageOptions: [100, 250, 500, 3000],
            sortColumn:null,
            editedDeviceId: "",
            editedDeviceData: {
                mikrotikName: "",
                mikrotikUserName: "",
                mikrotikPassword: "",
                mikrotikIp: "",
                mikrotikPort: "",
            },
            isEditModalOpen: false,
            isMikrotikClientsSyncOpen: false,
            isMikrotikPackagesSyncOpen: false,
            mikrotikClientsSyncData: "",
            mikrotikPackagesSyncData: "",
        };
    },
    computed: {
        // Reference the store and networkDevicesData directly
        networkDevicesStore() {
            return useNetworkDevicesStore();
        },
        // filteredData() {
        //     if (!this.searchQuery) {
        //         return this.networkDevicesStore.networkDevicesData;
        //     } else {
        //         const query = this.searchQuery.toLowerCase();
        //         return this.networkDevicesStore.networkDevicesData.filter((row) => {
        //             const columnsToSearch = [
        //                 "id",
        //                 "clientName",
        //                 "pppoeName",
        //                 "price",
        //                 "address",
        //                 "bandwidth",
        //                 "mobile",
        //                 "clientEmail",
        //                 "activation_date",
        //                 "clientType",
        //             ];
        //             return columnsToSearch.some((column) =>
        //                 row[column].toString().toLowerCase().includes(query)
        //             );
        //         });
        //     }
        // },


        filteredData() {
            const query = this.searchQuery.toLowerCase();
            const filteredRows = this.networkDevicesStore.networkDevicesData.filter(
                (row) => {
                    const columnsToSearch = ["id", "mikrotikName", "mikrotikIp"];
                    const matchesQuery = columnsToSearch.some((column) => {
                        const columnValue = row[column]?.toString().toLowerCase();
                        return columnValue?.includes(query);
                    });



                    return matchesQuery
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
            return this.selectedRows.length;
        },

        networkDevicesDataLength() {
            const networkDevicesStore = useNetworkDevicesStore();
            // this.networkDevicesStore.networkDevicesData;
            return networkDevicesStore.networkDevicesData.length;
        },
    },
    methods: {
        async editDevice(deviceId) {
            // Handle the edit action here or perform any necessary actions
            console.log("Edit device with ID:", deviceId);
            // Find the device data based on the deviceId
            const device = this.networkDevicesStore.networkDevicesData.find(
                (device) => device._id === deviceId
            );
            console.log(device);
            if (device) {
                this.editedDeviceData = {
                    mikrotikDeviceId: device._id,
                    mikrotikName: device.mikrotikName,
                    mikrotikUserName: device.mikrotikUserName,
                    mikrotikPassword: device.mikrotikPassword,
                    mikrotikIp: device.mikrotikIp,
                    mikrotikPort: device.mikrotikPort,
                };
                // Set the editedDeviceId property
                this.editedDeviceId = deviceId;
                // Open the modal
                this.isEditModalOpen = true;
            }
        },

        async DevicesData() {
            try {
                await this.networkDevicesStore.fetchnetworkDevicesData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        isSortedAscending(columnIndex) {
            return this.sortColumn === columnIndex && this.sortAscending;
        },
        isSortedDescending(columnIndex) {
            return this.sortColumn === columnIndex && !this.sortAscending;
        },

        async removeDevice(deviceId) {
            try {
                await this.networkDevicesStore.removeDevice(deviceId); // Call the store action
            } catch (error) {
                console.error("Error removing device:", error);
            }
        },

        mikrotikClientsSync(deviceId) {
            this.isMikrotikClientsSyncOpen = true;
            this.mikrotikClientsSyncData = deviceId;
            console.log(deviceId);
        },

        mikrotikPackagesSync(deviceId) {
            this.isMikrotikPackagesSyncOpen = true;
            this.mikrotikPackagesSyncData = deviceId;
            console.log(deviceId);
        },
        handleItemsPerPageChange() {
            this.currentPage = 1;
        },
        handleSearch(query) {
            this.searchQuery = query;
            // Update the filtered data here
        },
        changePage(newPage) {
            this.currentPage = newPage;
            this.isHeaderCheckboxChecked = false;
        },
        openModal() {
            this.isEditModalOpen = true;
        },
        // closeModal() {
        //     this.isEditModalOpen = false;
        //     this.isMikrotikPackagesSyncOpen = false;
        //     this.isMikrotikClientsSyncOpen = false;

        //     if (event.target.tagName === 'dialog') {
        //         this.isEditModalOpen
        //     }
        //     else if(event.target.tagName === 'dialog.modal') {
        //         this.isEditModalOpen = true

        //     }
        // },

        // closeModal(event) {
        //     if (event && event.target && event.target.classList.contains('modal')) {
        //         this.isOpen = false;
        //         this.isEditModalOpen = false;

        //     }
        // },

        closeModal() {
            console.log("Modal clicked");
            this.isEditModalOpen = false;
            this.isMikrotikPackagesSyncOpen = false;
            this.isMikrotikClientsSyncOpen = false;
        },
    },
    async mounted() {
        await this.DevicesData();
        // console.log('networkDevicesData:', this.networkDevicesStore.networkDevicesData);
    },
};
</script>
