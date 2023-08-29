<!-- TableComponent.vue -->
<template>
    <Sidebar>
        <Navbar :pageTitle="pageTitle" />

        <div class="md:px-8 xl:px-2 rounded-2xl">
            <SearchComponent v-model="searchQuery" @search="handleSearch" />
            <span v-if="searchQuery" class="text-red-500">Search Count: {{ totalFilteredEntries }}</span>

            <ul class="context-menu" v-show="showContextMenu" :style="{
                left: contextMenuPosition.x + 'px',
                top: contextMenuPosition.y + 'px',
            }">
                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">id</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="id" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">User Name</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="userName" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">Mikrotik Name</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="mikrotikName" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">PPPoE Name</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="pppoeUserName" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">PPPoE Password</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="pppoePassword" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">Package Rate</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="rate" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">Address</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="userAddress" />
                    </label>
                </div>

                <div class="form-control w-25 hover:bg-info">
                    <label class="label">
                        <span class="label-text px-2 hover">Mobile</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="userMobile" />
                    </label>
                </div>
            </ul>

            <div>
                <button class="btn btn-primary" @click="sendSelectedRows">Send</button>
                <span>Selected Rows Count: {{ selectedRowsCount }}</span>
            </div>

            <!-- <Temp :is-open="isModalOpen" /> -->
            <table class="table rounded-2xl">
                <!-- Table headers here -->
                <thead class="table-fixed">
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

                        <th v-if="status">
                            <span @click="sortTable('status')">
                                status
                                <span v-if="isSortedAscending('status')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('status')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>
                        <th v-if="userName">
                            <span @click="sortTable('userName')">
                                User Name
                                <span v-if="isSortedAscending('userName')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userName')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>
                        <th v-if="mikrotikName">
                            <span @click="sortTable('mikrotikName')">
                                Mikrotik Name
                                <span v-if="isSortedAscending('mikrotikName')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('mikrotikName')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>
                        <th v-if="selectPackage">
                            <span @click="sortTable('selectPackage')">
                                Package
                                <span v-if="isSortedAscending('selectPackage')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('selectPackage')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>
                        <th v-if="pppoeUserName">
                            <span @click="sortTable('pppoeUserName')">
                                PPPoE Username
                                <span v-if="isSortedAscending('pppoeUserName')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('pppoeUserName')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="pppoePassword">
                            <span @click="sortTable('pppoePassword')">
                                PPPoE Password
                                <span v-if="isSortedAscending('pppoePassword')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('pppoePassword')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="lastLoggedOut">
                            <span @click="sortTable('lastLoggedOut')">
                                last Logged Out
                                <span v-if="isSortedAscending('lastLoggedOut')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('lastLoggedOut')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="selectZone">
                            <span @click="sortTable('selectZone')">
                                Zone
                                <span v-if="isSortedAscending('selectZone')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('selectZone')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="selectSubZone">
                            <span @click="sortTable('selectSubZone')">
                                Sub Zone
                                <span v-if="isSortedAscending('selectSubZone')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('selectSubZone')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>
                        <th v-if="userMobile">
                            <span @click="sortTable('userMobile')">
                                Mobile
                                <span v-if="isSortedAscending('userMobile')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userMobile')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="userEmail">
                            <span @click="sortTable('userEmail')">
                                Email
                                <span v-if="isSortedAscending('userEmail')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userEmail')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="userAddress">
                            <span @click="sortTable('userAddress')">
                                Address
                                <span v-if="isSortedAscending('userAddress')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userAddress')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="userBillingType">
                            <span @click="sortTable('userBillingType')">
                                Monthly Bill
                                <span v-if="isSortedAscending('userBillingType')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userBillingType')" class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="userConnectionDate">
                            <span @click="sortTable('userConnectionDate')">
                                Connection Date
                                <span v-if="isSortedAscending('userConnectionDate')" class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userConnectionDate')"
                                    class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th v-if="userAutomaticConnectionOff">
                            <span @click="sortTable('userAutomaticConnectionOff')">
                                Automatic Connection Off
                                <span v-if="isSortedAscending('userAutomaticConnectionOff')"
                                    class="sort-icon inline-block ml-1">
                                    <SortedAscendingSvg />
                                </span>
                                <span v-else-if="isSortedDescending('userAutomaticConnectionOff')"
                                    class="sort-icon inline-block ml-1">
                                    <SortedDescendingSvg />
                                </span>
                            </span>
                        </th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows here -->
                    <template v-for="(row, index) in rowsData" :key="row.id" class="hover">
                        <tr class="hover">
                            <td>
                                <label>
                                    <input type="checkbox" class="top-0 bg-white checkbox checkbox-primary" :value="row.id"
                                        v-model="selectedRows" @click.stop />
                                </label>
                            </td>
                            <td v-if="id">{{ row.id }}</td>
                            <!-- <td v-if="status">{{ row.status || "-" }}</td> -->
                            <td v-if="row.status === 'online'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    style="fill:rgba(61, 255, 0);transform: ;msFilter:;">
                                    <path
                                        d="M12 6c3.537 0 6.837 1.353 9.293 3.809l1.414-1.414C19.874 5.561 16.071 4 12 4c-4.071.001-7.874 1.561-10.707 4.395l1.414 1.414C5.163 7.353 8.463 6 12 6zm5.671 8.307c-3.074-3.074-8.268-3.074-11.342 0l1.414 1.414c2.307-2.307 6.207-2.307 8.514 0l1.414-1.414z">
                                    </path>
                                    <path
                                        d="M20.437 11.293c-4.572-4.574-12.301-4.574-16.873 0l1.414 1.414c3.807-3.807 10.238-3.807 14.045 0l1.414-1.414z">
                                    </path>
                                    <circle cx="12" cy="18" r="2"></circle>
                                </svg>
                            </td>
                            <td v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    style="fill: rgba(255, 0, 0);transform: ;msFilter:;">
                                    <path
                                        d="m1.293 8.395 1.414 1.414c.504-.504 1.052-.95 1.622-1.359L2.9 7.021c-.56.422-1.104.87-1.607 1.374zM6.474 5.06 3.707 2.293 2.293 3.707l18 18 1.414-1.414-5.012-5.012.976-.975a7.86 7.86 0 0 0-4.099-2.148L11.294 9.88c2.789-.191 5.649.748 7.729 2.827l1.414-1.414c-2.898-2.899-7.061-3.936-10.888-3.158L8.024 6.61A13.366 13.366 0 0 1 12 6c3.537 0 6.837 1.353 9.293 3.809l1.414-1.414C19.874 5.561 16.071 4 12 4a15.198 15.198 0 0 0-5.526 1.06zm-2.911 6.233 1.414 1.414a9.563 9.563 0 0 1 2.058-1.551L5.576 9.697c-.717.451-1.395.979-2.013 1.596zm2.766 3.014 1.414 1.414c.692-.692 1.535-1.151 2.429-1.428l-1.557-1.557a7.76 7.76 0 0 0-2.286 1.571zm7.66 3.803-2.1-2.1a1.996 1.996 0 1 0 2.1 2.1z">
                                    </path>
                                </svg>
                            </td>
                            <td v-if="userName">{{ row.userName || "NA" }}</td>
                            <td v-if="mikrotikName">{{ row.mikrotikName || "-" }}</td>
                            <td v-if="selectPackage">{{ row.selectPackage || "-" }}</td>
                            <td v-if="pppoeUserName">{{ row.pppoeUserName || "-" }}</td>
                            <td v-if="pppoePassword">{{ row.pppoePassword || "-" }}</td>
                            <td v-if="lastLoggedOut">{{ row["last-logged-out"] || "-" }}</td>
                            <td v-if="selectZone">{{ row.selectZone || "-" }}</td>
                            <td v-if="selectSubZone">{{ row.selectSubZone || "-" }}</td>
                            <td v-if="userMobile">{{ row.userMobile || "-" }}</td>
                            <td v-if="userEmail">{{ row.userEmail || "-" }}</td>
                            <td v-if="userAddress">{{ row.userAddress || "-" }}</td>
                            <td v-if="userMonthlyBill">{{ row.userMonthlyBill || "-" }}</td>
                            <td v-if="userConnectionDate">
                                {{ row.userConnectionDate || "-" }}
                            </td>
                            <td v-if="userAutomaticConnectionOff">
                                {{ row.userAutomaticConnectionOff || "-" }}
                            </td>


                            <td class="px-6 py-1 text-center">
                                <div class="dropdown dropdown-left">
                                    <label tabindex="0" class="btn btn-sm btn-ghost btn-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            style="fill: rgb(20 184 166); transform: ; msfilter: ">
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

            <div class="sm:py-2 sm:px-5 mt-2 pr-2 mb-2 flex flex-row gap-5">
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
        </div>
    </Sidebar>
</template>
<script>
// import TableMixin from '../MixInFile/TableMixin'

// export default {
//     mixins: [TableMixin],

// };
import api from "../../../main";
import TablePagination from "../Template/TablePagination.vue";
import SearchComponent from "../Template//SearchComponent.vue";
import SortedAscendingSvg from "../Template//SortedAscendingSvg.vue";
import SortedDescendingSvg from "../Template//SortedDescendingSvg.vue";
import Sidebar from "../../Sidebar.vue";
import Navbar from "../../Navbar.vue";

export default {
    components: {
        Sidebar,
        Navbar,
        TablePagination,
        SearchComponent,
        SortedAscendingSvg,
        SortedDescendingSvg,
    },
    beforeMount() {
        this.selectedRows = [];
        document.addEventListener("click", this.hideContextMenuOnClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.hideContextMenuOnClickOutside);
    },
    data() {
        return {
            // columns: [
            //     { text: "id", dataKey: "id" },
            //     { text: "client Name", dataKey: "clientName" },
            //     { text: "pppoe User Name", dataKey: "pppoeUserName" },
            //     { text: "price", dataKey: "price" },
            //     { text: "address", dataKey: "address" },
            //     { text: "bandwidth", dataKey: "bandwidth" },
            //     { text: "mobile", dataKey: "mobile" },
            //     { text: "client Email", dataKey: "clientEmail" },
            //     { text: "activation date", dataKey: "activation_date" },
            //     { text: "clientType", dataKey: "clientType" },
            //     { text: "Action", dataKey: "action" },
            // ],

            id: true,
            mikrotikName: true,
            selectPackage: true,
            pppoeUserName: true,
            pppoePassword: true,
            rate: true,
            service: true,
            status: true,
            lastLoggedOut: true,
            selectZone: true,
            selectSubZone: true,
            userName: true,
            userMobile: true,
            userEmail: true,
            userHouse: true,
            userRoad: true,
            userAddress: true,
            userDistrict: true,
            userDivision: true,
            userThana: true,
            userNiDNumber: true,
            userCableType: true,
            userOnuMac: true,
            userRouterMacAddress: true,
            userRequireCable: true,
            usertypeOfConnectivity: true,
            userBillingType: true,
            userMonthlyBill: true,
            userConnectionDate: true,
            userBillingCycle: true,
            userReferenceName: true,
            userReferenceMobile: true,
            userBillingsMobile: true,
            userAutomaticConnectionOff: true,

            showContextMenu: false,
            contextMenuPosition: { x: 0, y: 0 },

            pageTitle: "Users",

            tableData: [],
            selectedRows: [],
            searchQuery: "",
            sortColumn: null,
            sortAscending: true,
            perPageOptions: [100, 250, 500],
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
                try {
                    const filteredRows = this.tableData.filter((row) => {
                        // const columnsToSearch = ["mikrotikName", "selectPackage", "pppoeUserName", "pppoePassword",];
                        const columnsToSearch = [
                            "id",
                            "status",
                            "mikrotikName",
                            "selectPackage",
                            "pppoeUserName",
                            "pppoePassword",
                            "last-logged-out",
                            "selectZone",
                            "selectSubZone",
                            "userName",
                            "userMobile",
                            "userEmail",
                            "userHouse",
                            "userRoad",
                            "userAddress",
                            "userRequireCable",
                            "usertypeOfConnectivity",
                            "userBillingType",
                            "userMonthlyBill",
                            "userConnectionDate",
                            "userAutomaticConnectionOff",
                        ];
                        return columnsToSearch.some((column) => {
                            const columnValue = row[column]?.toString().toLowerCase();
                            // console.log(`Checking column ${column}:`, columnValue);
                            return columnValue?.includes(query);
                        });
                    });
                    // console.log('Filtered rows:', filteredRows);
                    return filteredRows;
                } catch (error) {
                    console.error("Error filtering data:", error);
                    return [];
                }
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
                const response = await api.get("/pppoeUsers");
                this.tableData = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
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

                if (typeof valueA === "string" && typeof valueB === "string") {
                    return valueA.localeCompare(valueB) * (this.sortAscending ? 1 : -1);
                } else {
                    return (valueA - valueB) * (this.sortAscending ? 1 : -1);
                }
            });
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
                console.error("Error sending selected rows:", error);
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
            this.isHeaderCheckboxChecked = false;
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
                console.error("Error sending selected rows:", error);
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
