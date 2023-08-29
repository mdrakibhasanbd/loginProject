<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="normal-case text-xl font-bold text-teal-400">{{ pageTitle }}</a>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>

            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div class="card-body">
            <span class="font-bold text-lg">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="../assets/image/user.jpg" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
            <router-link @click.native="logout" to="/login">
              <span>Logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Update the path to your Auth store

export default defineComponent({

	methods: {
		logout() {
			const authStore = useAuthStore(); // Create an instance of the auth store
			authStore.logout(); // Call the logout method on the auth store instance
		},
	},
});
</script> -->

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  props: {
    pageTitle: String,
  },

  data() {
    return {
      pathWithoutSlashes: "",
    };
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
    removeSlashes(path) {
      return path.replace(/^\/+|\/+$/g, "");
    },
  },
  mounted() {
    const pathWithSlashes = this.$route.path;
    this.pathWithoutSlashes = this.removeSlashes(pathWithSlashes);

    // console.log(pathWithoutSlashes); // Outputs: "about"
  },
});
</script>
