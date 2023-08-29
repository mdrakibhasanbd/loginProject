<template>
    <!-- <div class="mt-20 bg-red-500 max-w-lg w-full mx-auto p-6 rounded shadow">

        <slot></slot>
    </div> -->

    <div class="flex min-h-screen flex-col bg-gray-100">
        <router-view class="my-6 flex w-full flex-1 flex-col p-3" />
        <slot></slot>
        <!-- <Footer /> -->
      </div>
</template>

