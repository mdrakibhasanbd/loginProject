import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import { useAuthStore } from "@/stores/auth";
const app = createApp(App)
const api = axios.create({
    // baseURL: 'http://192.168.10.10:5005', // Replace with your base URL
    baseURL: 'http://192.168.100.2:5006' // Replace with your base URL
  })
  
  export default api

app.use(createPinia())
app.use(router)

const access_token = JSON.parse(localStorage.getItem('access_token'));
const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
const authStore = useAuthStore();

// Set the access_token in the store if it exists
if (access_token && authStore.isAuthenticated) {
  // console.log('entry token');
  authStore.setToken(access_token,refresh_token);
}



app.mount('#app')
