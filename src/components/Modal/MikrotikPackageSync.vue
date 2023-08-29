<template>
    <!-- <dialog :open="isOpen" class="modal"> -->
    <dialog :open="isOpen" class="modal" @click="closeModal">

        <div class=" modal-box ">

            <button @click.prevent="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div class="p-6 pt-0 text-center">
                <!-- <svg class="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg> -->


                <svg class="w-20 h-20 text-red-600 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" style="fill: rgb(41, 243, 0);transform: ;msFilter:;">
                    <path
                        d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z">
                    </path>
                </svg>
                <!-- <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this user?</h3> -->
                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to Packages sync?</h3>
                <div class="flex justify-center gap-3">
                    <a href="#"
                        class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center">
                        No, cancel
                    </a>
                    <a
                        class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                        <RouterLink :to="`/mikrotikPackagesSync/${mikrotikPackagesSyncData}`" exact>
                            Yes, Packages Sync
                        </RouterLink>
                    </a>
                </div>

            </div>

        </div>
    </dialog>
</template>

<script>


export default {
    props: {
        isOpen: Boolean,
        mikrotikPackagesSyncData: String,
        // mikrotikPackagesSyncData: Object 
    },
    data() {
        return {

        }
    },
    methods: {

        closeModal() {
            console.log("closModal");
            this.$emit('close');
        },

    },
    mounted() {
        console.log("mikrotikPackagesSyncData=", this.mikrotikPackagesSyncData);
    }
}

</script>
