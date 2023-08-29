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
                    <!-- <select v-model="selectedPackage"
                        class="w-full rounded-md border-transparent bg-gray-100 px-4 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0"> -->

                    <select v-model="selectedPackage" class="select select-bordered w-full max-w-xs">

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



                    <select v-model="statusFilter" class="select select-bordered w-full max-w-xs">
                        <option value="">All Status</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <button @click="resetFilters"
                        class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                        Reset Filter
                    </button>
                </div>
            </div>

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
                        <span class="label-text px-2 hover">Package</span>
                        <input type="checkbox" class="toggle toggle-xs toggle-primary" checked v-model="selectPackage" />
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

            <MikrotikClientsDrawer :rowData="selectedRows" :itemsPerPage="itemsPerPage" :onlineRowCount="onlineRowCount"
                :offlineRowCount="offlineRowCount" @send-selected-rows="sendSelectedRowsDrawer">




                <table class="table rounded-2xl">
                    <thead class="table-fixed">
                        <tr class="uppercase bg-gray-300 context-row" @contextmenu.prevent="showContextMenuAt($event, -1)">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox checkbox-primary"
                                        v-model="isHeaderCheckboxChecked" @click="selectAllRows" />
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
                                    <span v-else-if="isSortedDescending('mikrotikName')"
                                        class="sort-icon inline-block ml-1">
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
                                    <span v-else-if="isSortedDescending('selectPackage')"
                                        class="sort-icon inline-block ml-1">
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
                                    <span v-else-if="isSortedDescending('pppoeUserName')"
                                        class="sort-icon inline-block ml-1">
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
                                    <span v-else-if="isSortedDescending('pppoePassword')"
                                        class="sort-icon inline-block ml-1">
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
                                    <span v-else-if="isSortedDescending('lastLoggedOut')"
                                        class="sort-icon inline-block ml-1">
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
                                    <span v-else-if="isSortedDescending('selectSubZone')"
                                        class="sort-icon inline-block ml-1">
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
                                    <span v-else-if="isSortedDescending('userBillingType')"
                                        class="sort-icon inline-block ml-1">
                                        <SortedDescendingSvg />
                                    </span>
                                </span>
                            </th>

                            <th v-if="userConnectionDate">
                                <span @click="sortTable('userConnectionDate')">
                                    Connection Date
                                    <span v-if="isSortedAscending('userConnectionDate')"
                                        class="sort-icon inline-block ml-1">
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
                        <!-- <template v-for="(row, index) in rowsData" :key="row.id" class="hover">
                            <tr class="hover">
                                <td>
                                    <label>
                                        <input type="checkbox" class="top-0 bg-white checkbox checkbox-primary"
                                            :value="row.id" v-model="selectedRows" @click.stop />
                                    </label>
                                </td> -->

                        <template v-for="(row, index) in rowsData" :key="row._id" class="hover">
                            <tr class="hover">
                                <td>
                                    <label>
                                        <input type="checkbox" class="top-0 bg-white checkbox checkbox-primary"
                                            :value="row._id" v-model="selectedRows" @click.stop />
                                    </label>
                                </td>
                                <td v-if="id">{{ row.id }}</td>
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
                                <td v-if="userName">{{ row.userName || "-" }}</td>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" style="fill: rgb(20 184 166); transform: ; msfilter: ">
                                                <path
                                                    d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                                                </path>
                                            </svg>
                                        </label>
                                        <ul tabindex="0"
                                            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li @click="openEditModal(row._id)"><a>Edit</a></li>
                                            <!-- <button class="btn btn-primary" @click="openEditModal(row)"></button> -->

                                            <li>
                                                <!-- Use a button within an anchor tag for the "Remove" action -->
                                                <a href="#" @click="openRemoveModal(row)" class="text-red-600">Remove</a>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <div class="my-1 flex flex-row gap-1 mx-2">
                    <div class="flex-1 justify-start items-center space-x-2 text-gray-600 mt-8 ">
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
            </MikrotikClientsDrawer>
        </TableBodyLayout>
        <RemoveModal :isOpen="isRemoveModalOpen" :closeModal="closeModal" :removePPPoEuser="removePPPoEuser"
            :removeUserId="removeUserId" :pppoeUserName="pppoeUserNameRemove" />
        <MikrotikClientEdit :is-open="isEditModalOpen" @close="closeModal" :editedFormData="editedFormData" />
        <!-- </div> -->
    </Sidebar>
</template>

<script>
import { useDrawerStore } from "../stores/drawer";
import { useFilterStore } from "../stores/filter";
import { useNetworkDevicesStore } from "@/stores/mikrotik";
import Sidebar from "./Sidebar.vue";
import TableBodyLayout from "./TableBodyLayout.vue";
import SearchComponent from "./Table/Template/SearchComponent.vue";
import MikrotikClientsDrawer from "./MikrotikClientsDrawer.vue";
import Navbar from "./Navbar.vue";
import TablePagination from "../components/Table/Template/TablePagination.vue";
import SortedAscendingSvg from "./Table/Template/SortedAscendingSvg.vue";
import SortedDescendingSvg from "./Table/Template/SortedDescendingSvg.vue";
import MikrotikClientEdit from "./Modal/MikrotikClient/MikrotikClientEdit.vue";
import RemoveModal from "./Modal/RemoveModal.vue"
export default {
    components: {
        Sidebar,
        Navbar,
        TableBodyLayout,
        SearchComponent,
        MikrotikClientsDrawer,
        // Filter,
        SortedAscendingSvg,
        SortedDescendingSvg,
        TablePagination,
        MikrotikClientEdit,
        RemoveModal,
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

            pageTitle: "Users",
            _id: false,

            id: true,
            mikrotikName: false,
            selectPackage: false,
            pppoeUserName: true,
            pppoePassword: true,
            rate: true,
            service: true,
            status: true,
            lastLoggedOut: false,
            selectZone: true,
            selectSubZone: true,
            userName: true,
            userMobile: true,
            userEmail: false,
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
            userReferenceMobile: false,
            userBillingsMobile: false,
            userAutomaticConnectionOff: false,

            selectedRows: [], // Selected rows data
            searchQuery: "",
            currentPage: 1,
            itemsPerPage: 50,
            perPageOptions: [100, 250, 500,],

            onlineRowCount: 0,
            offlineRowCount: 0,

            showContextMenu: false,
            contextMenuPosition: { x: 0, y: 0 },


            sortColumn: null,
            sortAscending: true,

            routerId: this.$route.params._id, // Initialize routerId with the value from route parameters
            isHeaderCheckboxChecked: false,

            selectedPackage: "all", // Default value for package filter
            statusFilter: "", // Default value for status filter
            showFilters: false, // Controls the visibility of the filter div

            editedDeviceId: "",

            editedFormData: {
                //Step 1
                selectRouter: "",
                selectPackage: "",
                pppoeUserName: "",
                pppoePassword: "",
                selectZone: "",
                selectSubZone: "",
                //Step 2
                userName: "",
                userMobile: "",
                userEmail: "",
                userHouse: "",
                userRoad: "",
                userAddress: "",
                userDistrict: "",
                userDivision: "",
                userThana: "",
                //Step 3
                userNiDNumber: "",
                //Step 4
                userCableType: "",
                userOnuMac: "",
                userRouterMacAddress: "",
                userRequireCable: "",
                usertypeOfConnectivity: "",

                //Step 5
                userBillingType: "",
                userMonthlyBill: "",
                userConnectionDate: "",
                userBillingCycle: "",
                userReferenceName: "",
                userReferenceMobile: "",
                userBillingsMobile: "",
                userAutomaticConnectionOff: "",

            },

            isRemoveModalOpen: false,
            isEditModalOpen: false,
            pppoeUserNameRemove: "",
            removeUserId: "",
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
            let onlineCount = 0;
            let offlineCount = 0;

            const filteredRows = this.networkDevicesStore.usersData.filter((row) => {
                const columnsToSearch = ["id", "status", "mikrotikName", "selectPackage", "pppoeUserName", "pppoePassword", "last-logged-out",
                    "selectZone", "selectSubZone", "userName", "userMobile", "userEmail", "userHouse", "userRoad", "userAddress", "userRequireCable",
                    "usertypeOfConnectivity", "userBillingType", "userMonthlyBill", "userConnectionDate", "userAutomaticConnectionOff",
                ];
                const matchesQuery = columnsToSearch.some((column) => {
                    const columnValue = row[column]?.toString().toLowerCase();
                    return columnValue?.includes(query);
                });

                const matchesPackage =
                    this.selectedPackage === "all" ||
                    row.selectPackage === this.selectedPackage;
                const matchesStatus =
                    !this.statusFilter || row.status === this.statusFilter;

                if (matchesQuery && matchesPackage && matchesStatus) {
                    if (row.status === 'online') {
                        onlineCount++;
                    } else if (row.status === 'offline') {
                        offlineCount++;
                    }
                    return true; // Include the row in filtered data
                }

                return false; // Exclude the row from filtered data
            });

            // Assign the counts to data properties for use in the template
            this.onlineRowCount = onlineCount;
            this.offlineRowCount = offlineCount;

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
        // async sendSelectedRows() {
        //     try {

        //         console.log(this.selectedRows);
        //         const dataToSend = this.selectedRows.map((rowId) => {
        //             const row = this.networkDevicesStore.usersData.find(
        //                 (item) => item._id === rowId
        //             );
        //             return {
        //                 id: row._id,
        //             };
        //         });

        //         const idsOnly = dataToSend.map((item) => item._id);
        //         console.log(idsOnly);
        //         this.selectedRows = [];
        //         this.isHeaderCheckboxChecked = false;
        //     } catch (error) {
        //         console.error("Error sending selected rows:", error);
        //     }
        // },

        async sendSelectedRows() {

            console.log(this.selectedRows);
            this.isHeaderCheckboxChecked = false
            this.selectedRows = [];
            // this.removePPPoEuser(this.selectedRows);
            // this.selectedRows = [];
            // this.mounted
        },


        sendSelectedRowsDrawer() {
            console.log("Call Drawer");
            this.sendSelectedRows(); // Call the existing sendSelectedRows method
        },

        async fetchUsersData() {
            try {
                await this.networkDevicesStore.fetchUsersData();
                console.log("Users data fetched successfully!");
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        },

        // openEditModal() {
        //     this.isEditModalOpen = true;
        // },

        openRemoveModal(row) {
            console.log(row._id);
            this.removeUserId = row._id;
            this.pppoeUserNameRemove = row.pppoeUserName
            this.isRemoveModalOpen = true;
        },
        closeModal() {
            console.log("Modal clicked");
            this.isRemoveModalOpen = false;
            this.isEditModalOpen = false;
            // this.isMikrotikPackagesSyncOpen = false;
            // this.isMikrotikClientsSyncOpen = false;
        },

        async openEditModal(deviceId) {
            // Handle the edit action here or perform any necessary actions
            console.log("Edit device with ID:", deviceId._id);
            console.log(this.networkDevicesStore.usersData);
            // Find the device data based on the deviceId
            const device = this.networkDevicesStore.usersData.find(
                (device) => device._id === deviceId
            );
            console.log(device);
            if (device) {
                this.editedFormData = {
                    //Step 1
                    selectRouter: device.selectRouter,
                    selectPackage: device.selectPackage,
                    pppoeUserName: device.pppoeUserName,
                    pppoePassword: device.pppoePassword,
                    selectZone: device.selectZone,
                    selectSubZone: device.selectSubZone,
                    //Step 2
                    userName: device.userName,
                    userMobile: device.userMobile,
                    userEmail: device.userEmail,
                    userHouse: device.userHouse,
                    userRoad: device.userRoad,
                    userAddress: device.userAddress,
                    userDistrict: device.userDistrict,
                    userDivision: device.userDivision,
                    userThana: device.userThana,
                    //Step 3
                    userNiDNumber: device.userNiDNumber,
                    //Step 4
                    userCableType: device.userCableType,
                    userOnuMac: device.userOnuMac,
                    userRouterMacAddress: device.userRouterMacAddress,
                    userRequireCable: device.userRequireCable,
                    usertypeOfConnectivity: device.usertypeOfConnectivity,

                    //Step 5
                    userBillingType: device.userBillingType,
                    userMonthlyBill: device.userMonthlyBill,
                    userConnectionDate: device.userConnectionDate,
                    userBillingCycle: device.userBillingCycle,
                    userReferenceName: device.userReferenceName,
                    userReferenceMobile: device.userReferenceMobile,
                    userBillingsMobile: device.userBillingsMobile,
                    userAutomaticConnectionOff: device.userAutomaticConnectionOff,
                };
                // Set the editedDeviceId property
                this.editedDeviceId = deviceId;
                // Open the modal
                this.isEditModalOpen = true;
            }
        },

        async removePPPoEuser(deviceId) {
            try {
                console.log(deviceId);
                await this.networkDevicesStore.removePPPoEuser(deviceId); // Call the store action
            } catch (error) {
                console.error("Error removing user:", error);
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
                ? [...this.selectedRows, ...this.rowsData.map((row) => row._id)]
                : this.selectedRows.filter(
                    (rowId) => !this.rowsData.some((row) => row._id === rowId)
                );

            this.isHeaderCheckboxChecked =
                this.selectedRows.length === this.rowsData.length &&
                this.selectedRows.every((rowId) =>
                    this.rowsData.some((row) => row._id === rowId)
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

        resetFilters() {
            console.log("call reset");
            this.selectedPackage = "all";
            this.statusFilter = "";
        },
    },
    async mounted() {
        await this.fetchUsersData();
        // console.log(this.networkDevicesStore.usersData);
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
