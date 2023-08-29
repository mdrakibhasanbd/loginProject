<template>
    <div>
        <input v-model="searchQuery" @input="filterData" placeholder="Search" />
        <!-- Table -->
        <table>
            <!-- Table header -->
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" v-model="selectAll" @change="selectAllRows" />
                    </th>
                    <th v-for="column in columns" :key="column.key" @click="sortTable(column.key)">
                        {{ column.label }} <i v-if="sortKey === column.key" :class="sortOrder"></i>
                    </th>
                </tr>
            </thead>

            <!-- Table body -->
            <tbody>
                <tr v-for="row in paginatedData" :key="row.id">
                    <td>
                        <input type="checkbox" v-model="selectedRows" :value="row.id" />
                    </td>
                    <td>{{ row.id }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.position }}</td>
                    <td>{{ row.office }}</td>
                    <td>{{ row.extension }}</td>
                    <td>{{ row.startdate }}</td>
                    <td>{{ row.salary }}</td>
                    <td>{{ row.Action }}</td>

                    <!-- Add other columns based on your data -->
                </tr>
            </tbody>
        </table>
        <!-- Select items per page -->
        <div class="items-per-page">
            <label>Items per page:</label>
            <select v-model="perPage" @change="handleItemsPerPageChange">
                <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>

        <!-- Pagination -->
        <!-- <pagination :data="filteredData" :per-page="perPage" @pagination-change="handlePageChange" /> -->
        <Pagination :data="yourDataArray" :per-page="itemsPerPage" :current-page="currentPage"
            @pagination-change="handlePageChange" />

        <!-- <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <button class="page-link" @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
                </li>
                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                    :class="{ active: currentPage === pageNumber }">
                    <button class="page-link" @click="goToPage(pageNumber)">{{ pageNumber }}</button>
                </li>
                <li class="page-item">
                    <button class="page-link" @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
                </li>
            </ul>
        </nav> -->
        <!-- Search -->

    </div>
</template>
  
<script>
import axios from "axios";
import _ from "lodash";
import api from '../main';
import Pagination from "./Pagination.vue"; // Import the Pagination component

export default {
    name: "DataTable",
    components: {
        Pagination, // Register the Pagination component
    },
    data() {
        return {
            data: [],
            filteredData: [],
            yourDataArray: [],
            selectedRows: [],
            searchQuery: "",
            selectAll: false, // New property for "Select All" checkbox
            sortKey: "",
            sortOrder: "fas fa-sort",
            list: [],
            currentPage: 1,
            perPage: 100,
            itemsPerPage:50,
            perPageOptions: [50, 100, 250, 500], // Customize this array with options you want to offer
            currentPage: 1,
            columns: [
                { key: 'id', label: 'id' },
                { key: 'name', label: 'Name' },
                { key: 'position', label: 'Position' },
                { key: 'office', label: 'Office' },
                { key: 'extension', label: 'Extension' },
                { key: 'startdate', label: 'Start Date' },
                { key: 'salary', label: 'Salary' },
                { key: 'Action', label: 'Action' }
            ],
        };
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.filteredData.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredList.length / this.perPage); // Use filteredList instead of list
        },
        filteredList() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = this.currentPage * this.perPage;
            return this.list.slice(start, end);
        }
    },
    watch: {
        // Watch for changes in the selectAll property
        selectAll(value) {
            if (value) {
                // If the "Select All" checkbox is checked, select all rows
                this.selectedRows = this.filteredData.map((row) => row.id);
            } else {
                // If the "Select All" checkbox is unchecked, clear the selection
                this.selectedRows = [];
            }
        },
    },
    methods: {
        getData() {
            // Fetch data using Axios or your API
            // Replace 'YOUR_API_URL' with the actual API endpoint
            api.get('/tableData').then((response) => {
                this.data = response.data;
                this.filterData();
            });
        },
        sortTable(key) {
            if (this.sortKey === key) {
                this.filteredData.reverse();
                this.sortOrder = this.sortOrder === "fas fa-sort" ? "fas fa-sort-up" : "fas fa-sort-down";
            } else {
                this.sortKey = key;
                this.sortOrder = "fas fa-sort-up";
                this.filteredData = _.sortBy(this.filteredData, key);
            }
        },
        filterData() {
            this.currentPage = 1;
            this.filteredData = this.data.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            );
        },

        handlePageChange(newPage) {
            // Update the current page with the new page emitted from the Pagination component
            this.currentPage = newPage;
            // You may also update your data array here based on the new page value
            // For example, fetch data for the new page from the server if using AJAX
            // this.fetchDataForPage(newPage);
        },
        handleItemsPerPageChange() {
            this.currentPage = 1;
        },
        selectAllRows() {
            this.selectAll = !this.selectAll;
        },
        goToPage(pageNumber) {
            if (pageNumber > 0 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
            }
        },
        changePage(num) {
            this.currentPage += num;
            // Ensure the currentPage is within valid bounds
            if (this.currentPage < 1) {
                this.currentPage = 1;
            } else if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
            }
        },
    },
    mounted() {
        this.getData();
    },
};
</script>
<style>
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
}

th,
td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

th {
    cursor: pointer;
}

.pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.input-search {
    margin-top: 10px;
}
</style>
  