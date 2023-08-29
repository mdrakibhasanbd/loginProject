<template>
    <dialog :open="isOpen" class="modal">
    <div class=" modal-box w-4/5  max-w-2xl">

        <form method="dialog" @submit.prevent="saveEditedDevice">

            <h3 class="font-bold text-lg">{{ editPackageData.package }} Rate Edit</h3>

            <button @click.prevent="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            <div>
                <div class="mb-4">
                    <div class="mt-4 grid gap-2 sm:grid-cols-2 ">
                        <div>
                            <h3 class="font-bold text-md mb-1">Profile Name *</h3>
                            <input v-model="editPackageData.Name" type="text" placeholder="Type here" required
                                class="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div>
                            <h3 class="font-bold text-md mb-1">Rate</h3>
                            <input v-model="editPackageData.rate"  type="text" placeholder="Type here" required
                                class="input input-bordered input-primary w-full max-w-xs" />
                        </div>

                    </div>

                </div>

                <div class="flex justify-end">
                    <button type="submit" class="px-4 py-2  bg-blue-500 text-white rounded ">Submit</button>
                </div>

            </div>
        </form>

        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </div>
    </dialog>
</template>

<script>
import { useNetworkDevicesStore } from '@/stores/mikrotik'; // Import your Pinia store

export default {
    props: {
        isOpen: Boolean,
        editPackageData: Object, // Accept the prop for prefilling the form

    },
    data() {
        return {
            // isModalOpen: false,
            // editedPackageId: null,
        }
    },

    computed: {
        // Reference the store and networkDevicesData directly
        networkDevicesStore() {
            return useNetworkDevicesStore();
        },

    },
    methods: {
        closeModal() {
            console.log("closeModal");
            this.$emit('close');
        },

        async saveEditedDevice() {
            try {
                const editedPackageId = this.editPackageData.editedPackageId;
                const routerId = this.editPackageData.routerId
                console.log(this.editPackageData);
                // Call the store's editDevice action to update the device
                await this.networkDevicesStore.mikrotikPackageEdit(editedPackageId,routerId, this.editPackageData);
                this.closeModal(); // Close the edit modal
            } catch (error) {
                console.error('Error editing device:', error);
            }
        },
    },
    mounted(){
        console.log(this.editPackageData);

    }


}

</script>
