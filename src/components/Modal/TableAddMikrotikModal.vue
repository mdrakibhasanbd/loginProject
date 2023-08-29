<template>
    <dialog :open="isOpen" class="modal">
        <div class=" modal-box w-4/5  max-w-2xl">
            <form method="dialog" @submit.prevent="submitForm">
                <button @click.prevent="closeModal"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <div>
                    <div class="mb-4">
                        <div class="mt-4 grid gap-2 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-1">Mikrotik Name *</h3>
                                <input v-model="MikrotikFormData.mikrotikName" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-1">Mikrotik User Name *</h3>
                                <input v-model="MikrotikFormData.mikrotikUserName" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-1">Mikrotik Password *</h3>
                                <input v-model="MikrotikFormData.mikrotikPassword" type="password" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Mikrotik IP *</h3>
                                <input v-model="MikrotikFormData.mikrotikIp" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-1">Mikrotik Port *</h3>
                                <input v-model="MikrotikFormData.mikrotikPort" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                        </div>

                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2  bg-blue-500 text-white rounded ">Submit</button>
                    </div>

                </div>
            </form>

        </div>
    </dialog>
</template>

<script>
import { useNetworkDevicesStore } from '@/stores/mikrotik'; // Import your Pinia store

export default {
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            isModalOpen: false,
            MikrotikFormData: {

                mikrotikName: "",
                mikrotikUserName: "",
                mikrotikPassword: "",
                mikrotikIp: "",
                mikrotikPort: "",

            },

        }
    },
    methods: {
        resetForm() {
            this.MikrotikFormData = {}
        },

        closeModal() {

            console.log("closeModal");
            this.$emit('close');
            this.resetForm()
        },

        async submitForm() {
            try {
                const networkDevicesStore = useNetworkDevicesStore(); // Create an instance of the store
                await networkDevicesStore.addDevice(this.MikrotikFormData); // Call the store action
            } catch (error) {
                console.error('Error submitting form:', error);
            }
            this.closeModal();
        },
    },

}

</script>
