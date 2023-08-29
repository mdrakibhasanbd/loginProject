<!-- TableComponent.vue -->
<template>
    <div class=" md:py-3 md:px-8 xl:px-2 rounded-2xl ">

        <div class="overflow-auto max-h-screen ">
            <div class="w-full md:w-1/2 pb-2  ">
                <form class="flex items-center">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative ">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 white:text-gray-400" fill="red"
                                viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input type="text" id="simple-search" v-model="searchQuery" @input="handleSearch"
                            class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                            placeholder="Search" required="">
                    </div>
                </form>
            </div>
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
            <button class="btn btn-primary" @click="sendSelectedRows">Send</button>
            <span>Selected Rows Count: {{ selectedRowsCount }}</span>





            <table class="table table-zebra  ">
                <!-- Table headers here -->
                <thead>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('id')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <th v-if=clientName>
                            <span @click="sortTable('clientName')">
                                client Name
                                <span v-if="isSortedAscending('clientName')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('clientName')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>

                        <th v-if=pppoeName>
                            <span @click="sortTable('pppoeName')">
                                pppoe Name
                                <span v-if="isSortedAscending('pppoeName')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('pppoeName')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>

                        <th v-if=price>
                            <span @click="sortTable('price')">
                                Price
                                <span v-if="isSortedAscending('price')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('price')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <!-- <th v-if=price>price</th> -->

                        <th v-if=address>
                            <span @click="sortTable('address')">
                                address
                                <span v-if="isSortedAscending('address')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('address')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <!-- <th v-if=address>address</th> -->
                        <th v-if=bandwidth>
                            <span @click="sortTable('bandwidth')">
                                bandwidth
                                <span v-if="isSortedAscending('bandwidth')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('bandwidth')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>

                        <!-- <th v-if=bandwidth>bandwidth</th> -->

                        <th v-if=mobile>
                            <span @click="sortTable('mobile')">
                                mobile
                                <span v-if="isSortedAscending('mobile')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('mobile')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down " viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <!-- <th v-if=mobile>mobile</th> -->
                        <th v-if=clientEmail>
                            <span @click="sortTable('clientEmail')">
                                client Email
                                <span v-if="isSortedAscending('clientEmail')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('clientEmail')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <!-- <th v-if=clientEmail>client Email</th> -->

                        <th v-if=activation_date>
                            <span @click="sortTable('activation_date')">
                                activation date
                                <span v-if="isSortedAscending('activation_date')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('activation_date')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <!-- <th v-if=activation_date>activation date</th> -->

                        <th v-if=clientType>
                            <span @click="sortTable('clientType')">
                                client Type
                                <span v-if="isSortedAscending('clientType')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-up" viewBox="0 0 16 16">
                                        <path d="M0 11h16l-8-8-8 8z" />
                                    </svg>
                                </span>
                                <span v-else-if="isSortedDescending('clientType')" class="sort-icon inline-block ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path d="M0 5h16l-8 8-8-8z" />
                                    </svg>
                                </span>
                            </span>
                        </th>
                        <!-- <th v-if=clientType>clientType</th> -->
                        <th>Action</th>


                        <!-- <th v-for="(column, ind) in sortcolumns" :key="ind">
                            <span @click="sortTable(ind)">
                                {{ column.text }}
                                <span class="sort-icon inline-block ml-1">
                                    <svg v-if="isSortedAscending(ind)" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"
                                        class="arrowDown sorting-data  false text-red-600  ">
                                        <path fill-rule="evenodd"
                                            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z">
                                        </path>
                                    </svg>
                                    <svg v-else-if="isSortedDescending(ind)" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"
                                        class="arrowUp sorting-data false text-teal-600  ">
                                        <path fill-rule="evenodd"
                                            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z">
                                        </path>
                                    </svg>

                                </span>
                            </span>
                        </th> -->
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
                                        <li><a>Edit</a></li>
                                        <li><a>Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>

                    </template>
                </tbody>
            </table>

        </div>
        <div class="mt-2 pr-2 mb-2 flex flex-row gap-5">
            <div class=" flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 lg:mt-0 ">
                <select class="select select-info w-full max-w-xs" v-model="itemsPerPage"
                    @change="handleItemsPerPageChange">
                    <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
                </select>

            </div>

            <!-- Pagination controls -->
            <div class=" flex-1 join justify-end items-center space-x-2 text-gray-600 mt-8 lg:mt-0 ">
                <button class="join-item btn" @click="goToFirstPage" :class="{ disabled: currentPage === 1 }"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                        <path d="m16.293 17.707 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414L10.586 12zM7 6h2v12H7z">
                        </path>
                    </svg></button>
                <button class="join-item btn" @click="changePage(-1)" :class="{ disabled: currentPage === 1 }">«</button>
                <button class="join-item btn">{{ currentPage }}</button>
                <button class="join-item btn">OF</button>
                <button class="join-item btn">{{ totalPages }}</button>
                <button class="join-item btn" @click="changePage(1)"
                    :class="{ disabled: currentPage === totalPages }">»</button>
                <button class="join-item btn" @click="goToLastPage" :class="{ disabled: currentPage === totalPages }"><svg
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                        <path d="M7.707 17.707 13.414 12 7.707 6.293 6.293 7.707 10.586 12l-4.293 4.293zM15 6h2v12h-2z">
                        </path>
                    </svg></button>
            </div>
        </div>
    </div>
</template>
  

<script>
import api from '../main';

export default {
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
            itemsPerPage: 20,
            currentPage: 1,
            selectedRows: [],
            searchQuery: '',
            sortColumn: null,
            sortAscending: true,
            perPageOptions: [250, 500, 1000, 3000],
            isHeaderCheckboxChecked: false,
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
        }
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
        goToFirstPage() {
            if (this.currentPage !== 1) {
                this.currentPage = 1;
            }
        },
        goToLastPage() {
            if (this.currentPage !== this.totalPages) {
                this.currentPage = this.totalPages;
            }
        },
        changePage(num) {
            this.isHeaderCheckboxChecked = false;
            this.currentPage += num;
            if (this.currentPage < 1) {
                this.currentPage = 1;
            } else if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
            }
        },
        handleSearch() {
            this.currentPage = 1;
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
</style>