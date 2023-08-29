<template>
    <dialog :open="isOpen" class="modal">

        <div class=" modal-box w-4/5  max-w-2xl">
            <form method="dialog" @submit.prevent="submitForm">
                <div class="flex justify-center items-center ">
                    <ul class="steps w-full max-w-screen-xl">
                        <li
                            :class="`step ${currentStep === 1 ? 'step-primary' : ''} ${currentStep > 1 ? 'step-primary' : ''}`">
                            Router Info</li>
                        <li
                            :class="`step ${currentStep === 2 ? 'step-primary' : ''} ${currentStep > 2 ? 'step-primary' : ''}`">
                            Client Info</li>
                        <li
                            :class="`step ${currentStep === 3 ? 'step-primary' : ''} ${currentStep > 3 ? 'step-primary' : ''}`">
                            NiD Info</li>
                        <li
                            :class="`step ${currentStep === 4 ? 'step-primary' : ''} ${currentStep > 4 ? 'step-primary' : ''}`">
                            Inventory</li>
                        <li :class="`step ${currentStep === 5 ? 'step-primary' : ''}`">
                            Billing Info</li>
                    </ul>
                </div>
                <button @click.prevent="closeModal"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <div v-if="currentStep === 1">
                    <div class="mb-4">
                        <div class="mt-4 grid gap-2 sm:grid-cols-2">

                            <div>
                                <h3 class="font-bold text-md mb-1">Select Router *</h3>
                                <select v-model="editedFormData.selectRouter" class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>
                                <span v-if="errors.selectRouter" class="text-red-500">{{ errors.selectRouter }}</span>

                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-1">Select Package *</h3>
                                <select v-model="editedFormData.selectPackage" class="select select-primary w-full max-w-xs">
                                    <option>Package 1</option>
                                    <option>Package 2</option>
                                    <option>Package 3</option>
                                    <option>Package 4</option>
                                    <option>Package 5</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">PPPoE User Name *</h3>
                                <input v-model="editedFormData.pppoeUserName" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">PPPoE Passwrod *</h3>
                                <input v-model="editedFormData.pppoePassword" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Zone *</h3>
                                <select v-model="editedFormData.selectZone" class="select select-primary w-full max-w-xs">
                                    <option>Zone 1</option>
                                    <option>Zone 2</option>
                                    <option>Zone 3</option>
                                    <option>Zone 4</option>
                                    <option>Zone 5</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Sub Zone</h3>
                                <select v-model="editedFormData.selectSubZone" class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Sub Zone 1</option>
                                    <option>Sub Zone 2</option>
                                    <option>Sub Zone 3</option>
                                    <option>Sub Zone 4</option>
                                    <option>Sub Zone 5</option>
                                </select>
                            </div>

                        </div>

                    </div>

                    <div class="flex justify-end">
                        <button @click.prevent="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>

                </div>

                <div v-else-if="currentStep === 2">
                    <div class="mb-4">
                        <div class="mt-4 grid gap-2 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-1">Name *</h3>
                                <input v-model="editedFormData.userName" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                                <span v-if="errors.userName" class="text-red-500">{{ errors.userName }}</span>

                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Mobile *</h3>
                                <input v-model="editedFormData.userMobile" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Email</h3>
                                <input v-model="editedFormData.userEmail" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div class="flex">
                                <div class="mr-2">
                                    <h3 class="font-bold text-md mb-1"> House *</h3>
                                    <input v-model="editedFormData.userHouse" type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div>
                                    <h3 class="font-bold text-md mb-1">Road *</h3>
                                    <input v-model="editedFormData.userRoad" type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Address *</h3>
                                <input v-model="editedFormData.userAddress" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-1">Select Division *</h3>
                                <select v-model="editedFormData.userDivision" class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Select District *</h3>
                                <select v-model="editedFormData.userDistrict" class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-1">Select Thana *</h3>
                                <select v-model="editedFormData.userThana" class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>

                            </div>



                        </div>
                    </div>

                    <div class="flex justify-between">
                        <button @click.prevent="prevStep"
                            class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click.prevent="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>


                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mb-4">
                        <div class="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-2">

                            <div>
                                <h3 class="font-bold text-md mb-2">NiD Number</h3>
                                <input v-model="editedFormData.userNiDNumber" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Front Side</h3>
                                <input type="file" class="file-input file-input-bordered file-input-md w-full max-w-xs" />

                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Back Side</h3>
                                <input type="file" class="file-input file-input-bordered file-input-md w-full max-w-xs" />

                            </div>

                        </div>
                    </div>
                    <div class=" flex justify-between">
                        <button @click.prevent="prevStep"
                            class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click.prevent="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>
                </div>

                <div v-else-if="currentStep === 4">
                    <div class="mb-4">
                        <div class="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-2">Cable Type *</h3>
                                <select v-model="editedFormData.userCableType" class="select select-primary w-full max-w-xs">
                                    <option>UTP</option>
                                    <option>Fiber</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">MAC Address</h3>
                                <input v-model="editedFormData.userRouterMacAddress" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div v-if="editedFormData.userCableType === 'Fiber'">
                                <h3 class="font-bold text-md mb-2">ONU MAC</h3>
                                <input v-model="editedFormData.userOnuMac" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>


                            <div v-if="editedFormData.userCableType === 'Fiber'" class="flex">
                                <div class="mr-2">
                                    <h3 class="font-bold text-md mb-1">TJ BOX</h3>
                                    <input v-model="editedFormData.userHouse" type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div>
                                    <h3 class="font-bold text-md mb-1">Patch Cord </h3>
                                    <input v-model="editedFormData.userRoad" type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Require Cable</h3>
                                <input v-model="editedFormData.userRequireCable" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Type of Connectivity *</h3>
                                <select v-model="editedFormData.usertypeOfConnectivity"
                                    class="select select-primary w-full max-w-xs">
                                    <option>Shared</option>
                                    <option>Dedicated</option>
                                </select>
                            </div>
                        </div>
                    </div>



                    <div class=" flex justify-between">
                        <button @click.prevent="prevStep"
                            class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click.prevent="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>
                </div>

                <div v-else-if="currentStep === 5">
                    <div class="mb-4">
                        <div class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-1">Billing Type *</h3>
                                <select v-model="editedFormData.userBillingType"
                                    class="select select-primary w-full max-w-xs">
                                    <option>Prepaid</option>
                                    <option>Postpaid</option>
                                </select>
                            </div>

                            <div class="flex">
                                <div class="mr-2">
                                    <h3 class="font-bold text-md mb-1">Bill *</h3>
                                    <input v-model="editedFormData.userMonthlyBill" type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div>
                                    <h3 class="font-bold text-md mb-1">Discount </h3>
                                    <input v-model="editedFormData.userRoad" type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>




                            <div>
                                <h3 class="font-bold text-md mb-1">Connection Date</h3>
                                <input v-model="editedFormData.userConnectionDate" type="date" id="billing-date"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-1">Billing Cycle</h3>
                                <input v-model="editedFormData.userBillingCycle" type="datetime-local" id="billing-date"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>



                            <div>
                                <h3 class="font-bold text-md mb-1">Reference Name</h3>
                                <input v-model="editedFormData.userReferenceName" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-1">Reference Mobile</h3>
                                <input v-model="editedFormData.userReferenceMobile" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Billings Mobile</h3>
                                <input v-model="editedFormData.userBillingsMobile" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <div class="form-control ">
                                    <label class="label">
                                        <span class="font-bold">Automatic Connection Off</span>
                                        <input v-model="editedFormData.userAutomaticConnectionOff" type="checkbox"
                                            class="toggle toggle-primary" checked />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" flex justify-between">
                        <button @click.prevent="prevStep"
                            class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button type="submit" class="px-4 py-2  bg-blue-500 text-white rounded ">Submit</button>
                    </div>
                </div>
            </form>

        </div>

    </dialog>
</template>

<script>
import { useNetworkDevicesStore } from "@/stores/mikrotik";

export default {

    props: {
        isOpen: Boolean,
        editedFormData: Object,
        // closeModal: Function,
    },
    data() {
        return {
            currentStep: 1,
            isModalOpen: false,
            errors: "",
            // editedFormData: {
            //     //Step 1
            //     selectRouter: "",
            //     selectPackage: "",
            //     pppoeUserName: "",
            //     pppoePassword: "",
            //     selectZone: "",
            //     selectSubZone: "",
            //     //Step 2
            //     userName: "",
            //     userMobile: "",
            //     userEmail: "",
            //     userHouse: "",
            //     userRoad: "",
            //     userAddress: "",
            //     userDistrict: "",
            //     userDivision: "",
            //     userThana: "",
            //     //Step 3
            //     userNiDNumber: "",
            //     //Step 4
            //     userCableType: "",
            //     userOnuMac: "",
            //     userRouterMacAddress: "",
            //     userRequireCable: "",
            //     usertypeOfConnectivity: "",

            //     //Step 5
            //     userBillingType: "",
            //     userMonthlyBill: "",
            //     userConnectionDate: "",
            //     userBillingCycle: "",
            //     userReferenceName: "",
            //     userReferenceMobile: "",
            //     userBillingsMobile: "",
            //     userAutomaticConnectionOff: "",

            // },
        };
    },

    computed: {
        // Reference the store and networkDevicesData directly
        networkDevicesStore() {
            return useNetworkDevicesStore();
        },
    },
    methods: {
        validateStep() {
            this.errors = {}; // Reset errors for the current step

            if (this.currentStep === 1) {
                if (!this.editedFormData.selectRouter) {
                    this.errors.selectRouter = 'Select Router is required.';
                }
                // You can add more validation checks for this step
            } else if (this.currentStep === 2) {
                if (!this.editedFormData.userName) {
                    this.errors.userName = 'UserName is required.';
                }
                // You can add more validation checks for this step
            } else if (this.currentStep === 5) {
                if (!this.editedFormData.userNiDNumber) {
                    this.errors.userNiDNumber = 'Field 2 is required.';
                }
                // You can add more validation checks for this step
            }
            // Repeat for other steps

            // Check if there are any errors for the current step
            return Object.keys(this.errors).length === 0;
        },

        closeModal() {

            console.log("closeModal");
            this.$emit('close');
            // this.isModalOpen = false;
            this.resetForm()
            this.currentStep = 1;
        },

        nextStep() {
            console.log(this.currentStep);
            if (this.validateStep()) {
                if (this.currentStep < 5) {
                    this.currentStep++;
                } else {
                    console.log("else Call");
                    // If it's the last step, submit the form and close the modal
                    this.submitFormAndClose();
                }
            }
        },


        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },
        resetForm() {
            this.errors = {}
            // this.editedFormData = {
            //     selectRouter: "",
            //     selectPackage: "",
            //     // ... Reset other form fields ...
            // }
        },

    },
    mounted(){
        console.log(this.editedFormData);
    }

}
</script>

