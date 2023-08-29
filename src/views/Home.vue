<script setup>
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
// import Layout from '../components/Layout.vue'
import Sidebar from "@/components/Sidebar.vue";
const {isAuthenticated, user,role} = storeToRefs(useAuthStore())
</script>


<template >

  <Sidebar/>
</template>
