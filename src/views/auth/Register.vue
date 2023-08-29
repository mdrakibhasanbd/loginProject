<script setup>
import Layout from '../../components/AuthLayout.vue'
</script>

<template>

  <Layout>
    <form @submit.prevent>
      <h1 class="text-gray-900 text-2xl font-medium text-center mb-10">Register</h1>
      <div class="mb-3">
        <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
        <input  type="text" id="name" name="name"
               class="w-full border border-gray-300 rounded text-gray-700 py-1 px-3 leading-8 ease-in-out outline-none focus:border-indigo-300">
        <p  class="text-red-500 text-sm mt-1"></p>
      </div>
      <div class="mb-3">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email"
               class="w-full border border-gray-300 rounded text-gray-700 py-1 px-3 leading-8 ease-in-out outline-none focus:border-indigo-300">
        <p class="text-red-500 text-sm mt-1"></p>
      </div>
      <div class="mb-3">
        <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
        <input  type="password" id="password" name="password"
               class="w-full border border-gray-300 rounded text-gray-700 py-1 px-3 leading-8 ease-in-out outline-none focus:border-indigo-300">
        <p  class="text-red-500 text-sm mt-1"></p>
      </div>
      <div class="pt-3">
        <button type="submit"
                class="text-white bg-indigo-500 border-0 py-2 px-6 rounded text-lg w-full hover:bg-indigo-600">Register
        </button>
      </div>
    </form>
  </Layout>
  </template>