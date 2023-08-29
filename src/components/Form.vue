<template>
    <button @click="openAddUserModal">Open Modal</button>

    <!-- <dialog id="addUser" class="modal "> -->
    <dialog :open="isModalOpen" @close="closeAddUserModal" class="modal">

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
                <button :open="isModalOpen" @close="closeAddUserModal"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <div v-if="currentStep === 1">
                    <div class="mb-4">
                        <div class="mt-4 grid gap-4 sm:grid-cols-2">

                            <div>
                                <h3 class="font-bold text-md mb-1">Select Router</h3>
                                <select v-model="formData.selectRouter" class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>
                                <span v-if="errors.selectRouter" class="text-red-500">{{ errors.selectRouter }}</span>

                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-1">Select Package</h3>
                                <select v-model="formData.selectPackage" class="select select-primary w-full max-w-xs">
                                    <option>Package 1</option>
                                    <option>Package 2</option>
                                    <option>Package 3</option>
                                    <option>Package 4</option>
                                    <option>Package 5</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">PPPoE User Name</h3>
                                <input v-model="formData.pppoeUserName" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">PPPoE Passwrod</h3>
                                <input v-model="formData.pppoePassword" type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Zone</h3>
                                <select v-model="formData.selectZone" class="select select-primary w-full max-w-xs">
                                    <option>Zone 1</option>
                                    <option>Zone 2</option>
                                    <option>Zone 3</option>
                                    <option>Zone 4</option>
                                    <option>Zone 5</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Sub Zone</h3>
                                <select v-model="formData.selectSubZone" class="select select-primary w-full max-w-xs">
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
                        <button @click="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>

                    <!-- <div class="flex justify-end">
                        <button @click="nextStep" :disabled="formMeta && formMeta.invalid"
                            class="px-4 py-2 bg-blue-500 text-white rounded">
                            Next
                        </button>
                    </div> -->


                </div>

                <div v-else-if="currentStep === 2">
                    <div class="mb-4">
                        <div class="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-1">Name</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Mobile</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Email</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div class="flex">
                                <div class="mr-2">
                                    <h3 class="font-bold text-md mb-1"> House</h3>
                                    <input type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div>
                                    <h3 class="font-bold text-md mb-1">Road</h3>
                                    <input type="text" placeholder="Type here"
                                        class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Address</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-3">Select Division</h3>
                                <select class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-1">Select District</h3>
                                <select class="select select-primary w-full max-w-xs">
                                    <option disabled selected>....</option>
                                    <option>Mikrotik 1</option>
                                    <option>Mikrotik 2</option>
                                    <option>Mikrotik 3</option>
                                    <option>Mikrotik 4</option>
                                </select>
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-1">Select Thana</h3>
                                <select class="select select-primary w-full max-w-xs">
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
                        <button @click="prevStep" class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>


                </div>

                <div v-else-if="currentStep === 3">
                    <div class="mb-4">
                        <div class="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-2">

                            <div>
                                <h3 class="font-bold text-md mb-2">NiD Number</h3>
                                <input type="text" placeholder="Type here"
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
                        <button @click="prevStep" class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>
                </div>

                <div v-else-if="currentStep === 4">
                    <div class="mb-4">
                        <div class="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-2">Cable Type</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">MAC Address</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-2">ONU MAC</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-2">Require Cable</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Type of Connectivity</h3>
                                <select class="select select-primary w-full max-w-xs">
                                    <option>Shared</option>
                                    <option>Dedicated</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class=" flex justify-between">
                        <button @click="prevStep" class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Next</button>
                    </div>
                </div>

                <div v-else-if="currentStep === 5">
                    <div class="mb-4">
                        <div class="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-2">
                            <div>
                                <h3 class="font-bold text-md mb-2">Billing Type</h3>
                                <select class="select select-primary w-full max-w-xs">
                                    <option>Prepaid</option>
                                    <option>Postpaid</option>
                                </select>
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-2">Monthly Bill</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Connection Date</h3>
                                <input type="date" id="billing-date"
                                    class="input input-bordered input-primary w-full max-w-xs" />

                            </div>


                            <div>
                                <h3 class="font-bold text-md mb-2">Billing Cycle</h3>
                                <input type="datetime-local" id="billing-date"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>



                            <div>
                                <h3 class="font-bold text-md mb-2">Reference Name</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <div>
                                <h3 class="font-bold text-md mb-2">Reference Mobile</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <h3 class="font-bold text-md mb-2">Billings Mobile</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div>
                            <!-- <div>
                                <h3 class="font-bold text-md mb-2">Automatic Connection Off</h3>
                                <input type="text" placeholder="Type here"
                                    class="input input-bordered input-primary w-full max-w-xs" />
                            </div> -->


                            <div>
                                <div class="form-control ">
                                    <label class="label">
                                        <span class="font-bold">Automatic Connection Off</span>
                                        <input type="checkbox" class="toggle toggle-primary" checked />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" flex justify-between">
                        <button @click="prevStep" class="px-4 py-2  bg-gray-500 text-white rounded">Previous</button>
                        <button @click="nextStep" class="px-4 py-2  bg-blue-500 text-white rounded ">Submit</button>
                    </div>
                </div>
            </form>

        </div>

    </dialog>
</template>
  



<!-- <script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { reactive } from 'vue';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    data() {
        const schema = yup.object({
            selectRouter: yup.string().required('Please select a router'),
            // Other validation rules for other fields...
        });
        const formData = reactive({
            selectRouter: '',
            // Other form data properties...
        });

        const submitForm = async () => {
            try {
                await schema.validate(formData, { abortEarly: false });
                console.log('Form submitted with values:', formData);
                // Perform form submission logic
            } catch (error) {
                console.error('Validation error:', error);
            }
        };

        // const routerOptions = ['Mikrotik 1', 'Mikrotik 2', 'Mikrotik 3', 'Mikrotik 4'];


        return {
            currentStep: 1,
            isModalOpen: false,
            formData: {
                selectRouter: "",
                selectPackage: "",
                selectZone: "",
                selectSubZone: "",
                pppoeUserName: "",
                pppoePassword: "",

            },
            routerOptions: ['Mikrotik 1', 'Mikrotik 2', 'Mikrotik 3', 'Mikrotik 1'],


        };
    },

    computed: {
        currentSchema() {
            // Define your validation schema based on the current step
            switch (this.currentStep) {
                case 1:
                    return yup.object({
                        selectRouter: yup.string().required('Please select a router'),
                        // Other validation rules for Step 1...
                    });
                case 2:
                    return yup.object({
                        // Validation rules for Step 2...
                    });
                // Define other cases for different steps...
                default:
                    return yup.object({});
            }
        },
    },
    methods: {
        nextStep() {
            if (this.currentStep < 5) {
                this.currentStep++;
            }
        },


        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        submitForm() {
            this.schema
                .validate(this.formData, { abortEarly: false })
                .then((values) => {
                    console.log('Form submitted with values:', values);
                    // Perform form submission logic
                })
                .catch((error) => {
                    console.error('Validation error:', error);
                });
        },
        // submitForm() {
        //     // Handle form submission, e.g., send data to the server
        //     console.log(this.formData);
        //     // After form submission, close the modal
        //     this.closeAddUserModal();
        // },

        resetForm() {
            this.formData = {
                selectRouter: '',
                selectPackage: '',
                // ... Reset other form fields ...
            }
        },
        openAddUserModal() {
            this.isModalOpen = true;
        },
        closeAddUserModal() {

            console.log("closeAddUserModal");
            this.isModalOpen = false;
            this.resetForm()
            this.currentStep = 1;
        }
    },
};
</script> -->
<script>
export default {
    data() {
        return {
            currentStep: 1,
            isModalOpen: false,
            formErrors: {}, // To store form validation errors
            errors: "",
            formData: {
                selectRouter: "",
                selectPackage: "",
                selectZone: "",
                selectSubZone: "",
                pppoeUserName: "",
                pppoePassword: "",

            },
        };
    },

    methods: {
        // nextStep() {
        //     if (this.currentStep < 5) {
        //         this.currentStep++;
        //     }
        // },

        validateStep() {
            this.errors = {}; // Reset errors for the current step

            if (this.currentStep === 1) {
                if (!this.formData.selectRouter) {
                    this.errors.selectRouter = 'Field 1 is required.';
                }
                // You can add more validation checks for this step
            } else if (this.currentStep === 2) {
                if (!this.formData.field2) {
                    this.errors.field2 = 'Field 2 is required.';
                }
                // You can add more validation checks for this step
            }
            // Repeat for other steps

            // Check if there are any errors for the current step
            return Object.keys(this.errors).length === 0;
        },
        // nextStep() {
        //     if (this.validateStep()) {
        //         this.currentStep++;
        //     }
        // },

        nextStep() {
            if (this.validateStep() && this.currentStep < 5) {
                this.currentStep++;
            }
        },
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },
        submitForm() {
            // Handle form submission, e.g., send data to the server
            console.log(this.formData);
            // After form submission, close the modal
            this.closeAddUserModal();
        },

        resetForm() {
            this.formData = {
                selectRouter: '',
                selectPackage: '',
                // ... Reset other form fields ...
            }
        },
        openAddUserModal() {
            this.isModalOpen = true;
        },
        closeAddUserModal() {

            console.log("closeAddUserModal");
            this.isModalOpen = false;
            this.resetForm()
            this.currentStep = 1;
        }
    },
};
</script>
  


