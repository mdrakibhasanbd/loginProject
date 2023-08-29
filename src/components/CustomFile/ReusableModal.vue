<template>
    <div class="" v-if="isOpen">
        <dialog>
      <div class="modal-content">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
              <!-- if there is a button in form, it will close the modal -->
              <button @click="closeModal" class="btn">Close</button>
            </div>
          </form>
        <!-- <slot></slot> -->
      </div>
    </dialog>
    </div>
  </template>
  
  <script>
  export default {
    // name: 'ReusableModal',
    props: {
      isOpen: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  

  