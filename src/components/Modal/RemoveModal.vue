<!-- <template>
    <dialog :open="isOpen" class="modal" @click="closeModal">

        <div class=" modal-box ">

            <button @click.prevent="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div class="p-6 pt-0 text-center">

                <svg class="w-20 h-20 text-red-600 mx-auto"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    style="fill: rgb(41, 243, 0);transform: ;msFilter:;">
                    <path
                        d="M8 12.052c1.995 0 3.5-1.505 3.5-3.5s-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5 1.505 3.5 3.5 3.5zM9 13H7c-2.757 0-5 2.243-5 5v1h12v-1c0-2.757-2.243-5-5-5zm11.294-4.708-4.3 4.292-1.292-1.292-1.414 1.414 2.706 2.704 5.712-5.702z">
                    </path>
                </svg>
                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to clients sync?</h3>
                <div class="flex justify-center gap-3">
                    <a href="#"
                        class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center">
                        No, cancel
                    </a>
                    <span
                        class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                        <RouterLink :to="`/mikrotikClientsSync/${mikrotikClientsSyncData}`" exact>
                            Yes, Clients Sync
                        </RouterLink>
                    </span>
                </div>

            </div>

        </div>
    </dialog>
</template>

<script>


export default {
    props: {
        isOpen: Boolean,
        mikrotikClientsSyncData: String,
        // mikrotikClientsSyncData: Object 
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
        console.log("mikrotikClientsSyncData=", this.mikrotikClientsSyncData);
    }
}

</script> -->


<template>
    <dialog :open="isOpen" class="modal" >
        <div class="modal-box">
            <button @click.prevent="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div class="p-6 pt-0 text-center">
                <svg class="w-20 h-20 text-red-600 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" style="fill: rgba(255, 0, 0);transform: ;msFilter:;">

                    <path
                        d="M8 12.052c1.995 0 3.5-1.505 3.5-3.5s-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5 1.505 3.5 3.5 3.5zM9 13H7c-2.757 0-5 2.243-5 5v1h12v-1c0-2.757-2.243-5-5-5zm11.293-4.707L18 10.586l-2.293-2.293-1.414 1.414 2.292 2.292-2.293 2.293 1.414 1.414 2.293-2.293 2.294 2.294 1.414-1.414L19.414 12l2.293-2.293z">
                    </path>
                </svg>


                <h3 class="text-xl font-normal text-red-500 mt-5 mb-6">PPPoE User Name : {{ pppoeUserName }}</h3>
                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to remove this user?</h3>
                <div class="flex justify-center gap-3">
                    <a href="#" @click.prevent="closeModal"
                        class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center">
                        No, cancel
                    </a>
                    <span
                        class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                        <a href="#" @click="confirmRemove">Yes, Remove</a>
                    </span>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    props: {
        isOpen: Boolean, // Pass isOpen as a prop
        closeModal: Function, // Pass closeModal as a prop
        removePPPoEuser: Function, // Define a function to perform the remove action
        removeUserId: String,
        pppoeUserName: String
    },
    methods: {
        confirmRemove() {
            console.log(this.removeUserId);
            this.removePPPoEuser(this.removeUserId); // Call the method with the selected row's _id
            this.closeModal(); // Close the modal after performing the action
        }
    }
};
</script>
