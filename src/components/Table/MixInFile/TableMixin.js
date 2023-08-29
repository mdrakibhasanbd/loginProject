import api from '../../../main';
import TablePagination from '../Template/TablePagination.vue';
import SearchComponent from '../Template//SearchComponent.vue';
import SortedAscendingSvg from '../Template//SortedAscendingSvg.vue'
import SortedDescendingSvg from '../Template//SortedDescendingSvg.vue'
import Temp from '../../Temp.vue'


export default {
    components: {
        TablePagination,
        SearchComponent,
        SortedAscendingSvg,
        SortedDescendingSvg,
        Temp,


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
            perPageOptions: [250, 500, 1000, 3000],
            isHeaderCheckboxChecked: false,
            currentPage: 1,
            itemsPerPage: 20,

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
