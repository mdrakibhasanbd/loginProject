export default {
  props: {
    filteredData: Array,
    currentPage: Number,
    itemsPerPage: Number,
  },
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
  },
  methods: {
    goToFirstPage() {
      if (this.currentPage !== 1) {
        this.$emit('page-change', 1);
      }
    },
    goToLastPage() {
      this.$emit('page-change', this.totalPages);
    },
    changePage(num) {
      const newPage = this.currentPage + num;
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.$emit('page-change', newPage);
      }
    },
  },
};