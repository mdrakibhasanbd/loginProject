<template>
    <!-- Your template code here -->

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
        <button class="join-item btn" @click="changePage(1)" :class="{ disabled: currentPage === totalPages }">»</button>
        <button class="join-item btn" @click="goToLastPage" :class="{ disabled: currentPage === totalPages }"><svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                <path d="M7.707 17.707 13.414 12 7.707 6.293 6.293 7.707 10.586 12l-4.293 4.293zM15 6h2v12h-2z">
                </path>
            </svg></button>
    </div>
</template>
  
<script>
import PaginationMixin from '../MixInFile/PaginationMixin'

export default {
    mixins: [PaginationMixin],

};
</script>
  