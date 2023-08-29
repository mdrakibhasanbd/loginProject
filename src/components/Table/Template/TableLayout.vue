<!-- TableComponent.vue -->
<template>

    <Sidebar>

    
    <div class="  md:px-8 xl:px-2 rounded-2xl  ">

        <SearchComponent v-model="searchQuery" @search="handleSearch" />
        <span v-if="searchQuery" class=" text-red-500">Search Count: {{ totalFilteredEntries }}</span>

        <table class=" table table-zebra rounded-2xl ">
            <!-- Table headers here -->
            <thead class=" table-fixed">
                <tr class="uppercase bg-gray-300 context-row" @contextmenu.prevent="showContextMenuAt($event, -1)">

                </tr>

            </thead>
            <tbody>
                <!-- Table rows here -->
                <template v-for="row in rowsData" :key="row.id">
                    <tr class="hover">
                        <td>
                            <label>
                                <input type="checkbox" class=" top-0 bg-white checkbox checkbox-primary" :value="row.id"
                                    v-model="selectedRows" @click.stop />
                            </label>
                        </td>
                        <td v-if="id">{{ row.id }}</td>
                        <td v-if="clientName">{{ row.clientName }}</td>
                        <td v-if="pppoeName">{{ row.pppoeName }}</td>
                        <td v-if="price">{{ row.price }}</td>
                        <td v-if="address">{{ row.address }}</td>
                        <td v-if="bandwidth">{{ row.bandwidth }}</td>
                        <td v-if="mobile">{{ row.mobile }}</td>
                        <td v-if="clientEmail">{{ row.clientEmail }}</td>
                        <td v-if="activation_date">{{ row.activation_date }}</td>
                        <td v-if="clientType">{{ row.clientType }}</td>
                        <!-- <td>{{ row.connectionType }}</td> -->
                        <!-- <td>{{ row.connectivityType }}</td> -->
                        <!-- <td>{{ row.distribution_point }}</td> -->
                        <!-- <td>{{ row.district }}</td> -->
                        <!-- <td>{{ row.division }}</td> -->
                        <!-- <td>{{ row.thana }}</td> -->



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
                                <ul tabindex="0"
                                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                                    <li @click="openEditModal(row)"><a>Edit</a></li>
                                    <!-- <button class="btn btn-primary" @click="openEditModal(row)"></button> -->

                                    <li><a>Edit</a></li>
                                    <li><a>Delete</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>

                </template>
            </tbody>
        </table>

        <div class=" sm:py-2 sm:px-5 mt-2 pr-2 mb-2 flex flex-row gap-5">
            <div class=" flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 lg:mt-0 ">
                <select class="select select-info w-full max-w-xs" v-model="itemsPerPage"
                    @change="handleItemsPerPageChange">
                    <option v-for="option in perPageOptions" :key="option" :value="option" class=" text-base">{{ option }}</option>
                </select>

            </div>

            <TablePagination :filteredData="filteredData" :currentPage="currentPage" :itemsPerPage="itemsPerPage"
                @page-change="changePage" />

        </div>
    </div>
</Sidebar>
</template>
<script>

import api from '../../../main';
import TablePagination from '../Template/TablePagination.vue';
import SearchComponent from '../Template//SearchComponent.vue';
import SortedAscendingSvg from '../Template//SortedAscendingSvg.vue'
import SortedDescendingSvg from '../Template//SortedDescendingSvg.vue'
import Sidebar from '../../Sidebar.vue';



export default {
    components: {
        Sidebar,
        TablePagination,
        SearchComponent,
        SortedAscendingSvg,
        SortedDescendingSvg,




    },
    beforeMount() {
        this.selectedRows = [];
        document.addEventListener('click', this.hideContextMenuOnClickOutside);

    },
    beforeUnmount() {
        document.removeEventListener('click', this.hideContextMenuOnClickOutside);
    },
    data() {
        return {
            columns: [
                { text: 'id', dataKey: 'id' },
                { text: 'client Name', dataKey: 'clientName' },
                { text: 'pppoe Name', dataKey: 'pppoeName' },
                { text: 'price', dataKey: 'price' },
                { text: 'address', dataKey: 'address' },
                { text: 'bandwidth', dataKey: 'bandwidth' },
                { text: 'mobile', dataKey: 'mobile' },
                { text: 'client Email', dataKey: 'clientEmail' },
                { text: 'activation date', dataKey: 'activation_date' },
                { text: 'clientType', dataKey: 'clientType' },
                { text: 'Action', dataKey: 'action' },
            ],
            id: false,
            clientName: true,
            pppoeName: true,
            price: true,
            address: true,
            bandwidth: true,
            mobile: true,
            clientEmail: false,
            activation_date: true,
            clientType: false,

            showContextMenu: false,
            contextMenuPosition: { x: 0, y: 0 },

            tableData: [],
            selectedRows: [],
            searchQuery: '',
            sortColumn: null,
            sortAscending: true,
            perPageOptions: [100,250, 500],
            isHeaderCheckboxChecked: false,
            currentPage: 1,
            itemsPerPage: 20,

            // isModalOpen: false,
            // isModalOpen: this.isOpen // Use the prop to set initial modal state



        };
    },
    computed: {
        filteredData() {
            if (!this.searchQuery) {
                return this.tableData;
            } else {
                const query = this.searchQuery.toLowerCase();
                return this.tableData.filter((row) => {
                    const columnsToSearch = ['id', 'clientName', 'pppoeName', 'price', 'address', 'bandwidth', 'mobile', 'clientEmail', 'activation_date', 'clientType'];
                    return columnsToSearch.some((column) => row[column].toString().toLowerCase().includes(query));
                });

            }

        },

        rowsData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredData.slice(startIndex, endIndex);
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

    },
    methods: {
        async fetchData() {
            try {
                const response = await api.get('/tableData');
                this.tableData = response.data;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        handleSearch(query) {
            this.searchQuery = query;
            // Update the filtered data here
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

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB) * (this.sortAscending ? 1 : -1);
                } else {
                    return (valueA - valueB) * (this.sortAscending ? 1 : -1);
                }
            });
        },
        selectAllRows(event) {
            const checkboxes = event.target.checked;
            this.selectedRows = checkboxes
                ? [...this.selectedRows, ...this.rowsData.map((row) => row.id)]
                : this.selectedRows.filter((rowId) => !this.rowsData.some((row) => row.id === rowId));

            this.isHeaderCheckboxChecked =
                this.selectedRows.length === this.rowsData.length &&
                this.selectedRows.every((rowId) => this.rowsData.some((row) => row.id === rowId));
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


        showContextMenuAt(event, index) {
            event.preventDefault();
            this.showContextMenu = true;
            this.contextMenuPosition = { x: event.pageX, y: event.pageY };
            this.selectedRowIndex = index;
        },
        hideContextMenu() {
            this.showContextMenu = false;
        },

        handleColumnClick(column) {
            // Handle the column click here
            console.log(`Clicked on column: ${column.text}`);
            this.hideContextMenu();
        },
        hideContextMenuOnClickOutside(event) {
            this.showContextMenu = false;

        },
        // Handle the emitted page-change event
        changePage(newPage) {
            this.currentPage = newPage;
        },

        // openModal() {
        //     console.log("open call");
        //     this.isModalOpen = true;
        // },
        // closeModal() {
        //     console.log("close call");
        //     this.isModalOpen = false;
        // },
        
        // openEditModal(row) {
        //     // Open the modal and pass the row data to the modal component if needed
        //     this.isModalOpen = true;
        // },

        async sendSelectedRows() {
            try {
                const dataToSend = this.selectedRows.map((rowId) => {
                    const row = this.tableData.find((item) => item.id === rowId);
                    return {
                        id: row.id,
                        name: row.name,
                        position: row.position,
                        // Add other properties as needed
                    };
                });

                const idsOnly = dataToSend.map((item) => item.id);
                console.log(idsOnly);
                this.selectedRows = [];
                this.isHeaderCheckboxChecked = false;
            } catch (error) {
                console.error('Error sending selected rows:', error);
            }
        },
    },
    async mounted() {
        await this.fetchData();
        // console.log('filteredData:', this.filteredData);

    },



};

</script>

