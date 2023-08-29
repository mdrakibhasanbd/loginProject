<!-- TableComponent.vue -->
<template>

    <Sidebar>

    
    <div class="  md:px-8 xl:px-2 rounded-2xl  ">

        <!-- <div class=" "> -->


        <SearchComponent v-model="searchQuery" @search="handleSearch" />
        <span v-if="searchQuery" class=" text-red-500">Search Count: {{ totalFilteredEntries }}</span>






        <ul class="context-menu " v-show="showContextMenu"
            :style="{ left: contextMenuPosition.x + 'px', top: contextMenuPosition.y + 'px' }">
            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">id</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=id />
                </label>
            </div>

            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Client Name</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=clientName />
                </label>
            </div>

            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">PPPoE Name</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=pppoeName />
                </label>
            </div>

            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Price</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=price />
                </label>
            </div>

            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Address</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=address />
                </label>
            </div>

            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Mobile</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=mobile />
                </label>
            </div>
            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Client Email</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=clientEmail />
                </label>
            </div>
            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Activation Date</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=activation_date />
                </label>
            </div>
            <div class="form-control w-25 hover:bg-info">
                <label class="label">
                    <span class="label-text px-2 hover">Client Type</span>
                    <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model=clientType />
                </label>
            </div>
        </ul>

        <div>
                <button class="btn btn-primary" @click="sendSelectedRows">Send</button>
                <span>Selected Rows Count: {{ selectedRowsCount }}</span>
            </div>

        <!-- <Temp :is-open="isModalOpen" /> -->
        <table class=" table table-zebra rounded-2xl ">
            <!-- Table headers here -->
            <thead class=" table-fixed">
                <tr class="uppercase bg-gray-300 context-row" @contextmenu.prevent="showContextMenuAt($event, -1)">
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox checkbox-primary" v-model="isHeaderCheckboxChecked"
                                @click="selectAllRows" />
                        </label>
                    </th>
                    <th v-if="id">
                        <span @click="sortTable('id')">
                            id
                            <span v-if="isSortedAscending('id')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('id')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>
                    <th v-if=clientName>
                        <span @click="sortTable('clientName')">
                            client Name
                            <span v-if="isSortedAscending('clientName')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('clientName')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>

                    <th v-if=pppoeName>
                        <span @click="sortTable('pppoeName')">
                            pppoe Name
                            <span v-if="isSortedAscending('pppoeName')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('pppoeName')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>

                    <th v-if=price>
                        <span @click="sortTable('price')">
                            Price
                            <span v-if="isSortedAscending('price')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('price')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>

                    <th v-if=address>
                        <span @click="sortTable('address')">
                            address
                            <span v-if="isSortedAscending('address')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('address')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>
                    <!-- <th v-if=address>address</th> -->
                    <th v-if=bandwidth>
                        <span @click="sortTable('bandwidth')">
                            bandwidth
                            <span v-if="isSortedAscending('bandwidth')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('bandwidth')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>

                    <!-- <th v-if=bandwidth>bandwidth</th> -->

                    <th v-if=mobile>
                        <span @click="sortTable('mobile')">
                            mobile
                            <span v-if="isSortedAscending('mobile')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('mobile')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>
                    <!-- <th v-if=mobile>mobile</th> -->
                    <th v-if=clientEmail>
                        <span @click="sortTable('clientEmail')">
                            client Email
                            <span v-if="isSortedAscending('clientEmail')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('clientEmail')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>
                    <!-- <th v-if=clientEmail>client Email</th> -->

                    <th v-if=activation_date>
                        <span @click="sortTable('activation_date')">
                            activation date
                            <span v-if="isSortedAscending('activation_date')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('activation_date')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>
                    <!-- <th v-if=activation_date>activation date</th> -->

                    <th v-if=clientType>
                        <span @click="sortTable('clientType')">
                            client Type
                            <span v-if="isSortedAscending('clientType')" class="sort-icon inline-block ml-1">
                                <SortedAscendingSvg />
                            </span>
                            <span v-else-if="isSortedDescending('clientType')" class="sort-icon inline-block ml-1">
                                <SortedDescendingSvg />
                            </span>
                        </span>
                    </th>
                    <!-- <th v-if=clientType>clientType</th> -->
                    <th>Action</th>


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
// import TableMixin from '../MixInFile/TableMixin'

// export default {
//     mixins: [TableMixin],

// };
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
            this.selectedRows = []; 
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


<style>
.context-menu {
    position: absolute;
    background-color: #f2f2f2;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    min-width: 100px;
    border: 1px solid #0bcef1;
    z-index: 1200;
    padding-left: 0px;
}

.context-menu ul li {
    padding: 4px 16px;
}


.context-menu li {
    list-style-type: none;
    padding: 4px 16px;
}

.context-menu li:hover {
    background-color: #4677f8;
    color: #ffffff;
}


/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.9s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>