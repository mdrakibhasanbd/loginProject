<template>
	<div class="min-h-screen sm:max-h-screen flex">
		<div class="bg-gray-100">
			<div class="sidebar w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-base-100 hover:shadow-lg">
				<div class="flex min-h-screen flex-col justify-between pb-6">
					<div>
						<div class="w-max p-2.5">
							<img src="https://tailus.io/images/logo.svg" class="w-32" alt="" />
						</div>
						<ul class="mt-6 space-y-2 menu rounded-box">
							<li class="min-w-max">
								<router-link to="/dashboard"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path
												d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z">
											</path>
										</svg>
									</span>
									<span class="p-1 font-medium">Dashboard</span>
								</router-link>
							</li>
							<li class="min-w-max">
								<a href="#"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span
										class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400"><svg
											xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path
												d="M19 3c-1.654 0-3 1.346-3 3 0 .502.136.968.354 1.385l-1.116 1.302A3.976 3.976 0 0 0 13 8c-.739 0-1.425.216-2.02.566L9.566 7.152A3.449 3.449 0 0 0 10 5.5C10 3.57 8.43 2 6.5 2S3 3.57 3 5.5 4.57 9 6.5 9c.601 0 1.158-.166 1.652-.434L9.566 9.98A3.972 3.972 0 0 0 9 12c0 .997.38 1.899.985 2.601l-1.692 1.692.025.025A2.962 2.962 0 0 0 7 16c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3c0-.476-.121-.919-.318-1.318l.025.025 1.954-1.954c.421.15.867.247 1.339.247 2.206 0 4-1.794 4-4a3.96 3.96 0 0 0-.439-1.785l1.253-1.462c.364.158.764.247 1.186.247 1.654 0 3-1.346 3-3s-1.346-3-3-3zM7 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM5 5.5C5 4.673 5.673 4 6.5 4S8 4.673 8 5.5 7.327 7 6.5 7 5 6.327 5 5.5zm8 8.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm6-7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z">
											</path>
										</svg></span>
									<span class="p-1 font-medium">Network</span>
								</a>
							</li>

							<li class="min-w-max">
								<router-link to="/devices"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path
												d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 17.931V17h-2v2.931A8.008 8.008 0 0 1 4.069 13H7v-2H4.069A8.008 8.008 0 0 1 11 4.069V7h2V4.069A8.007 8.007 0 0 1 19.931 11H17v2h2.931A8.008 8.008 0 0 1 13 19.931z">
											</path>
										</svg>
									</span>
									<span class="p-1 font-medium">Devices</span>
								</router-link>
							</li>

							<li class="min-w-max">
								<router-link to="/table"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path
												d="M4 21h15.893c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2v-5h4v5H4zM14 7v5h-4V7h4zM8 7v5H4V7h4zm2 12v-5h4v5h-4zm6 0v-5h3.894v5H16zm3.893-7H16V7h3.893v5z">
											</path>
										</svg>
									</span>
									<span class="p-1 font-medium">Table</span>
								</router-link>
							</li>

							<li class="min-w-max">
								<router-link to="/users"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path
												d="M4 21h15.893c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2v-5h4v5H4zM14 7v5h-4V7h4zM8 7v5H4V7h4zm2 12v-5h4v5h-4zm6 0v-5h3.894v5H16zm3.893-7H16V7h3.893v5z">
											</path>
										</svg>
									</span>
									<span class="p-1 font-medium">Users</span>
								</router-link>
							</li>

							<li class="min-w-max">
								<a href="#"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span
										class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400"><svg
											xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path
												d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 14.915V18h-2v-1.08c-2.339-.367-3-2.002-3-2.92h2c.011.143.159 1 2 1 1.38 0 2-.585 2-1 0-.324 0-1-2-1-3.48 0-4-1.88-4-3 0-1.288 1.029-2.584 3-2.915V6.012h2v1.109c1.734.41 2.4 1.853 2.4 2.879h-1l-1 .018C13.386 9.638 13.185 9 12 9c-1.299 0-2 .516-2 1 0 .374 0 1 2 1 3.48 0 4 1.88 4 3 0 1.288-1.029 2.584-3 2.915z">
											</path>
										</svg></span>
									<span class="p-1 font-medium">Accounts</span>
								</a>
							</li>

							<li class="min-w-max">
								<details close>
									<summary
										class="transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 pl-1 py-2">
										<span class="inline-flex items-center justify-center h-8 w-8 text-lg"><svg
												xmlns="http://www.w3.org/2000/svg" width="24" height="24"
												viewBox="0 0 24 24" style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
												<path
													d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z">
												</path>
											</svg></span>

										<span class="p-1 font-medium">Support</span>
									</summary>
									<ul class="px-3 text-gray-500">
										<li><a class="hover:bg-lime-500">item 1</a></li>
										<li><a class="hover:bg-lime-500">item 2</a></li>
										<li><a class="hover:bg-lime-500">item 3</a></li>
										<li><a class="hover:bg-lime-500">item 4</a></li>
									</ul>
								</details>
							</li>



							<li class="min-w-max">
								<router-link @click.native="logout" to="/login"
									class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:bg-lime-500 mr-4 px-1 py-3">
									<span class="inline-flex items-center justify-center h-20 w-8 text-lg text-gray-400">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
											style="fill: rgb(0, 113, 133); transform: ; msfilter: ">
											<path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
											<path
												d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z">
											</path>
										</svg>
									</span>
									<span class="p-1 font-medium">Logout</span>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<main class="h-screen flex-1 bg-gray-100 md:overflow-auto sm:overflow-auto">
			<!-- <Navbar /> -->
			<!-- Move the drawer toggle input and related elements here -->

			<slot></slot>
		</main>
	</div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from "./Navbar.vue";
import { useAuthStore } from "@/stores/auth"; // Update the path to your Auth store

export default defineComponent({
	components: {
		Navbar,
	},
	methods: {
		logout() {
			const authStore = useAuthStore(); // Create an instance of the auth store
			authStore.logout(); // Call the logout method on the auth store instance
		},
	},
});
</script>

<style>
.sidebar {
	transition: all 0.4s ease-in-out;
}
</style>
